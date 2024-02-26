namespace ConvenienceStore.Shared.Exceptions;

/// <summary>
/// Exceção lançada quando um recurso não é encontrado no banco de dados
/// </summary>
/// <param name="message">Mensagem de Erro</param>
public class NotFoundException(string? message) : Exception(message)
{
}