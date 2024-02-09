using ConvenienceStore.Features.Pixes.ValueObjects;
using System.ComponentModel.DataAnnotations;

namespace ConvenienceStore.Features.Products.ViewModels
{
    public class ProductVM
    {
        [Required] public Guid Id { get; set; }
        [Required] public required string Name { get; set; }
        public string? Image { get; set; }
        public string? Description { get; set; }
        [Required] public required decimal Value { get; set; }
        [Required] public required Guid UserId { get; set; }

        public ProductVM()
        {
        }

        public ProductVM(Guid id, string name, string? image, string? description, decimal value, Guid userId)
        {
            Id = id;
            Name = name;
            Image = image;
            Description = description;
            Value = value;
            UserId = userId;
        }
    }
}
