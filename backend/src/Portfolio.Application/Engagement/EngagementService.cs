using Microsoft.EntityFrameworkCore;
using Portfolio.Application.Abstractions;
using Portfolio.Domain.Entities;

namespace Portfolio.Application.Engagement;

public sealed class EngagementService(IPortfolioDbContext dbContext)
{
    public async Task<LikeSnapshot?> GetSnapshotAsync(string? visitorId, CancellationToken cancellationToken)
    {
        if (!VisitorIdValidator.IsValid(visitorId))
        {
            return null;
        }

        var liked = await dbContext.EngagementLikes
            .AnyAsync(like => like.VisitorId == visitorId, cancellationToken);
        var count = await dbContext.EngagementLikes.CountAsync(cancellationToken);

        return new LikeSnapshot(count, liked);
    }

    public async Task<LikeSnapshot?> SetLikeAsync(SetLikeRequest request, CancellationToken cancellationToken)
    {
        if (!VisitorIdValidator.IsValid(request.VisitorId))
        {
            return null;
        }

        var visitorId = request.VisitorId!;

        if (request.Liked)
        {
            var alreadyLiked = await dbContext.EngagementLikes
                .AnyAsync(like => like.VisitorId == visitorId, cancellationToken);
            if (!alreadyLiked)
            {
                dbContext.EngagementLikes.Add(new EngagementLike
                {
                    VisitorId = visitorId,
                    LikedAtUtc = DateTime.UtcNow,
                });
            }
        }
        else
        {
            var existing = await dbContext.EngagementLikes.FindAsync([visitorId], cancellationToken);
            if (existing is not null)
            {
                dbContext.EngagementLikes.Remove(existing);
            }
        }

        try
        {
            await dbContext.SaveChangesAsync(cancellationToken);
        }
        catch (DbUpdateException) when (request.Liked)
        {
            // A concurrent identical like hit the unique VisitorId key.
            // The like operation is idempotent, so the desired state already exists.
        }

        return await GetSnapshotAsync(visitorId, cancellationToken);
    }
}
