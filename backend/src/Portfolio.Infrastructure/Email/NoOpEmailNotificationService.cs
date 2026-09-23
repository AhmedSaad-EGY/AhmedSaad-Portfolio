using Microsoft.Extensions.Logging;
using Portfolio.Application.Notifications;
using Portfolio.Domain.Entities;

namespace Portfolio.Infrastructure.Email;

internal sealed class NoOpEmailNotificationService(ILogger<NoOpEmailNotificationService> logger)
    : IEmailNotificationService
{
    public Task NotifyContactMessageReceivedAsync(ContactMessage message, CancellationToken cancellationToken)
    {
        logger.LogInformation(
            "Email notifications are not configured; contact message {MessageId} was stored without notification.",
            message.Id);

        return Task.CompletedTask;
    }
}
