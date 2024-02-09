using ConvenienceStore.Features.OrderItems.Models;

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
    }
}