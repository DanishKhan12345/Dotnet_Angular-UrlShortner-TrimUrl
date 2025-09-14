using TrimUrlApi.Persistence.Interface;

namespace TrimUrlApi.Services
{
    public class AnalyticsService(IAnalyticsRepository analyticsRepository)
    {
        public async Task<int> GetTotalAnalyticsAsync(string urlCode)
        {
            return await analyticsRepository.GetTotalAnalyticsAsync(urlCode);
        }

        public async Task<bool> AddAnalyticsAsync(int urlId, string urlCode)
        {
            var result = await analyticsRepository.AddAnalyticsAsync(urlId, urlCode);
            return result != null;
        }
    }
}
