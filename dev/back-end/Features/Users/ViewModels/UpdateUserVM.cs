using System.ComponentModel.DataAnnotations;

namespace ConvenienceStore.Features.Users.ViewModels;

public class UpdateUserVM
{
    [Required] public required string Name { get; set; }
    [Required, EmailAddress] public required string Email { get; set; }

    public UpdateUserVM()
    {
    }

    public UpdateUserVM(string name, string email)
    {
        Name = name;
        Email = email;
    }
}