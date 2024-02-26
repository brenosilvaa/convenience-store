using Microsoft.AspNetCore.Mvc;

namespace ConvenienceStore.Shared.Utils;

/// <summary>
/// Entidade que representa um retorno de erro do sistema
/// </summary>
public class ErrorResult() : ProblemDetails
{
    public DateTime DateTime { get; private set; } = DateTime.Now;
}