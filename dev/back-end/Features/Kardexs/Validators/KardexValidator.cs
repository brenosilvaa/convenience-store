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
            
            RuleFor(kardex => kardex.History)
                .NotEmpty()
                .WithMessage("O histórico deve ser preenchido.");

            RuleFor(kardex => kardex.AbsoluteQuantity)
                .NotEmpty()
                .GreaterThan(0)
                .WithMessage("A quantidade deve ser informada e maior do que zero.");

            RuleFor(kardex => kardex.AbsoluteUnitValue)
                .NotEmpty()
                .GreaterThan(0)
                .WithMessage("O valor unitário deve ser informado e maior do que zero.");
        }
    }
}