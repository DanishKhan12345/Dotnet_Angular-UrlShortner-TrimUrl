using Microsoft.EntityFrameworkCore;
using TrimUrlApi.Models;
using TrimUrlApi.Persistence.Context;
using TrimUrlApi.Persistence.Interface;

namespace TrimUrlApi.Persistence.Repository
{
    public class AnalyticsRepository : IAnalyticsRepository
    {
        private readonly TrimUrlDbContext _context;

        public AnalyticsRepository(TrimUrlDbContext context)
        {
            _context = context;
        }
        public async Task<bool> AddAnalyticsAsync(int urlId, string urlCode)
        {

            var analytics = new Analytics
            {
                UrlId = urlId,
                UrlCode = urlCode,
                ClickedTime = DateTime.UtcNow
            };
            await _context.Analytics.AddAsync(analytics);
            var result = await _context.SaveChangesAsync();
            return result > 0;
        }

        public async Task<int> GetTotalAnalyticsAsync(string urlCode)
        {
            return await _context.Analytics.CountAsync(a => a.UrlCode == urlCode);
        }

    }
}
