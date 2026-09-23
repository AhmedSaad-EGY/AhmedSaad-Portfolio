using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Logging;
using MimeKit;
using Portfolio.Application.Notifications;
using Portfolio.Domain.Entities;

namespace Portfolio.Infrastructure.Email;

internal sealed class SmtpEmailNotificationService(
    EmailOptions options,
    ILogger<SmtpEmailNotificationService> logger) : IEmailNotificationService
{
    public async Task NotifyContactMessageReceivedAsync(ContactMessage message, CancellationToken cancellationToken)
    {
        var email = new MimeMessage();
        email.From.Add(new MailboxAddress(options.FromName, options.FromAddress));
        email.To.Add(new MailboxAddress(string.Empty, options.ToAddress));
        email.ReplyTo.Add(new MailboxAddress(message.Name, message.Email));
        email.Subject = $"Portfolio contact: {message.Subject}";
        email.Body = new TextPart("plain")
        {
            Text = $"New portfolio contact message received at {message.CreatedAtUtc:u}.\n\n"
                + $"Name: {message.Name}\n"
                + $"Email: {message.Email}\n"
                + $"Subject: {message.Subject}\n\n"
                + message.Message,
        };

        using var client = new SmtpClient();
        await client.ConnectAsync(options.SmtpHost, options.SmtpPort, SecureSocketOptions.StartTls, cancellationToken);
        await client.AuthenticateAsync(options.Username, options.Password, cancellationToken);
        await client.SendAsync(email, cancellationToken);
        await client.DisconnectAsync(quit: true, cancellationToken);

        logger.LogInformation("Email notification for contact message {MessageId} sent.", message.Id);
    }
}
