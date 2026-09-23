using Microsoft.AspNetCore.Diagnostics.HealthChecks;

namespace Portfolio.Api.Endpoints;

public static class HealthEndpoints
{
    public static void MapHealthEndpoints(this IEndpointRouteBuilder routes)
    {
        routes.MapHealthChecks("/health");

        routes.MapHealthChecks("/health/live", new HealthCheckOptions
        {
            Predicate = _ => false,
        });

        routes.MapHealthChecks("/health/ready", new HealthCheckOptions
        {
            Predicate = check => check.Tags.Contains("ready"),
        });
    }
}
