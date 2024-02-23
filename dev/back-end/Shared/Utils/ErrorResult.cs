using Microsoft.AspNetCore.Mvc;

namespace ConvenienceStore.Shared.Utils;

public class ErrorResult() : ProblemDetails
{
    public DateTime DateTime { get; private set; } = DateTime.Now;
}