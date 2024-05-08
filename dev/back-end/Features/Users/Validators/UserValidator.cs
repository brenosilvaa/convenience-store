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
        RuleFor(user => user.UserName)
            .NotEmpty()
            .MinimumLength(3)
            .WithMessage("O campo Nome deve conter ao menos 3 caracteres.");
        
        RuleFor(user => user.Email)
            .Matches(RegexPatterns.Email)
            .WithMessage("O campo E-mail deve ser válido.");
        
        When(user => user.IsSeller, () =>
        {
            RuleFor(user => user.Pix).SetValidator(new PixValidator()!);
        });
    }
}