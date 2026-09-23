using System.ComponentModel.DataAnnotations;

namespace Portfolio.Application.Contact;

public static class ContactMessageRequestValidator
{
    public const int MaxNameLength = 120;
    public const int MaxEmailLength = 254;
    public const int MaxSubjectLength = 160;
    public const int MinMessageLength = 20;
    public const int MaxMessageLength = 4000;

    private static readonly EmailAddressAttribute EmailAddress = new();

    public static Dictionary<string, string[]> Validate(ContactMessageRequest request)
    {
        var errors = new Dictionary<string, string[]>();

        var name = request.Name?.Trim();
        if (string.IsNullOrWhiteSpace(name))
        {
            errors["name"] = ["Name is required."];
        }
        else if (name.Length > MaxNameLength)
        {
            errors["name"] = [$"Name must be at most {MaxNameLength} characters."];
        }

        var email = request.Email?.Trim();
        if (string.IsNullOrWhiteSpace(email))
        {
            errors["email"] = ["Email is required."];
        }
        else if (email.Length > MaxEmailLength || !EmailAddress.IsValid(email))
        {
            errors["email"] = ["A valid email address is required."];
        }

        var subject = request.Subject?.Trim();
        if (string.IsNullOrWhiteSpace(subject))
        {
            errors["subject"] = ["Subject is required."];
        }
        else if (subject.Length > MaxSubjectLength)
        {
            errors["subject"] = [$"Subject must be at most {MaxSubjectLength} characters."];
        }

        var message = request.Message?.Trim();
        if (string.IsNullOrWhiteSpace(message))
        {
            errors["message"] = ["Message is required."];
        }
        else if (message.Length < MinMessageLength)
        {
            errors["message"] = [$"Message must be at least {MinMessageLength} characters."];
        }
        else if (message.Length > MaxMessageLength)
        {
            errors["message"] = [$"Message must be at most {MaxMessageLength} characters."];
        }

        return errors;
    }
}
