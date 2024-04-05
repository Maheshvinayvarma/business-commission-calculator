// CalculateComission.js has errors that need to be fixed
class CommissionCalculator {
    constructor() {
        // Default product costs
        this.defaultLockCost = 45;
        this.defaultStockCost = 30;
        this.defaultBarrelCost = 25;

        // Default sales limits
        this.defaultMaxLocks = 70;
        this.defaultMaxStocks = 80;
        this.defaultMaxBarrels = 90;

        // Initialize with default values
        this.resetDefaults();
    }

    calculateCommission(lockQty, stockQty, barrelQty) {
        // Validate input
        if (
            !this.isValidQuantity(lockQty) ||
            !this.isValidQuantity(stockQty) ||
            !this.isValidQuantity(barrelQty)
        ) {
            throw new Error(
                "Invalid input. Quantity must be a non-negative number.",
            );
        }

        // Check if sales exceed any limits
        if (
            lockQty > this.maxLocks ||
            stockQty > this.maxStocks ||
            barrelQty > this.maxBarrels
        ) {
            throw new Error("Sales quantities exceed maximum limits.");
        }

        // Calculate total sales
        const totalSales =
            lockQty * this.lockCost +
            stockQty * this.stockCost +
            barrelQty * this.barrelCost;

        // Calculate commission
        let commissionRate;
        if (totalSales <= 1000) {
            commissionRate = this.lowCommissionRate;
        } else if (totalSales <= 1800) {
            commissionRate = this.mediumCommissionRate;
        } else {
            commissionRate = this.highCommissionRate;
        }

        // Calculate commission
        let commission = totalSales * commissionRate;

        // Subtract commission for 1 lock
        commission -= this.lockCost * commissionRate;

        if(commission < 0) {
            commission = 0;
        }

        return { totalSales, commission };
    }

    isValidQuantity(quantity) {
        return typeof quantity === "number" && quantity >= 0;
    }

    setProductCosts(lockCost, stockCost, barrelCost) {
        this.lockCost = lockCost;
        this.stockCost = stockCost;
        this.barrelCost = barrelCost;
    }

    setSalesLimits(maxLocks, maxStocks, maxBarrels) {
        this.maxLocks = maxLocks;
        this.maxStocks = maxStocks;
        this.maxBarrels = maxBarrels;
    }

    setCommissionRates(lowRate, mediumRate, highRate) {
        this.lowCommissionRate = lowRate;
        this.mediumCommissionRate = mediumRate;
        this.highCommissionRate = highRate;
    }

    resetDefaults() {
        this.lockCost = this.defaultLockCost;
        this.stockCost = this.defaultStockCost;
        this.barrelCost = this.defaultBarrelCost;
        this.maxLocks = this.defaultMaxLocks;
        this.maxStocks = this.defaultMaxStocks;
        this.maxBarrels = this.defaultMaxBarrels;
        this.lowCommissionRate = 0.1;
        this.mediumCommissionRate = 0.15;
        this.highCommissionRate = 0.2;
    }
}

module.exports = {
    CommissionCalculator,
};
