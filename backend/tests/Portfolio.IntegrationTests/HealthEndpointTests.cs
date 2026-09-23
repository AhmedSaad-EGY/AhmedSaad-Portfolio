namespace Portfolio.IntegrationTests;

public sealed class HealthEndpointTests(PortfolioApiFactory factory)
    : IClassFixture<PortfolioApiFactory>
{
    [Theory]
    [InlineData("/health")]
    [InlineData("/health/live")]
    [InlineData("/health/ready")]
    public async Task HealthEndpointsReturnSuccess(string path)
    {
        using var client = factory.CreateClient();

        var response = await client.GetAsync(path);

        response.EnsureSuccessStatusCode();
    }
}
