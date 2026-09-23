using System.Net;

namespace Portfolio.IntegrationTests;

public sealed class CorsTests
{
    [Fact]
    public async Task PreflightAllowsConfiguredFrontendOrigin()
    {
        // The development origin comes from appsettings.Development.json.
        using var factory = new PortfolioApiFactory();
        using var client = factory.CreateClient();
        using var request = new HttpRequestMessage(HttpMethod.Options, "/api/contact");
        request.Headers.Add("Origin", "http://localhost:5173");
        request.Headers.Add("Access-Control-Request-Method", "POST");

        var response = await client.SendAsync(request);

        Assert.Equal(HttpStatusCode.NoContent, response.StatusCode);
        Assert.True(response.Headers.TryGetValues("Access-Control-Allow-Origin", out var values));
        Assert.Contains("http://localhost:5173", values);
    }
}
