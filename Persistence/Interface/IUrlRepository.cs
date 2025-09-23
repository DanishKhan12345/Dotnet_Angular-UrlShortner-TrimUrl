using TrimUrlApi.Models;

namespace TrimUrlApi.Persistence.Interface
{
    public interface IUrlRepository
    {
        Task<bool> SaveAsync(Url url);
        Task<Url?> GetUrlCodeAsync(string urlCode);
        Task<Url?> GetLongUrlAsync(string longUrl);
        Task<IReadOnlyCollection<Url>> GetAllUrlAsync();

        Task<PagedResult<Url>> GetPagedUrlAsync(int pageIndex, int pageSize, string? searchTerm);
    }

    public class PagedResult<T>
    {
        public int PageIndex { get; set; }
        public int PageSize { get; set; }
        public int TotalCount { get; set; }
        public int TotalPages => (int)Math.Ceiling(TotalCount / (double)PageSize);
        public bool hasPreviousPage  => PageIndex > 1;
        public bool hasNextPage  => PageIndex < TotalPages;
        public List<T> Items { get; set; } = [];


    }
}
