namespace ConvenienceStore.Shared.Utils;

public class ErrorResult(string? message)
{
    public string? Message { get; private set; } = message;
    public DateTime DateTime { get; private set; } = DateTime.Now;
}