namespace Portfolio.Application.Contact;

public abstract record ContactSubmissionResult
{
    private ContactSubmissionResult()
    {
    }

    public sealed record Success : ContactSubmissionResult;

    public sealed record Spam : ContactSubmissionResult;

    public sealed record Invalid(Dictionary<string, string[]> Errors) : ContactSubmissionResult;
}
