using ConvenienceStore.Features.Products.Models;
using FluentValidation;

namespace ConvenienceStore.Features.Products.Validators
{
    public class ProductValidator : AbstractValidator<Product>
    {
        public ProductValidator()
        {
            RuleFor(product => product.Name)
                .NotEmpty()
                .MinimumLength(3)
                .WithMessage("O campo Nome deve conter ao menos 3 caracteres.");

            RuleFor(product => product.Value)
                .NotEmpty()
                .WithMessage("O campo Valor deve ser maior que 0.");

            RuleFor(product => product.UserId)
                .NotEmpty()
                .WithMessage("O campo Usuário é obrigatório.");
        }
    }
}