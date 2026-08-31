using Microsoft.EntityFrameworkCore;
using stayly.Models;

namespace stayly.Data;

public static class DbInitializer
{
    public static async Task InitializeAsync(AppDbContext dbContext)
    {
        await dbContext.Database.MigrateAsync();

        var users = await dbContext.Users.ToListAsync();

        foreach (var user in users)
        {
            if (string.IsNullOrWhiteSpace(user.Role))
            {
                user.Role = "User";
            }
        }

        if (!await dbContext.Users.AnyAsync(u => u.Email == "admin@stayly.com"))
        {
            var admin = new User
            {
                Name = "Stayly Admin",
                Email = "admin@stayly.com",
                PasswordHash = BCrypt.Net.BCrypt.HashPassword("Admin123!"),
                Role = "Admin",
                CreatedAt = DateTime.UtcNow
            };

            dbContext.Users.Add(admin);
        }

        await dbContext.SaveChangesAsync();
    }
}