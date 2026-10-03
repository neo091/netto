import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import { calculateSettlement, getDateRange } from "./util";

describe("Cálculos de Fechas netto", () => {
  beforeEach(() => {
    // Congelamos el tiempo en una fecha específica para que los tests sean deterministas
    // Usamos un lunes para facilitar el cálculo de la semana
    const mockDate = new Date("2026-02-16T12:00:00Z"); // Lunes 16 de Feb
    vi.useFakeTimers();
    vi.setSystemTime(mockDate);
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("Debería obtener el inicio de 'hoy' (00:00:00)", () => {
    const dateRange = getDateRange("today");
    const expectedDate = new Date();
    expectedDate.setHours(0, 0, 0, 0);

    expect(dateRange).toBe(expectedDate.toISOString());
  });

  it("Debería retornar null para el filtro 'all'", () => {
    const dateRange = getDateRange("all");
    expect(dateRange).toBeNull();
  });
});

describe("Cálculos de Liquidación Netto", () => {
  it("debería calcular correctamente cuando el pago es en TARJETA (CARD)", () => {
    // Viaje de 100 € en tarjeta, con una comisión del 30 %.
    // La empresa debe entregar 30 € al conductor.
    const result = calculateSettlement(100, "CARD", 30);

    expect(result).toBe(30);
  });

  it("debería calcular correctamente cuando el pago es en EFECTIVO (CASH)", () => {
    // Viaje de 100€ en efectivo. Mi parte son 40€. Tengo 100€ en mano.
    // Debo entregar 60€ (Resultado: -60).
    const result = calculateSettlement(100, "CASH", 40);
    expect(result).toBe(-60);
  });

  it("calcula la liquidación de un viaje con céntimos", () => {
    // El 40 % de 12,50 € son 5 € para el conductor.
    expect(calculateSettlement(12.5, "CARD", 40)).toBeCloseTo(5, 2);

    // Si cobra 12,50 € en efectivo, debe entregar 7,50 €.
    expect(calculateSettlement(12.5, "CASH", 40)).toBeCloseTo(-7.5, 2);
  });
});
