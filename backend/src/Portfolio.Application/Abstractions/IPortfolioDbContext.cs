using Microsoft.EntityFrameworkCore;
using Portfolio.Domain.Entities;

namespace Portfolio.Application.Abstractions;

public interface IPortfolioDbContext
{
    DbSet<ContactMessage> ContactMessages { get; }

    DbSet<EngagementLike> EngagementLikes { get; }

    Task<int> SaveChangesAsync(CancellationToken cancellationToken = default);
}
