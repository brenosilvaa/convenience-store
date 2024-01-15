using ConvenienceStore.Features.Pixes.Enums;
using ConvenienceStore.Features.Pixes.ValueObjects;
using ConvenienceStore.Shared.Utils;
using FluentValidation;

namespace ConvenienceStore.Features.Pixes.Validators;

public class PixValidator : AbstractValidator<Pix>
{
    public PixValidator()
    {
        RuleFor(pix => pix.Key)
            .NotEmpty()
            .WithMessage("O campo Chave PIX é obrigatório.");

        When(pix => pix.Type == PixKeyType.Cpf, () =>
        {
            RuleFor(pix => pix.Key)
                .Matches(RegexPatterns.Cpf)
                .WithMessage("A Chave PIX CPF deve conter 11 números.");
        });
        
        When(pix => pix.Type == PixKeyType.Cnpj, () =>
        {
            RuleFor(pix => pix.Key)
                .Matches(RegexPatterns.Cnpj)
                .WithMessage("A Chave PIX CNPJ deve conter 14 números.");
        });
        
        When(pix => pix.Type == PixKeyType.Phone, () =>
        {
            RuleFor(pix => pix.Key)
                .Matches(RegexPatterns.Phone)
                .WithMessage("A Chave PIX Celular deve conter 10 ou 11 números.");
        });
        
        When(pix => pix.Type == PixKeyType.Email, () =>
        {
            RuleFor(pix => pix.Key)
                .Matches(RegexPatterns.Email)
                .WithMessage("A Chave PIX E-mail deve ser válida.");
        });
    }
}