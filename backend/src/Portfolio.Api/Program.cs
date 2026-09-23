using System.Threading.RateLimiting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Portfolio.Api.Configuration;
using Portfolio.Api.Endpoints;
using Portfolio.Application;
using Portfolio.Infrastructure;
using Portfolio.Infrastructure.Persistence;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddProblemDetails();
builder.Services.AddApplication();
builder.Services.AddInfrastructure(builder.Configuration);
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var allowedOrigins = builder.Configuration.GetSection("AllowedOrigins").Get<string[]>() ?? [];
builder.Services.AddCors(options =>
{
    options.AddPolicy(CorsPolicies.Frontend, policy => policy
        .WithOrigins(allowedOrigins)
        .WithMethods("GET", "POST", "PUT")
        .WithHeaders("Content-Type", "Accept"));
});

builder.Services.Configure<RateLimitingOptions>(
    builder.Configuration.GetSection(RateLimitingOptions.SectionName));

builder.Services.AddRateLimiter(options =>
{
    options.RejectionStatusCode = StatusCodes.Status429TooManyRequests;
    options.OnRejected = static async (context, cancellationToken) =>
    {
        if (context.Lease.TryGetMetadata(MetadataName.RetryAfter, out var retryAfter))
        {
            context.HttpContext.Response.Headers.RetryAfter = ((int)retryAfter.TotalSeconds).ToString();
        }

        await context.HttpContext.Response.WriteAsJsonAsync(
            new ProblemDetails
            {
                Status = StatusCodes.Status429TooManyRequests,
                Title = "Too many requests. Please try again later.",
            },
            options: null,
            contentType: "application/problem+json",
            cancellationToken);
    };

    // Limits are resolved through IOptions per request so test hosts and
    // environment overrides always take effect.
    options.AddPolicy(RateLimitingPolicies.Contact, httpContext =>
    {
        var limits = httpContext.RequestServices
            .GetRequiredService<IOptions<RateLimitingOptions>>().Value;
        return RateLimitPartition.GetFixedWindowLimiter(
            httpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown",
            _ => new FixedWindowRateLimiterOptions
            {
                PermitLimit = limits.ContactPermitLimit,
                Window = TimeSpan.FromMinutes(limits.ContactWindowMinutes),
                QueueLimit = 0,
            });
    });

    options.AddPolicy(RateLimitingPolicies.Engagement, httpContext =>
    {
        var limits = httpContext.RequestServices
            .GetRequiredService<IOptions<RateLimitingOptions>>().Value;
        return RateLimitPartition.GetSlidingWindowLimiter(
            httpContext.Connection.RemoteIpAddress?.ToString() ?? "unknown",
            _ => new SlidingWindowRateLimiterOptions
            {
                PermitLimit = limits.EngagementPermitLimit,
                Window = TimeSpan.FromMinutes(1),
                SegmentsPerWindow = 4,
                QueueLimit = 0,
            });
    });
});

builder.WebHost.ConfigureKestrel(options => options.Limits.MaxRequestBodySize = 32 * 1024);

var app = builder.Build();

    app.UseSwagger();
    app.UseSwaggerUI();
if (app.Environment.IsDevelopment())
{

    await using var scope = app.Services.CreateAsyncScope();
    var dbContext = scope.ServiceProvider.GetRequiredService<PortfolioDbContext>();
    if (dbContext.Database.IsSqlServer())
    {
        await dbContext.Database.MigrateAsync();
    }
    else
    {
        // Test hosts run on SQLite; migrations target SQL Server only.
        await dbContext.Database.EnsureCreatedAsync();
    }
}

app.UseExceptionHandler();
app.UseHttpsRedirection();
app.UseCors(CorsPolicies.Frontend);
app.UseRateLimiter();

app.MapHealthEndpoints();
app.MapContactEndpoints();
app.MapEngagementEndpoints();

app.Run();

public partial class Program
{
}
