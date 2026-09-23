using Microsoft.Extensions.DependencyInjection;
using Portfolio.Application.Contact;
using Portfolio.Application.Engagement;

namespace Portfolio.Application;

public static class DependencyInjection
{
    public static IServiceCollection AddApplication(this IServiceCollection services)
    {
        services.AddScoped<ContactService>();
        services.AddScoped<EngagementService>();

        return services;
    }
}
