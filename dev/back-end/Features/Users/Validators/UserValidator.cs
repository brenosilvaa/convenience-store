using System.Data;
using ConvenienceStore.Features.Pixes.Validators;
using ConvenienceStore.Features.Users.Models;
using ConvenienceStore.Shared.Utils;
using FluentValidation;

namespace ConvenienceStore.Features.Users.Validators;

public class UserValidator : AbstractValidator<User>
{
    public UserValidator()
    {
        RuleFor(user => user.Name)
            .NotEmpty()
            .MinimumLength(3)
            .WithMessage("O campo Nome deve conter ao menos 3 caracteres.");
        
        RuleFor(user => user.Email)
            .Matches(RegexPatterns.Email)
            .WithMessage("O campo E-mail deve ser válido.");
        
        RuleFor(user => user.Password)
            .NotEmpty()
            .WithMessage("O campo Senha é obrigatório.");

        When(user => user.IsSeller, () =>
        {
            RuleFor(user => user.Pix).SetValidator(new PixValidator()!);
        });
    }
}