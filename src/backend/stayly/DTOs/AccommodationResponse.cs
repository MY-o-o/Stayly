namespace stayly.DTOs;

public class AccommodationResponse
{
    public int Id { get; set; }

    public int OwnerId { get; set; }

    public string Title { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public decimal Price { get; set; }

    public string Location { get; set; } = string.Empty;

    public string ImageUrl { get; set; } = string.Empty;

    public string Status { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; }
}