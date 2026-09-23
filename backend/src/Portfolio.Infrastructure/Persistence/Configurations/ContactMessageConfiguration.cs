using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Portfolio.Application.Contact;
using Portfolio.Domain.Entities;

namespace Portfolio.Infrastructure.Persistence.Configurations;

internal sealed class ContactMessageConfiguration : IEntityTypeConfiguration<ContactMessage>
{
    public void Configure(EntityTypeBuilder<ContactMessage> builder)
    {
        builder.HasKey(message => message.Id);

        builder.Property(message => message.Name)
            .HasMaxLength(ContactMessageRequestValidator.MaxNameLength)
            .IsRequired();
        builder.Property(message => message.Email)
            .HasMaxLength(ContactMessageRequestValidator.MaxEmailLength)
            .IsRequired();
        builder.Property(message => message.Subject)
            .HasMaxLength(ContactMessageRequestValidator.MaxSubjectLength)
            .IsRequired();
        builder.Property(message => message.Message)
            .HasMaxLength(ContactMessageRequestValidator.MaxMessageLength)
            .IsRequired();
        builder.Property(message => message.Status)
            .HasConversion<string>()
            .HasMaxLength(16);
        builder.Property(message => message.CreatedAtUtc)
            .HasColumnType("datetime2");
    }
}
