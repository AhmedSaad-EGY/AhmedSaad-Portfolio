using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Portfolio.Application.Engagement;
using Portfolio.Domain.Entities;

namespace Portfolio.Infrastructure.Persistence.Configurations;

internal sealed class EngagementLikeConfiguration : IEntityTypeConfiguration<EngagementLike>
{
    public void Configure(EntityTypeBuilder<EngagementLike> builder)
    {
        builder.HasKey(like => like.VisitorId);

        builder.Property(like => like.VisitorId)
            .HasMaxLength(VisitorIdValidator.MaxVisitorIdLength);
        builder.Property(like => like.LikedAtUtc)
            .HasColumnType("datetime2");
    }
}
