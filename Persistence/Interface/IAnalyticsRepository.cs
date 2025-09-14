using TrimUrlApi.Models;

namespace TrimUrlApi.Persistence.Interface
{
    public interface IAnalyticsRepository
    {
        Task<bool> AddAnalyticsAsync(int urlId, string urlCode);

        Task<int> GetTotalAnalyticsAsync(string urlCode);
    }
}
