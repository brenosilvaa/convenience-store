using ConvenienceStore.Features.Orders.Models;

using FluentValidation;

namespace ConvenienceStore.Features.Orders.Validators;

public class OrderValidator : AbstractValidator<Order>
{
    public OrderValidator()
    {
        RuleFor(order => order.SellerId)
            .NotEmpty()
            .WithMessage("O vendedor precisa ser especificado");
        
        RuleFor(order => order.CustomerId)
            .NotEmpty()
            .WithMessage("O cliente precisa ser especificado");
        
        RuleFor(order => order.Items.Count)
            .GreaterThan(0)
            .WithMessage("Ao menos um item deve ser adicionado");
    }
}