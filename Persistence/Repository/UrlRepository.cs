using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TrimUrlApi.Models;
using TrimUrlApi.Persistence.Context;
using TrimUrlApi.Persistence.Interface;

namespace TrimUrlApi.Persistence.Repository
{
    public class UrlRepository : IUrlRepository
    {
        private readonly TrimUrlDbContext _context;

        public UrlRepository(TrimUrlDbContext context)
        {
            _context = context;
        }

        public async Task<bool> SaveAsync(Url url)
        {
            _context.Urls.Add(url);
            return await _context.SaveChangesAsync() > 0;
        }

        public async Task<Url?> GetUrlCodeAsync(string urlCode)
        {
            return await _context.Urls.FirstOrDefaultAsync(u => u.UrlCode == urlCode.ToString());
        }

        public async Task<Url?> GetLongUrlAsync(string longUrl)
        {
            return await _context.Urls.FirstOrDefaultAsync(u => u.LongUrl == longUrl);
        }

        public async Task<IReadOnlyCollection<Url>> GetAllUrlAsync()
        {
            return await _context.Urls.ToListAsync();
        }

        public async Task<PagedResult<Url>> GetPagedUrlAsync(int pageIndex, int pageSize, string? searchTerm)
        {
            var query = _context.Urls.AsQueryable();

            if (!string.IsNullOrWhiteSpace(searchTerm))
            { 
                query = query.Where(u => u.LongUrl.Contains(searchTerm.ToLower()) || u.UrlCode.Contains(searchTerm.ToLower()));
            }

            var totalCount = await query.CountAsync();

            var items = await query
                .OrderByDescending(u => u.CreatedAt)
                .Skip((pageIndex - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return new PagedResult<Url>()
            { PageIndex = pageIndex, PageSize = pageSize, TotalCount = totalCount, Items = items };
        }
    }
}
