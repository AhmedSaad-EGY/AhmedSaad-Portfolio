namespace Portfolio.Application.Engagement;

public static class VisitorIdValidator
{
    public const int MaxVisitorIdLength = 64;

    public static bool IsValid(string? visitorId) =>
        !string.IsNullOrWhiteSpace(visitorId)
        && visitorId.Length <= MaxVisitorIdLength
        && Guid.TryParse(visitorId, out _);
}
