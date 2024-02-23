using ConvenienceStore.Shared.Exceptions;
using ConvenienceStore.Shared.Utils;
using Microsoft.AspNetCore.Diagnostics;

namespace ConvenienceStore.Shared.Middlewares;

public class GlobalExceptionHandler : IExceptionHandler
{
    public async ValueTask<bool> TryHandleAsync(
        HttpContext httpContext,
        Exception exception,
        CancellationToken cancellationToken)
    {
        var status = exception switch
        {
            NotFoundException => StatusCodes.Status404NotFound,
            UnauthorizedAccessException => StatusCodes.Status401Unauthorized,
            _ => StatusCodes.Status400BadRequest
        };

        var problemDetails = new ErrorResult
        {
            Status = status,
            Title = exception.Message,
            Detail = exception.InnerException?.Message,
        };

        httpContext.Response.StatusCode = status;

        await httpContext.Response
            .WriteAsJsonAsync(problemDetails, cancellationToken);

        return true;
    }
}