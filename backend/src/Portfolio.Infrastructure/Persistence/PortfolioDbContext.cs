using Microsoft.EntityFrameworkCore;
using Portfolio.Application.Abstractions;
using Portfolio.Domain.Entities;

namespace Portfolio.Infrastructure.Persistence;

public sealed class PortfolioDbContext(DbContextOptions<PortfolioDbContext> options)
    : DbContext(options), IPortfolioDbContext
{
    public DbSet<ContactMessage> ContactMessages => Set<ContactMessage>();

    public DbSet<EngagementLike> EngagementLikes => Set<EngagementLike>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(PortfolioDbContext).Assembly);
    }
}
