namespace Portfolio.Application.Contact;

public sealed record ContactMessageRequest
{
    public string? Name { get; set; }

    public string? Email { get; set; }

    public string? Subject { get; set; }

    public string? Message { get; set; }

    // Honeypot field: never filled by the real frontend form.
    public string? Website { get; set; }
}
