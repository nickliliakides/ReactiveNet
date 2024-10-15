using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        [RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$", ErrorMessage = "Password MUST contain at least 1 lowercase, uppercase and number and minimum 8 characters.")]
        public string Password { get; set; }
        [Required]
        public string DisplayName { get; set; }
        [Required]
        public string Username { get; set; }
    }
}