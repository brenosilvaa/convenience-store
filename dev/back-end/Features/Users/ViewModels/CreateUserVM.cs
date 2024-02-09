using System.ComponentModel.DataAnnotations;

namespace ConvenienceStore.Features.Users.ViewModels;

public class CreateUserVM
{
    [Required] public required string Name { get; set; }
    [Required, EmailAddress] public required string Email { get; set; }
    [Required] public required string Password { get; set; }

    public CreateUserVM()
    {
    }

    public CreateUserVM(string name, string email, string password)
    {
        Name = name;
        Email = email;
        Password = password;
    }
}