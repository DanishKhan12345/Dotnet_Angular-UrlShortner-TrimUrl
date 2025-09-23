using Carter;
using Microsoft.EntityFrameworkCore;
using Scalar.AspNetCore;
using TrimUrlApi.Persistence.Context;
using TrimUrlApi.Persistence.Interface;
using TrimUrlApi.Persistence.Repository;
using TrimUrlApi.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.AddDbContext<TrimUrlDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddScoped<IUrlRepository,UrlRepository>();
builder.Services.AddScoped<IAnalyticsRepository,AnalyticsRepository>();
builder.Services.AddScoped<UrlService>();
builder.Services.AddScoped<AnalyticsService>();
builder.Services.AddCarter();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder =>
        {
            builder
                .WithOrigins("http://localhost:4200")
                //.WithOrigins("https://trimurl.in", "https://www.trimurl.in", "http://localhost:4200")
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials()
                .SetIsOriginAllowed((host) =>
                {
                    Console.WriteLine($"CORS Origin Check: {host}");
                    return true;
                });
        });
});

var app = builder.Build();

app.UseCors("AllowSpecificOrigin");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/openapi/v1.json", "My API V1");
    });
    app.MapScalarApiReference();
}

app.UseRouting();

app.UseHttpsRedirection();

app.MapCarter();

app.UseAuthorization();

app.MapControllers();

app.Run();
