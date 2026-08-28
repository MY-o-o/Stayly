using Microsoft.AspNetCore.Mvc;
using stayly.DTOs;
using stayly.Services;

namespace stayly.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly AuthService _authService;

    public AuthController(AuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterRequest request)
    {
        var registered = await _authService.RegisterAsync(request);

        if (!registered)
        {
            return Conflict(new
            {
                message = "A user with this email already exists."
            });
        }

        return Created("", new
        {
            message = "User registered successfully."
        });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginRequest request)
    {
        var token = await _authService.LoginAsync(request);

        if (token is null)
        {
            return Unauthorized(new
            {
                message = "Invalid email or password."
            });
        }

        return Ok(new
        {
            token
        });
    }

    [HttpPost("logout")]
    public IActionResult Logout()
    {
        return Ok(new
        {
            message = "Logged out successfully."
        });
    }
}