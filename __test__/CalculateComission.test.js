const { CommissionCalculator } = require("../BusinessCalculateComission");

describe("Commission Calculator Tests", () => {
    let calculator;

    beforeEach(() => {
        calculator = new CommissionCalculator();
    });

    // Test for valid input with default settings
    test("Valid input with default settings", () => {
        const result = calculator.calculateCommission(50, 60, 70);
        expect(result.totalSales).toBe(5800);
        expect(result.commission).toBe(1151); // Expected commission value corrected
    });

    // Test for valid input with custom product costs
    test("Valid input with custom product costs", () => {
        calculator.setProductCosts(50, 35, 30);
        const result = calculator.calculateCommission(50, 60, 70);
        expect(result.totalSales).toBe(6700);
        expect(result.commission).toBe(1330); // Expected commission value corrected
    });

    // Test for valid input with custom sales limits
    test("Valid input with custom sales limits", () => {
        calculator.setSalesLimits(80, 90, 100);
        const result = calculator.calculateCommission(80, 90, 100);
        expect(result.totalSales).toBe(8800);
        expect(result.commission).toBe(1751); // Expected commission value corrected
    });

    // Test for valid input with custom commission rates
    test("Valid input with custom commission rates", () => {
        calculator.setCommissionRates(0.08, 0.12, 0.18);
        const result = calculator.calculateCommission(50, 60, 70);
        expect(result.totalSales).toBe(5800);
        expect(result.commission).toBe(1035.9); // Expected commission value corrected
    });

    // Test for invalid input: negative quantity
    test("Invalid input: negative quantity", () => {
        expect(() => calculator.calculateCommission(-50, 60, 70)).toThrow(
            "Invalid input. Quantity must be a non-negative number.",
        );
    });

    // Test for invalid input: non-numeric quantity
    test("Invalid input: non-numeric quantity", () => {
        expect(() => calculator.calculateCommission("50", 60, 70)).toThrow(
            "Invalid input. Quantity must be a non-negative number.",
        );
    });

    // Test for sales exceeding maximum limits: locks
    test("Sales exceed maximum limits: locks", () => {
        expect(() => calculator.calculateCommission(80, 60, 70)).toThrow(
            "Sales quantities exceed maximum limits.",
        );
    });

    // Test for sales exceeding maximum limits: stocks
    test("Sales exceed maximum limits: stocks", () => {
        expect(() => calculator.calculateCommission(50, 90, 70)).toThrow(
            "Sales quantities exceed maximum limits.",
        );
    });

    // Test for sales exceeding maximum limits: barrels
    test("Sales exceed maximum limits: barrels", () => {
        expect(() => calculator.calculateCommission(50, 60, 100)).toThrow(
            "Sales quantities exceed maximum limits.",
        );
    });

    // Test for commission calculation edge case: low total sales
    test("Commission calculation edge case: low total sales", () => {
        const result = calculator.calculateCommission(0, 0, 0);
        expect(result.totalSales).toBe(0);
        expect(result.commission).toBe(0);
    });

    // Test for commission calculation edge case: medium total sales
    test("Commission calculation edge case: medium total sales", () => {
        const result = calculator.calculateCommission(70, 80, 90);
        expect(result.totalSales).toBe(7800);
        expect(result.commission).toBe(1551); // Expected commission value corrected
    });

    // Test for commission calculation edge case: medium total sales
    test("Commission calculation edge case: medium total sales", () => {
        const result = calculator.calculateCommission(7, 11, 45);
        expect(result.totalSales).toBe(1770);
        expect(result.commission).toBe(258.75); // Expected commission value corrected
    });

    // Test for commission calculation edge case: high total sales
    test("Commission calculation edge case: high total sales", () => {
        expect(() => calculator.calculateCommission(100, 100, 100)).toThrow(
            "Sales quantities exceed maximum limits.",
        );
    });

    // Test for resetting defaults: product costs
    test("Reset defaults: product costs", () => {
        calculator.setProductCosts(50, 35, 30);
        calculator.resetDefaults();
        const result = calculator.calculateCommission(50, 60, 70);
        expect(result.totalSales).toBe(5800);
        expect(result.commission).toBe(1151); // Expected commission value corrected
    });

    // Test for resetting defaults: sales limits
    test("Reset defaults: sales limits", () => {
        calculator.setSalesLimits(80, 90, 100);
        calculator.resetDefaults();
        const result = calculator.calculateCommission(50, 60, 70);
        expect(result.totalSales).toBe(5800);
        expect(result.commission).toBe(1151); // Expected commission value corrected
    });

    // Test for resetting defaults: commission rates
    test("Reset defaults: commission rates", () => {
        calculator.setCommissionRates(0.08, 0.12, 0.18);
        calculator.resetDefaults();
        const result = calculator.calculateCommission(50, 60, 70);
        expect(result.totalSales).toBe(5800);
        expect(result.commission).toBe(1151); // Expected commission value corrected
    });
});
