using ConvenienceStore.Features.OrderItems.Models;
using FluentValidation;

using FluentValidation;

namespace ConvenienceStore.Features.OrderItems.Validators;

public class OrderItemValidator : AbstractValidator<OrderItem>
{
    public OrderItemValidator()
    {
        RuleFor(orderItem => orderItem.OrderId)
            .NotEmpty()
            .GreaterThan(0)
            .WithMessage("O pedido deve ser especificado");

        RuleFor(orderItem => orderItem.ProductId)
            .NotEmpty()
            .GreaterThan(0)
            .WithMessage("O produto precisa ser especificado");
        
        RuleFor(orderItem => orderItem.Quantity)
            .NotEmpty()
            .GreaterThan(0)
            .WithMessage("O campo quantidade deve ser superior a 0.");
        
        RuleFor(orderItem => orderItem.UnitaryValue)
            .NotEmpty()
            .GreaterThan(0)
            .WithMessage("O campo valor unitário deve ser superior a 0.");
    }
}