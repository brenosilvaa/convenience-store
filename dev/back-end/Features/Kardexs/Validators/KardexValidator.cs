
using ConvenienceStore.Features.Kardexs.Models;
using FluentValidation;

namespace ConvenienceStore.Features.Kardexs.Validators
{
    public class KardexValidator : AbstractValidator<Kardex>
    {
        public KardexValidator()
        {
            RuleFor(kardex => kardex.ProductId)
            .NotEmpty()
            .WithMessage("O Id do Produto deve ser preenchido.");

            RuleFor(kardex => kardex.Quantity)
            .NotEmpty()
            .GreaterThan(0)
            .WithMessage("A quantidade deve ser informada e maior do que zero.");

        }
    }
}
