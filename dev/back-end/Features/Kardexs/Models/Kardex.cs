using ConvenienceStore.Features.Products.Models;

namespace ConvenienceStore.Features.Kardexs.Models;

public class Kardex
{
    #region Properties

    public Guid Id { get; private set; }
    public Guid ProductId { get; private set; }
    public virtual Product? Product { get; private set; }
    public DateTime Date { get; private set; }
    public bool IsEntry { get; private set; }
    public int AbsoluteQuantity { get; private set; }
    public decimal AbsoluteUnitValue { get; private set; }
    public decimal AbsoluteTotalValue { get; private set; }
    public int Quantity { get; private set; }
    public decimal UnitValue { get; private set; }
    public decimal TotalValue { get; private set; }
    public string History { get; private set; }
    public int AvailableStock { get; private set; }
    public decimal AverageCost { get; private set; }

    #endregion

    #region Constructors

    public Kardex(Guid productId, bool isEntry, int absoluteQuantity, decimal absoluteUnitValue, string history)
    {
        ProductId = productId;
        Date = DateTime.Now;
        IsEntry = isEntry;
        AbsoluteQuantity = absoluteQuantity;
        AbsoluteUnitValue = absoluteUnitValue;
        History = history;

        CalcTotalValue();
        RelativizeValues();
    }

    #endregion

    #region Methods

    public void CalcularCustoMedio(decimal CustoMedio)
    {
        throw new NotImplementedException();
    }

    public void CalcularSaldoDisponivel(int SaldoDisponivel)
    {
        throw new NotImplementedException();
    }

    private void CalcTotalValue() => AbsoluteTotalValue = AbsoluteQuantity * AbsoluteUnitValue;

    private void RelativizeValues()
    {
        if (!IsEntry)
        {
            Quantity = AbsoluteQuantity * -1;
            UnitValue = AbsoluteUnitValue * -1;
            TotalValue = AbsoluteUnitValue * -1;
        }
        else
        {
            Quantity = AbsoluteQuantity;
            UnitValue = AbsoluteUnitValue;
            TotalValue = AbsoluteUnitValue;
        }
    }

    public override string ToString() => $"Id: {Id} | ProductId: {ProductId} | Date: {Date} |" +
                                         $" Quantity {Quantity} | TotalValue {TotalValue}";

    #endregion
}