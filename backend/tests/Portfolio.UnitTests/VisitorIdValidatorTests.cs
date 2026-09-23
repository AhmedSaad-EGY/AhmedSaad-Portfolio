using Portfolio.Application.Engagement;

namespace Portfolio.UnitTests;

public sealed class VisitorIdValidatorTests
{
    [Fact]
    public void GuidVisitorIdIsAccepted()
    {
        Assert.True(VisitorIdValidator.IsValid(Guid.NewGuid().ToString()));
    }

    [Theory]
    [InlineData(null)]
    [InlineData("")]
    [InlineData("   ")]
    public void EmptyVisitorIdIsRejected(string? visitorId)
    {
        Assert.False(VisitorIdValidator.IsValid(visitorId));
    }

    [Fact]
    public void NonGuidVisitorIdIsRejected()
    {
        Assert.False(VisitorIdValidator.IsValid("not-a-visitor-id"));
    }

    [Fact]
    public void OverlongVisitorIdIsRejected()
    {
        Assert.False(VisitorIdValidator.IsValid(new string('a', 65)));
    }
}
