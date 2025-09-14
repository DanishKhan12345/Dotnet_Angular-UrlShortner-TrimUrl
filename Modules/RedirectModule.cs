using Carter;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc;
using TrimUrlApi.Services;

namespace TrimUrlApi.Modules
{
    public class RedirectModule : CarterModule
    {
        public override void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapGet("{url_code}", async ([FromRoute(Name = "url_code")]string urlCode, UrlService urlService, AnalyticsService analyticService) =>
            {
                var url = await urlService.GetUrlbyCodeAsync(urlCode);
                if (url == null)
                {
                    return Results.NotFound("Url not found");
                }
                var result = await analyticService.AddAnalyticsAsync(url.Id, urlCode);
                if(!result)
                {
                    return Results.StatusCode(500);
                }
                return Results.Redirect(url.LongUrl);

            });
        }
    }
}
