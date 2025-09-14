using Carter;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Mvc;
using TrimUrlApi.Dto.Url;
using TrimUrlApi.Services;

namespace TrimUrlApi.Modules
{
    public class ShortnerModule : CarterModule
    {
        public override void AddRoutes(IEndpointRouteBuilder app)
        {
            app.MapPost("/short", async ([FromBody] UrlRequestDto request, UrlService urlService) =>
            { 
                var response = await urlService.TrimAsync(request.longUrl);
                return response.statusCode switch
                {
                    200 => Results.Ok(response),
                    400 => Results.BadRequest(response),
                    500 => Results.InternalServerError(response),
                    _ => Results.Problem(response.ErrorMessage)
                };
            });

            app.MapGet("/urls", async (UrlService urlservice) =>
            {
                var urls = await urlservice.GetAllUrlsAsync();
                return Results.Ok(urls);
            });
        }
    }
}
