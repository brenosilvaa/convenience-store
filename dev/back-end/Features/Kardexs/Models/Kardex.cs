using ConvenienceStore.Features.Products.Models;

namespace ConvenienceStore.Features.Kardexs.Models;

public class Kardex
{
    #region Properties
    public Guid Id { get; private set; }
    public Product? Product { get; private set; }
    public long ProductId { get; private set; }
    public DateTime Date { get; private set; }
    public bool IsEntry { get; private set; }
    public int QuantityAbsolute { get; private set; }
    public int Quantity { get; private set; }
    public decimal AbsoluteUnityValue { get; private set; }
    public decimal UnityValue { get; private set; }
    public decimal AbsoluteTotalValue { get; private set; }
    public decimal TotalValue { get; private set; }
    public string? Historic { get; private set; }
    public int SaldoDisponivel { get; private set; }
    public decimal CustoMedio { get; private set; }
    #endregion

    #region Methods
    public void CalcularCustoMedio(decimal CustoMedio) { }
    public void CalcularSaldoDisponivel(int SaldoDisponivel) { }
    public void CalcularValorTotal(decimal TotalValue) { }
    public void RelativizarValor(decimal UnityValue) { }

    public override string ToString() => $"Id: {Id} | ProductId: {ProductId} | Date: {Date} |" +
        $" Quantity {Quantity} | TotalValue {TotalValue}";

    #endregion
}
