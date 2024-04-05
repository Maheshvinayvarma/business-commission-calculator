const { CommissionCalculator } = require("./BusinessCalculateComission");

// Usage example
const calculator = new CommissionCalculator();
calculator.setProductCosts(50, 35, 30); // Custom product costs
calculator.setSalesLimits(80, 90, 100); // Custom sales limits
calculator.setCommissionRates(0.08, 0.12, 0.18); // Custom commission rates

try {
    const result = calculator.calculateCommission(50, 60, 70);
    console.log("Total Sales:", result.totalSales);
    console.log("Commission:", result.commission);
} catch (error) {
    console.error("Error:", error.message);
}
