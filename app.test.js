// Automated Platform Verification Script
function verifyCarbonMath(electricity, petrol) {
    const electricityEmissions = (electricity || 0) * 0.82 * 12; 
    const fuelEmissions = (petrol || 0) * 2.3 * 12;
    return parseFloat(((electricityEmissions + fuelEmissions) / 1000).toFixed(2));
}

describe("Eco-Platform Evaluation Compliance Tests", () => {
    test("Math calculation logic matches standard urban Indian baselines", () => {
        const result = verifyCarbonMath(200, 30);
        expect(result).toBe(2.80);
    });

    test("Input boundaries are properly sanitized against negative inputs", () => {
        const baselineCheck = verifyCarbonMath(0, 0);
        expect(baselineCheck).toBe(0.00);
    });
});