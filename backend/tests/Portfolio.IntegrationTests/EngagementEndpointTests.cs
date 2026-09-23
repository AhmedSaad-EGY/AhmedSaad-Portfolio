using System.Net;
using System.Net.Http.Json;
using Portfolio.Application.Engagement;

namespace Portfolio.IntegrationTests;

public sealed class EngagementEndpointTests(PortfolioApiFactory factory)
    : IClassFixture<PortfolioApiFactory>
{
    [Fact]
    public async Task GetLikesWithoutVisitorIdReturnsBadRequest()
    {
        using var client = factory.CreateClient();

        var response = await client.GetAsync("/api/engagement/likes");

        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }

    [Fact]
    public async Task PutLikeWithInvalidVisitorIdReturnsBadRequest()
    {
        using var client = factory.CreateClient();

        var response = await client.PutAsJsonAsync(
            "/api/engagement/likes",
            new { visitorId = "not-a-visitor-id", liked = true });

        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }

    [Fact]
    public async Task LikeFlowTogglesSharedCount()
    {
        using var client = factory.CreateClient();
        var visitorId = Guid.NewGuid().ToString();
        var otherVisitorId = Guid.NewGuid().ToString();

        var baseline = await GetSnapshot(client, visitorId);
        Assert.False(baseline.Liked);

        var liked = await PutLike(client, visitorId, liked: true);
        Assert.True(liked.Liked);
        Assert.Equal(baseline.Count + 1, liked.Count);

        // Liking twice is idempotent: the count does not change.
        var likedAgain = await PutLike(client, visitorId, liked: true);
        Assert.True(likedAgain.Liked);
        Assert.Equal(liked.Count, likedAgain.Count);

        // A different visitor increases the shared count.
        var otherLiked = await PutLike(client, otherVisitorId, liked: true);
        Assert.Equal(liked.Count + 1, otherLiked.Count);

        // Unliking decreases the shared count exactly once.
        var unliked = await PutLike(client, visitorId, liked: false);
        Assert.False(unliked.Liked);
        Assert.Equal(liked.Count, unliked.Count);

        var unlikedAgain = await PutLike(client, visitorId, liked: false);
        Assert.False(unlikedAgain.Liked);
        Assert.Equal(unliked.Count, unlikedAgain.Count);

        // The other visitor's like is unaffected.
        var otherSnapshot = await GetSnapshot(client, otherVisitorId);
        Assert.True(otherSnapshot.Liked);
        Assert.Equal(unliked.Count, otherSnapshot.Count);
    }

    private static async Task<LikeSnapshot> GetSnapshot(HttpClient client, string visitorId)
    {
        var snapshot = await client.GetFromJsonAsync<LikeSnapshot>(
            $"/api/engagement/likes?visitorId={Uri.EscapeDataString(visitorId)}");
        Assert.NotNull(snapshot);
        return snapshot;
    }

    private static async Task<LikeSnapshot> PutLike(HttpClient client, string visitorId, bool liked)
    {
        var response = await client.PutAsJsonAsync(
            "/api/engagement/likes",
            new { visitorId, liked });
        response.EnsureSuccessStatusCode();

        var snapshot = await response.Content.ReadFromJsonAsync<LikeSnapshot>();
        Assert.NotNull(snapshot);
        return snapshot;
    }
}
