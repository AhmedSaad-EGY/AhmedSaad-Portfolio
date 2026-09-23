using Microsoft.Extensions.Logging;
using Portfolio.Application.Abstractions;
using Portfolio.Application.Notifications;
using Portfolio.Domain.Entities;

namespace Portfolio.Application.Contact;

public sealed class ContactService(
    IPortfolioDbContext dbContext,
    IEmailNotificationService emailNotificationService,
    EmailOptions emailOptions,
    ILogger<ContactService> logger)
{
    public async Task<ContactSubmissionResult> SubmitAsync(
        ContactMessageRequest request,
        CancellationToken cancellationToken)
    {
        // Honeypot: bots receive success, but nothing is stored or sent.
        if (!string.IsNullOrWhiteSpace(request.Website))
        {
            return new ContactSubmissionResult.Spam();
        }

        var errors = ContactMessageRequestValidator.Validate(request);
        if (errors.Count > 0)
        {
            return new ContactSubmissionResult.Invalid(errors);
        }

        var message = new ContactMessage
        {
            Name = request.Name!.Trim(),
            Email = request.Email!.Trim(),
            Subject = request.Subject!.Trim(),
            Message = request.Message!.Trim(),
            Status = ContactMessageStatus.New,
            CreatedAtUtc = DateTime.UtcNow,
        };

        dbContext.ContactMessages.Add(message);
        await dbContext.SaveChangesAsync(cancellationToken);

        await TryNotifyAsync(message, cancellationToken);

        return new ContactSubmissionResult.Success();
    }

    private async Task TryNotifyAsync(ContactMessage message, CancellationToken cancellationToken)
    {
        // Notifications are best-effort: the persisted message is the source of truth,
        // so a notification failure must never fail the request.
        try
        {
            var timeoutSeconds = Math.Clamp(emailOptions.TimeoutSeconds, 1, 60);
            using var timeout = CancellationTokenSource.CreateLinkedTokenSource(cancellationToken);
            timeout.CancelAfter(TimeSpan.FromSeconds(timeoutSeconds));

            await emailNotificationService.NotifyContactMessageReceivedAsync(message, timeout.Token);
        }
        catch (OperationCanceledException) when (!cancellationToken.IsCancellationRequested)
        {
            logger.LogWarning("Email notification for contact message {MessageId} timed out.", message.Id);
        }
        catch (Exception exception)
        {
            logger.LogWarning(exception, "Email notification for contact message {MessageId} failed.", message.Id);
        }
    }
}
