using Microsoft.EntityFrameworkCore;
using stayly.Models;

namespace stayly.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public DbSet<User> Users => Set<User>();

    public DbSet<Accommodation> Accommodations => Set<Accommodation>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>(entity =>
        {
            entity.Property(e => e.Email)
                  .HasMaxLength(255)
                  .IsRequired();

            entity.HasIndex(e => e.Email)
                  .IsUnique();

            entity.Property(e => e.Name)
                  .HasMaxLength(100);

            entity.Property(e => e.Role)
                  .HasMaxLength(20)
                  .IsRequired();
        });
    }
}