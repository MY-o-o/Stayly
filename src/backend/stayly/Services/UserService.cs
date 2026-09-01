using stayly.Data;

namespace stayly.Services
{
    public class UserService
    {
        private readonly AppDbContext _dbContext;

        public UserService(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public bool IsAdmin(int id)
        {
            return _dbContext.Users.FirstOrDefault(u => u.Id == id)?.Role == "Admin";
        }
    }
}
