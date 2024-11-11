export interface Sale {
    saleId: number;
    productId: number;
    quantitySold: number;
    dateSale: Date;
    CostumerId: number;
  }



 export  interface ProductSalesData {
  sales: number[];            // Lista de saleId
  totalQuantitySold: number;  // Suma acumulada de quantitySold
  count: number;              // Número de ventas para calcular el promedio
}