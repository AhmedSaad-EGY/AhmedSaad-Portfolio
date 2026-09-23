using Portfolio.Application.Contact;

namespace Portfolio.UnitTests;

public sealed class ContactMessageRequestValidatorTests
{
    [Fact]
    public void ValidRequestProducesNoErrors()
    {
        var request = CreateValidRequest();

        var errors = ContactMessageRequestValidator.Validate(request);

        Assert.Empty(errors);
    }

    [Fact]
    public void MissingFieldsProduceAnErrorPerField()
    {
        var request = new ContactMessageRequest();

        var errors = ContactMessageRequestValidator.Validate(request);

        Assert.Equal(["email", "message", "name", "subject"], errors.Keys.Order());
    }

    [Fact]
    public void WhitespaceOnlyFieldsAreRejected()
    {
        var request = new ContactMessageRequest
        {
            Name = "   ",
            Email = "   ",
            Subject = "   ",
            Message = "                    ",
        };

        var errors = ContactMessageRequestValidator.Validate(request);

        Assert.Equal(["email", "message", "name", "subject"], errors.Keys.Order());
    }

    [Fact]
    public void InvalidEmailFormatIsRejected()
    {
        var request = CreateValidRequest() with { Email = "not-an-email" };

        var errors = ContactMessageRequestValidator.Validate(request);

        Assert.Contains("email", errors.Keys);
    }

    [Fact]
    public void OverlongNameIsRejected()
    {
        var request = CreateValidRequest() with { Name = new string('a', 121) };

        var errors = ContactMessageRequestValidator.Validate(request);

        Assert.Contains("name", errors.Keys);
    }

    [Fact]
    public void TooShortMessageIsRejected()
    {
        var request = CreateValidRequest() with { Message = "Too short." };

        var errors = ContactMessageRequestValidator.Validate(request);

        Assert.Contains("message", errors.Keys);
    }

    [Fact]
    public void OverlongMessageIsRejected()
    {
        var request = CreateValidRequest() with { Message = new string('a', 4001) };

        var errors = ContactMessageRequestValidator.Validate(request);

        Assert.Contains("message", errors.Keys);
    }

    [Fact]
    public void SurroundingWhitespaceIsIgnoredForLengthChecks()
    {
        var request = CreateValidRequest() with
        {
            Name = $"  {new string('a', 120)}  ",
        };

        var errors = ContactMessageRequestValidator.Validate(request);

        Assert.Empty(errors);
    }

    private static ContactMessageRequest CreateValidRequest() => new()
    {
        Name = "Jane Recruiter",
        Email = "jane@example.com",
        Subject = "Backend opportunity",
        Message = "We would like to discuss a backend .NET role with you.",
    };
}
