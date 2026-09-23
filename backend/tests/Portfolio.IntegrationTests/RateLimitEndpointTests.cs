using System.Net;
using System.Net.Http.Json;

namespace Portfolio.IntegrationTests;

public sealed class RateLimitEndpointTests
{
    [Fact]
    public async Task ContactEndpointRejectsRequestsBeyondPermitLimit()
    {
        using var factory = new PortfolioApiFactory(new Dictionary<string, string?>
        {
            ["RateLimiting:ContactPermitLimit"] = "1",
            ["RateLimiting:ContactWindowMinutes"] = "10",
        });
        using var client = factory.CreateClient();
        var payload = new
        {
            name = "Jane Recruiter",
            email = "jane@example.com",
            subject = "Rate limit check",
            message = "This is a valid contact message body.",
        };

        var first = await client.PostAsJsonAsync("/api/contact", payload);
        var second = await client.PostAsJsonAsync("/api/contact", payload);

        Assert.Equal(HttpStatusCode.OK, first.StatusCode);
        Assert.Equal(HttpStatusCode.TooManyRequests, second.StatusCode);
        Assert.Equal("application/problem+json", second.Content.Headers.ContentType?.MediaType);
    }
}
