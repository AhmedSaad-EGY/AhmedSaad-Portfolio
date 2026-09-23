namespace Portfolio.Domain.Entities;

public sealed class EngagementLike
{
    public required string VisitorId { get; set; }

    public DateTime LikedAtUtc { get; set; }
}
