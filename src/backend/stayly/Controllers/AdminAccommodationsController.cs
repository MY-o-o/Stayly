using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using stayly.Services;

namespace stayly.Controllers;

[ApiController]
[Route("api/admin/accommodations")]
[Authorize(Roles = "Admin")]
public class AdminAccommodationsController : ControllerBase
{
    private readonly AccommodationService _accommodationService;

public AdminAccommodationsController(AccommodationService accommodationService)
    {
        _accommodationService = accommodationService;
    }

    [HttpGet("pending")]
    public async Task<IActionResult> GetPending()
    {
        var accommodations = await _accommodationService.GetPendingAsync();

        return Ok(accommodations);
    }

    [HttpPatch("{id:int}/approve")]
    public async Task<IActionResult> Approve(int id)
    {
        var accommodation = await _accommodationService.SetStatusAsync(
            id,
            "Approved");

        if (accommodation is null)
        {
            return NotFound(new
            {
                message = "Accommodation not found."
            });
        }

        return Ok(accommodation);
    }

    [HttpPatch("{id:int}/reject")]
    public async Task<IActionResult> Reject(int id)
    {
        var accommodation = await _accommodationService.SetStatusAsync(
            id,
            "Rejected");

        if (accommodation is null)
        {
            return NotFound(new
            {
                message = "Accommodation not found."
            });
        }

        return Ok(accommodation);
    }
}
