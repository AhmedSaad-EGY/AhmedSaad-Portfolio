using Portfolio.Api.Configuration;
using Portfolio.Application.Contact;

namespace Portfolio.Api.Endpoints;

public static class ContactEndpoints
{
    public static RouteGroupBuilder MapContactEndpoints(this IEndpointRouteBuilder routes)
    {
        var group = routes.MapGroup("/api/contact");

        group.MapPost("/", async Task<IResult> (
                ContactMessageRequest request,
                ContactService contactService,
                CancellationToken cancellationToken) =>
            {
                var result = await contactService.SubmitAsync(request, cancellationToken);

                return result switch
                {
                    ContactSubmissionResult.Invalid invalid => Results.ValidationProblem(invalid.Errors),
                    _ => Results.Ok(new { status = "received" }),
                };
            })
            .RequireRateLimiting(RateLimitingPolicies.Contact)
            .WithName("SubmitContactMessage")
            .Produces(StatusCodes.Status200OK)
            .ProducesValidationProblem()
            .ProducesProblem(StatusCodes.Status429TooManyRequests);

        return group;
    }
}
