using Microsoft.EntityFrameworkCore;
using stayly.Data;
using stayly.DTOs;
using stayly.Models;

namespace stayly.Services;

public class AccommodationService
{
    private readonly AppDbContext _dbContext;

public AccommodationService(AppDbContext dbContext)
    {
        _dbContext = dbContext;
    }

    public async Task<AccommodationResponse> CreateAsync(
        CreateAccommodationRequest request,
        int ownerId)
    {
        var accommodation = new Accommodation
        {
            OwnerId = ownerId,
            Title = request.Title.Trim(),
            Description = request.Description.Trim(),
            Price = request.Price,
            Location = request.Location.Trim(),
            ImageUrl = request.ImageUrl.Trim(),
            Status = "Pending",
            CreatedAt = DateTime.UtcNow
        };

        _dbContext.Accommodations.Add(accommodation);
        await _dbContext.SaveChangesAsync();

        return MapToResponse(accommodation);
    }

    public async Task<List<AccommodationResponse>> GetApprovedAsync()
    {
        return await _dbContext.Accommodations
            .Where(a => a.Status == "Approved")
            .OrderByDescending(a => a.CreatedAt)
            .Select(a => new AccommodationResponse
            {
                Id = a.Id,
                OwnerId = a.OwnerId,
                Title = a.Title,
                Description = a.Description,
                Price = a.Price,
                Location = a.Location,
                ImageUrl = a.ImageUrl,
                Status = a.Status,
                CreatedAt = a.CreatedAt
            })
            .ToListAsync();
    }

    public async Task<AccommodationResponse?> GetByIdAsync(int id)
    {
        return await _dbContext.Accommodations
            .Where(a => a.Id == id && a.Status == "Approved")
            .Select(a => new AccommodationResponse
            {
                Id = a.Id,
                OwnerId = a.OwnerId,
                Title = a.Title,
                Description = a.Description,
                Price = a.Price,
                Location = a.Location,
                ImageUrl = a.ImageUrl,
                Status = a.Status,
                CreatedAt = a.CreatedAt
            })
            .FirstOrDefaultAsync();
    }

    public async Task<List<AccommodationResponse>> GetMyAsync(int ownerId)
    {
        return await _dbContext.Accommodations
            .Where(a => a.OwnerId == ownerId)
            .OrderByDescending(a => a.CreatedAt)
            .Select(a => new AccommodationResponse
            {
                Id = a.Id,
                OwnerId = a.OwnerId,
                Title = a.Title,
                Description = a.Description,
                Price = a.Price,
                Location = a.Location,
                ImageUrl = a.ImageUrl,
                Status = a.Status,
                CreatedAt = a.CreatedAt
            })
            .ToListAsync();
    }

    public async Task<List<AccommodationResponse>> GetPendingAsync()
    {
        return await _dbContext.Accommodations
            .Where(a => a.Status == "Pending")
            .OrderByDescending(a => a.CreatedAt)
            .Select(a => new AccommodationResponse
            {
                Id = a.Id,
                OwnerId = a.OwnerId,
                Title = a.Title,
                Description = a.Description,
                Price = a.Price,
                Location = a.Location,
                ImageUrl = a.ImageUrl,
                Status = a.Status,
                CreatedAt = a.CreatedAt
            })
            .ToListAsync();
    }

    public async Task<AccommodationResponse?> SetStatusAsync(
        int id,
        string status)
    {
        var accommodation = await _dbContext.Accommodations
            .FirstOrDefaultAsync(a => a.Id == id);

        if (accommodation is null)
        {
            return null;
        }

        accommodation.Status = status;

        await _dbContext.SaveChangesAsync();

        return MapToResponse(accommodation);
    }

    private static AccommodationResponse MapToResponse(
        Accommodation accommodation)
    {
        return new AccommodationResponse
        {
            Id = accommodation.Id,
            OwnerId = accommodation.OwnerId,
            Title = accommodation.Title,
            Description = accommodation.Description,
            Price = accommodation.Price,
            Location = accommodation.Location,
            ImageUrl = accommodation.ImageUrl,
            Status = accommodation.Status,
            CreatedAt = accommodation.CreatedAt
        };
    }
}
