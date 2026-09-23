namespace Portfolio.Api.Configuration;

public sealed class RateLimitingOptions
{
    public const string SectionName = "RateLimiting";

    public int ContactPermitLimit { get; set; } = 3;

    public int ContactWindowMinutes { get; set; } = 10;

    public int EngagementPermitLimit { get; set; } = 20;
}
