using Microsoft.EntityFrameworkCore;
using TrimUrlApi.Models;

namespace TrimUrlApi.Persistence.Context
{
    public class TrimUrlDbContext(DbContextOptions<TrimUrlDbContext> options) : DbContext(options)
    {
        public DbSet<Url> Urls { get; init; }
        public DbSet<Analytics> Analytics { get; init; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);
            // Configure Url entity
            modelBuilder.Entity<Url>(entity =>
            {
                entity.HasKey(u => u.Id);
                entity.Property(u => u.LongUrl).IsRequired();
                entity.Property(u => u.UrlCode).IsRequired();
                entity.Property(u => u.CreatedAt).HasDefaultValueSql("CURRENT_TIMESTAMP");
            });
            
            modelBuilder.Entity<Url>().HasIndex(u => u.UrlCode).IsUnique();
            
            modelBuilder.Entity<Url>()
                .HasMany(a => a.Analytics)
                .WithOne(a => a.Url)
                .HasForeignKey(a => a.UrlId);

            // Configure Analytics entity
            modelBuilder.Entity<Analytics>(entity =>
            {
                entity.HasKey(a => a.Id);
                entity.Property(a => a.ClickedTime).HasDefaultValueSql("CURRENT_TIMESTAMP");
                entity.Property(a => a.UrlCode).IsRequired();
                entity.HasOne(a => a.Url)
                      .WithMany(u => u.Analytics)
                      .HasForeignKey(a => a.UrlId);
            });
        }
    }
}
