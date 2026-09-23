using System.Net;
using System.Net.Http.Json;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Portfolio.Infrastructure.Persistence;

namespace Portfolio.IntegrationTests;

public sealed class ContactEndpointTests(PortfolioApiFactory factory)
    : IClassFixture<PortfolioApiFactory>
{
    [Fact]
    public async Task PostValidMessagePersistsAndReturnsOk()
    {
        using var client = factory.CreateClient();
        var payload = new
        {
            name = "Jane Recruiter",
            email = "jane@example.com",
            subject = "Backend opportunity",
            message = "We would like to discuss a backend .NET role with you.",
        };

        var response = await client.PostAsJsonAsync("/api/contact", payload);

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);

        using var scope = factory.Services.CreateScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<PortfolioDbContext>();
        var stored = await dbContext.ContactMessages
            .SingleAsync(message => message.Email == "jane@example.com");
        Assert.Equal("Jane Recruiter", stored.Name);
        Assert.Equal("Backend opportunity", stored.Subject);
    }

    [Fact]
    public async Task PostInvalidMessageReturnsValidationProblem()
    {
        using var client = factory.CreateClient();
        var payload = new
        {
            name = "",
            email = "not-an-email",
            subject = "",
            message = "short",
        };

        var response = await client.PostAsJsonAsync("/api/contact", payload);

        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        Assert.Equal("application/problem+json", response.Content.Headers.ContentType?.MediaType);

        var body = await response.Content.ReadAsStringAsync();
        Assert.Contains("name", body);
        Assert.Contains("email", body);
        Assert.Contains("subject", body);
        Assert.Contains("message", body);
    }

    [Fact]
    public async Task PostHoneypotMessageIsAcceptedWithoutPersistence()
    {
        using var client = factory.CreateClient();
        var payload = new
        {
            name = "Spam Bot",
            email = "bot@example.com",
            subject = "Spam subject",
            message = "This message was submitted by an automated spam bot.",
            website = "http://spam.example.com",
        };

        var response = await client.PostAsJsonAsync("/api/contact", payload);

        Assert.Equal(HttpStatusCode.OK, response.StatusCode);

        using var scope = factory.Services.CreateScope();
        var dbContext = scope.ServiceProvider.GetRequiredService<PortfolioDbContext>();
        Assert.False(await dbContext.ContactMessages
            .AnyAsync(message => message.Email == "bot@example.com"));
    }
}
