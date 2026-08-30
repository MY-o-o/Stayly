namespace stayly.DTOs;

public class CreateAccommodationRequest
{
    public string Title { get; set; } = string.Empty;

    public string Description { get; set; } = string.Empty;

    public decimal Price { get; set; }

    public string Location { get; set; } = string.Empty;

    public string ImageUrl { get; set; } = string.Empty;
}