namespace TrimUrlApi.Dto.Url
{
    public record UrlResponseDto(bool isSuccess, int statusCode, string? shortUrl = null, string? ErrorMessage = null);
   
}
