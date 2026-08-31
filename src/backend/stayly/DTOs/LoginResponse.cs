namespace stayly.DTOs;

public class LoginResponse
{
    public string Token { get; set; } = string.Empty;
    public UserResponse User { get; set; } = new();
}

public class UserResponse
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
}