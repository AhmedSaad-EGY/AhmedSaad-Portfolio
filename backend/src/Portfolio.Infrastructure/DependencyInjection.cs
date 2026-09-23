using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Portfolio.Application.Abstractions;
using Portfolio.Application.Notifications;
using Portfolio.Infrastructure.Email;
using Portfolio.Infrastructure.Persistence;

namespace Portfolio.Infrastructure;

public static class DependencyInjection
{
    public static IServiceCollection AddInfrastructure(this IServiceCollection services, IConfiguration configuration)
    {
        services.AddDbContext<PortfolioDbContext>(options =>
            options.UseSqlServer(configuration.GetConnectionString("PortfolioDb")));
        services.AddScoped<IPortfolioDbContext>(serviceProvider =>
            serviceProvider.GetRequiredService<PortfolioDbContext>());

        services.AddHealthChecks()
            .AddDbContextCheck<PortfolioDbContext>("database", tags: ["ready"]);

        var emailOptions = configuration.GetSection(EmailOptions.SectionName).Get<EmailOptions>()
            ?? new EmailOptions();
        services.AddSingleton(emailOptions);

        if (emailOptions.IsConfigured)
        {
            services.AddSingleton<IEmailNotificationService, SmtpEmailNotificationService>();
        }
        else
        {
            services.AddSingleton<IEmailNotificationService, NoOpEmailNotificationService>();
        }

        return services;
    }
}
