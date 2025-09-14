using TrimUrlApi.Models;

namespace TrimUrlApi.Persistence.Interface
{
    public interface IUrlRepository
    {
        Task<bool> SaveAsync(Url url);
        Task<Url?> GetUrlCodeAsync(string urlCode);
        Task<Url?> GetLongUrlAsync(string longUrl);
        Task<IReadOnlyCollection<Url>> GetAllUrlAsync();
    }
}
