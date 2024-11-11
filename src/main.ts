import { Product } from "./interfaces/products.type";
import { products } from "./data/products";
import { Customer } from "./interfaces/customers.type";
import { customers } from "./data/customers";
import { Sale } from "./interfaces/sales.type";
import { sales } from "./data/sales";




/////////// Pregunta 01 ///////////

// Función para obtener productos más vendidos
const bestSellingProducts = (products: Product[], sales: Sale[]) => {
  
  // Sumar las cantidades vendidas por producto
  const productSales = products.map(product => {

    // Encontrar todas las ventas del producto
    const totalSales = sales
      .filter(sale => sale.productId === product.id) // Filtramos las ventas que corresponden al producto
      .reduce((total, sale) => total + sale.quantitySold, 0); // Sumamos la cantidad vendida

    // Retornar el producto con la cantidad total de ventas
    return { ...product, totalSales }; // Extendemos el objeto del producto con la propiedad `totalSales`
  });

  // Paso 2: Ordenar los productos por la cantidad de ventas en orden descendente
  const sortedProducts = productSales.sort((a, b) => b.totalSales - a.totalSales);

  // Paso 3: Retornar los 3 productos más vendidos
  return sortedProducts.slice(0, 3); // Tomamos solo los primeros 3 productos
}

const topProducts = bestSellingProducts(products, sales);

console.table(topProducts); 




/////////// Pregunta 02 ///////////

// Función para calcular el total de ingresos por categoría de producto
const getTotalIncomeByCategory = (products: Product[], sales: Sale[]) => {
  // Crear un objeto para almacenar el total de ingresos por categoría
  const incomeByCategory: Record<string, number> = {};

  // Recorremos todas las ventas
  sales.forEach(sale => {
    // Encontrar el producto correspondiente a la venta
    const product = products.find(p => p.id === sale.productId);
    
    // Si encontramos el producto, calculamos los ingresos
    if (product) {
      const income = product.price * sale.quantitySold;
      
      // Sumar el ingreso a la categoría correspondiente
      if (incomeByCategory[product.category]) {
        incomeByCategory[product.category] += income;
      } else {
        incomeByCategory[product.category] = income;
      }
    }
  });

  return incomeByCategory;
};

// Ejecución de la función con los datos proporcionados
const totalIncomeByCategory = getTotalIncomeByCategory(products, sales);
console.table(totalIncomeByCategory);




/////////// Pregunta 03 ///////////

// Función para identificar clientes VIP
const getVIPCustomers = (products: Product[], sales: Sale[], customers: Customer[]) => {
  // Crear un objeto para almacenar el total gastado por cada cliente
  const customerTotalSpent: Record<number, number> = {};

  // Recorremos todas las ventas
  sales.forEach(sale => {
    const product = products.find(p => p.id === sale.productId);
    if (product) {
      // Calcular el ingreso de la venta
      const income = product.price * sale.quantitySold;
      
      // Sumar el total gastado por el cliente
      if (customerTotalSpent[sale.CostumerId]) {
        customerTotalSpent[sale.CostumerId] += income;
      } else {
        customerTotalSpent[sale.CostumerId] = income;
      }
    }
  });

  // Filtrar clientes VIP (total gastado > 1,000,000)
  const vipCustomers = customers.filter(customer => {
    const totalSpent = customerTotalSpent[customer.customerId] || 0;
    return totalSpent > 1000000; // Filtrar solo aquellos con más de 1,000,000 de total gastado
  }).map(customer => {
    // Agregar el total gastado a cada cliente
    const totalSpent = customerTotalSpent[customer.customerId] || 0;
    return { ...customer, totalSpent };
  });

  return vipCustomers;
};

// Ejecución de la función con los datos proporcionados
const vipCustomers = getVIPCustomers(products, sales, customers);
console.table(vipCustomers);





/////////// Pregunta 04 ///////////

// Función para generar el reporte de inventario
const generateInventoryReport = (products: Product[]) => {
  // Mapeamos los productos para crear el reporte
  return products.map(product => {
    let status: string;
    
    // Determinamos el estado según el stock
    if (product.stock < 10) {
      status = "Low Stock";
    } else if (product.stock <= 20) {
      status = "In Stock";
    } else {
      status = "Enough Stock";
    }

    // Retornamos el objeto con los detalles del producto y su estado
    return {
      name: product.name,
      category: product.category,
      stock: product.stock,
      status: status
    };
  });
};

// Ejecución de la función con los datos proporcionados
const inventoryReport = generateInventoryReport(products);
console.table(inventoryReport);
