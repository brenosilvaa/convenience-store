using ConvenienceStore.Features.Orders.Models;

using FluentValidation;

namespace ConvenienceStore.Features.Orders.Validators;

public class OrderValidator : AbstractValidator<Order>
{
    public OrderValidator()
    {
        RuleFor(order => order.Data)
            .NotEmpty()
            .WithMessage("O campo Data deve ser preenchido.");
        
        RuleFor(order => order.SellerId)
            .NotEmpty()
            .GreaterThan(0)
            .WithMessage("O vendedor precisa ser especificado");
        
        RuleFor(order => order.CustomerId)
            .NotEmpty()
            .GreaterThan(0)
            .WithMessage("O cliente precisa ser especificado");
    }
}