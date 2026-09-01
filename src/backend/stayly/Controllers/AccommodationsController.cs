using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using stayly.DTOs;
using stayly.Services;

namespace stayly.Controllers;

[ApiController]
[Route("api/accommodations")]
public class AccommodationsController : ControllerBase
{
    private readonly AccommodationService _accommodationService;
    private readonly UserService _userService;

    public AccommodationsController(AccommodationService accommodationService, UserService userService)
    {
        _accommodationService = accommodationService;
        _userService = userService;
    }

    [Authorize]
    [HttpPost]
    public async Task<IActionResult> Create(CreateAccommodationRequest request)
    {
        var userId = GetUserId();

        if (userId is null)
        {
            return Unauthorized();
        }

        var accommodation = await _accommodationService.CreateAsync(
            request,
            userId.Value);

        return CreatedAtAction(
            nameof(GetById),
            new { id = accommodation.Id },
            accommodation);
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var accommodations = await _accommodationService.GetApprovedAsync();

        return Ok(accommodations);
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById(int id)
    {
        var accommodation = await _accommodationService.GetByIdAsync(id);

        if (accommodation is null)
        {
            return NotFound(new
            {
                message = "Accommodation not found."
            });
        }

        if (accommodation.Status != "Approved")
        {
            var userId = GetUserId();

            if (userId is null)
            {
                return Unauthorized();
            }

            if (accommodation.OwnerId != userId && !_userService.IsAdmin(userId ?? 0))
            {
                return Unauthorized(new { message = "Not enough permission" });
            }
        }

        return Ok(accommodation);
    }

    [Authorize]
    [HttpGet("my")]
    public async Task<IActionResult> GetMy()
    {
        var userId = GetUserId();

        if (userId is null)
        {
            return Unauthorized();
        }

        var accommodations = await _accommodationService.GetMyAsync(
            userId.Value);

        return Ok(accommodations);
    }

    private int? GetUserId()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (int.TryParse(userId, out var id))
        {
            return id;
        }

        return null;
    }
}