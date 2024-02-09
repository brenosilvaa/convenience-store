using System.ComponentModel.DataAnnotations;

namespace ConvenienceStore.Features.Products.ViewModels
{
    public class CreateProductVM
    {
        [Required] public required string Name { get; set; }
        public string? Image { get; set; }
        public string? Description { get; set; }
        [Required] public required decimal Value { get; set; }
        [Required] public required Guid UserId { get; set; }

        public CreateProductVM()
        {
        }

        public CreateProductVM(string name, string? image, string? description, decimal value, Guid userId)
        {
            Name = name;
            Image = image;
            Description = description;
            Value = value;
            UserId = userId;
        }
    }
}
