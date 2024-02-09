using System.ComponentModel.DataAnnotations;
using ConvenienceStore.Features.Pixes.ValueObjects;

namespace ConvenienceStore.Features.Users.ViewModels;

public class UserVM
{
    [Required] public Guid Id { get; set; }
    [Required] public required string Name { get; set; }
    [Required, EmailAddress] public required string Email { get; set; }
    public string? Image { get; set; }
    public Pix? Pix { get; set; }
    [Required] public bool IsSeller { get; set; }

    public UserVM()
    {
    }

    public UserVM(Guid id, string name, string email, string? image, Pix? pix, bool isSeller)
    {
        Id = id;
        Name = name;
        Email = email;
        Image = image;
        Pix = pix;
        IsSeller = isSeller;
    }
}