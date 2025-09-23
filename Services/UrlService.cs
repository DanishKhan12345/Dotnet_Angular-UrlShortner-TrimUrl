using System.Buffers.Text;
using System.Text;
using System.Text.RegularExpressions;
using TrimUrlApi.Dto;
using TrimUrlApi.Dto.Url;
using TrimUrlApi.Models;
using TrimUrlApi.Persistence.Interface;

namespace TrimUrlApi.Services
{
    public class UrlService
    {
        private readonly IUrlRepository _urlRepository;
        private readonly IConfiguration _config;
        //private const string BaseUrl = "https://short.ly/";
       
        public UrlService(IUrlRepository urlRepository,IConfiguration config)
        {
            _urlRepository = urlRepository;
            _config = config;
        }
        public async Task<UrlResponseDto> TrimAsync(string longUrl)
        {
            var baseUrl = _config["BaseUrl"];
            //validate url
            if (!IsValidUrl(longUrl))
                return new UrlResponseDto(false, 400, null, "Invalid URL. Only http and https are allowed.");

            //Check if URL already exists
            var existingUrl = await _urlRepository.GetLongUrlAsync(longUrl);
            if (existingUrl != null)
            {
               
                //var existingShortUrl = BuildShortUrl(existingUrl.UrlCode);
                return new UrlResponseDto(true, 200, $"{baseUrl}/{existingUrl.UrlCode}");
            }

            var shortCode = GenerateShortUrlCode(longUrl);
            
            var saveResult = await SaveUrlAsync(longUrl, shortCode);
            if (!saveResult)
                return new UrlResponseDto(false, 500, null, "Failed to save URL.");

            //var shortUrl = BuildShortUrl(shortCode);
            return new UrlResponseDto(true, 200, $"{baseUrl}/{shortCode}");
        }

        // 1. Validate the URL (must be http or https)
        private bool IsValidUrl(string url)
        {
            return Uri.TryCreate(url, UriKind.Absolute, out Uri? uriResult) &&
                   (uriResult.Scheme == Uri.UriSchemeHttp || uriResult.Scheme == Uri.UriSchemeHttps);
        }

        // 2. Trim the URL (generate a short code)
        private string GenerateShortUrlCode(string longUrl)
        {
            // Hash the URL (simple demo, not secure for production use)
            int hash = longUrl.GetHashCode();

            int codeLength = 7;
            // Convert to a positive number
            uint positiveHash = (uint)hash;

            // Convert to Base36 (0-9, A-Z) for shorter, URL-friendly code
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var code = new StringBuilder();

            while (positiveHash > 0 && code.Length < codeLength)
            {
                code.Append(chars[(int)(positiveHash % (uint)chars.Length)]);
                positiveHash /= (uint)chars.Length;
            }

            // Pad with 'X' if shorter than 7 chars
            //while (code.Length < 7)
            //{
            //    code.Append('X');
            //}

            return code.ToString();

        }

        // 3. Save the URL
        private async Task<bool> SaveUrlAsync(string longUrl, string shortCode)
        {
            var url = new Url
            {
                LongUrl = longUrl,
                UrlCode = shortCode,
                CreatedAt = DateTime.UtcNow,
                Analytics = new List<Analytics>()
            };
            return await _urlRepository.SaveAsync(url);
        }

        public async Task<string?> GetLongUrlAsync(string urlCode)
        {
            var url = await _urlRepository.GetUrlCodeAsync(urlCode);
            return url?.LongUrl;
        }

        public async Task<IReadOnlyCollection<Url>> GetAllUrlsAsync()
        {
            return await _urlRepository.GetAllUrlAsync();
        }

        public async Task<Url?> GetUrlbyCodeAsync(string urlCode)
        {
            var url = await _urlRepository.GetUrlCodeAsync(urlCode);
            return url;
        }

        public async Task<PagedResult<UrlDto>> GetPagedUrlsAsync(int pageIndex, int pageSize, string? searchTerm)
        {
            var pagedResponse =  await _urlRepository.GetPagedUrlAsync(pageIndex, pageSize, searchTerm);

            return new PagedResult<UrlDto>
            {
                PageIndex = pagedResponse.PageIndex,
                PageSize = pagedResponse.PageSize,
                TotalCount = pagedResponse.TotalCount,
                Items = pagedResponse.Items.Select(u => new UrlDto(u.Id, u.LongUrl, $"{_config["BaseUrl"]}/{u.UrlCode}", u.CreatedAt)).ToList()
            };
        }
    }
}
