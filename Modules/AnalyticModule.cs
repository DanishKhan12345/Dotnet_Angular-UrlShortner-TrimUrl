using Carter;
using Microsoft.AspNetCore.Mvc;
using TrimUrlApi.Services;

namespace TrimUrlApi.Modules
{
    public class AnalyticModule : CarterModule
    {
        public override void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapGet("analytics/{url_code}", async ([FromRoute(Name = "url_code")] string urlCode, AnalyticsService analyticsService) =>
            {
                var totalClicks = await analyticsService.GetTotalAnalyticsAsync(urlCode);
                return Results.Ok(new { UrlCode = urlCode, TotalClicks = totalClicks });
            });
        }
    }
}
