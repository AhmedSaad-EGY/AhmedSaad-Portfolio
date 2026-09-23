namespace Portfolio.Domain.Entities;

public sealed class ContactMessage
{
    public int Id { get; set; }

    public required string Name { get; set; }

    public required string Email { get; set; }

    public required string Subject { get; set; }

    public required string Message { get; set; }

    public ContactMessageStatus Status { get; set; } = ContactMessageStatus.New;

    public DateTime CreatedAtUtc { get; set; }
}
