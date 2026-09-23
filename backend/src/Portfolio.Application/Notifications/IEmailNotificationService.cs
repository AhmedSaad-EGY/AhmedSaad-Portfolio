using Portfolio.Domain.Entities;

namespace Portfolio.Application.Notifications;

public interface IEmailNotificationService
{
    Task NotifyContactMessageReceivedAsync(ContactMessage message, CancellationToken cancellationToken);
}
