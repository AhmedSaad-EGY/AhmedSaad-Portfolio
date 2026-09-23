using Portfolio.Api.Configuration;
using Portfolio.Application.Engagement;

namespace Portfolio.Api.Endpoints;

public static class EngagementEndpoints
{
    public static RouteGroupBuilder MapEngagementEndpoints(this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup("/api/engagement/likes")
            .RequireRateLimiting(RateLimitingPolicies.Engagement);

        group.MapGet("/", async Task<IResult> (
                string? visitorId,
                EngagementService engagementService,
                CancellationToken cancellationToken) =>
            {
                var snapshot = await engagementService.GetSnapshotAsync(visitorId, cancellationToken);

                if (snapshot is null)
                {
                    return Results.Problem(
                        statusCode: StatusCodes.Status400BadRequest,
                        title: "A valid visitorId query parameter is required.");
                }

                return Results.Ok(snapshot);
            })
            .WithName("GetEngagementLikes")
            .Produces<LikeSnapshot>()
            .ProducesProblem(StatusCodes.Status400BadRequest);

        group.MapPut("/", async Task<IResult> (
                SetLikeRequest request,
                EngagementService engagementService,
                CancellationToken cancellationToken) =>
            {
                var snapshot = await engagementService.SetLikeAsync(request, cancellationToken);

                if (snapshot is null)
                {
                    return Results.Problem(
                        statusCode: StatusCodes.Status400BadRequest,
                        title: "A valid visitorId is required.");
                }

                return Results.Ok(snapshot);
            })
            .WithName("SetEngagementLike")
            .Produces<LikeSnapshot>()
            .ProducesProblem(StatusCodes.Status400BadRequest)
            .ProducesProblem(StatusCodes.Status429TooManyRequests);

        return group;
    }
}
