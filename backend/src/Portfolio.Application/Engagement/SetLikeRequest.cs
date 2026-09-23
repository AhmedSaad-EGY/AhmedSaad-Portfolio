namespace Portfolio.Application.Engagement;

public sealed record SetLikeRequest
{
    public string? VisitorId { get; set; }

    public bool Liked { get; set; }
}
