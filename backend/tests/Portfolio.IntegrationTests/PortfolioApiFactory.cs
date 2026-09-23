using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Portfolio.Infrastructure.Persistence;

namespace Portfolio.IntegrationTests;

/// <summary>
/// Hosts the API with an isolated in-memory SQLite database per factory instance.
/// SQL Server remains the only production provider; SQLite gives tests a real
/// relational engine (constraints included) that runs anywhere, including CI.
/// </summary>
public sealed class PortfolioApiFactory : WebApplicationFactory<Program>
{
    private static readonly IReadOnlyDictionary<string, string?> DefaultConfigurationOverrides =
        new Dictionary<string, string?>
        {
            ["RateLimiting:ContactPermitLimit"] = "1000",
            ["RateLimiting:EngagementPermitLimit"] = "1000",
        };

    private readonly IReadOnlyDictionary<string, string?> _configurationOverrides;
    private SqliteConnection? _connection;

    public PortfolioApiFactory()
        : this(null)
    {
    }

    internal PortfolioApiFactory(IReadOnlyDictionary<string, string?>? configurationOverrides)
    {
        var merged = new Dictionary<string, string?>(DefaultConfigurationOverrides);
        if (configurationOverrides is not null)
        {
            foreach (var pair in configurationOverrides)
            {
                merged[pair.Key] = pair.Value;
            }
        }

        _configurationOverrides = merged;
    }

    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        builder.ConfigureAppConfiguration((_, configuration) =>
        {
            configuration.AddInMemoryCollection(_configurationOverrides);
        });

        builder.ConfigureServices(services =>
        {
            var replacedServiceTypes = new[]
            {
                typeof(DbContextOptions<PortfolioDbContext>),
                typeof(DbContextOptions),
                typeof(PortfolioDbContext),
            };

            var descriptors = services
                .Where(descriptor =>
                    replacedServiceTypes.Contains(descriptor.ServiceType)
                    || (descriptor.ServiceType.IsGenericType
                        && descriptor.ServiceType.GetGenericTypeDefinition()
                            == typeof(IDbContextOptionsConfiguration<>)))
                .ToList();
            foreach (var descriptor in descriptors)
            {
                services.Remove(descriptor);
            }

            _connection = new SqliteConnection("Data Source=:memory:");
            _connection.Open();

            services.AddDbContext<PortfolioDbContext>(options => options.UseSqlite(_connection));
        });
    }

    protected override void Dispose(bool disposing)
    {
        base.Dispose(disposing);
        _connection?.Dispose();
    }
}
