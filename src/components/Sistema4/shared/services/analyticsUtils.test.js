import test from "node:test";
import assert from "node:assert/strict";
import {
  PROGRAM_FILTER_FIELDS,
  aggregateAnalyticsRows,
  buildPilotCoverage,
  filterAnalyticsRows,
  getAnalyticsFilterOptions,
  parseNumericValue,
  summarizeNumericField,
} from "./analyticsUtils.js";

const rows = [
  {
    año: "2024",
    entidadFederativa: "TABASCO",
    entePublico: "Secretaría A",
    nombreDocumento: "Programa anual",
    totalAuditorias: "10",
    totalMontoAuditar: "$1,250.50",
  },
  {
    año: "2024",
    entidadFederativa: " Tabasco ",
    entePublico: "Secretaría B",
    nombreDocumento: "Programa especial",
    totalAuditorias: "5",
    totalMontoAuditar: "En proceso",
  },
  {
    año: "2025",
    entidadFederativa: "Guanajuato",
    entePublico: "Secretaría C",
    nombreDocumento: "Plan de auditoría",
    totalAuditorias: "7",
    totalMontoAuditar: "$0.00",
  },
];

test("convierte montos y rechaza estados sin valor numérico", () => {
  assert.equal(parseNumericValue("$3,431,730,447.00"), 3431730447);
  assert.equal(parseNumericValue("(1,250.25)"), -1250.25);
  assert.equal(parseNumericValue("$0.00"), 0);
  assert.equal(parseNumericValue("N/A"), null);
  assert.equal(parseNumericValue("NA"), null);
  assert.equal(parseNumericValue("En proceso / Conjunta"), null);
  assert.equal(parseNumericValue(""), null);
});

test("combina filtros de selección y búsqueda sin distinguir mayúsculas", () => {
  const filtered = filterAnalyticsRows(
    rows,
    {
      query: "especial",
      year: "2024",
      entity: "tabasco",
      publicBody: "",
    },
    PROGRAM_FILTER_FIELDS
  );

  assert.equal(filtered.length, 1);
  assert.equal(filtered[0].entePublico, "Secretaría B");
});

test("genera opciones en cascada y agrupa etiquetas equivalentes", () => {
  const options = getAnalyticsFilterOptions(
    rows,
    { query: "", year: "2024", entity: "tabasco", publicBody: "" },
    PROGRAM_FILTER_FIELDS
  );

  assert.deepEqual(options.years, ["2024", "2025"]);
  assert.deepEqual(options.entities, ["TABASCO"]);
  assert.deepEqual(options.publicBodies, ["Secretaría A", "Secretaría B"]);

  const aggregated = aggregateAnalyticsRows(rows, "entidadFederativa", {
    actos: "totalAuditorias",
  });

  assert.equal(aggregated.length, 2);
  assert.equal(aggregated.find((item) => item.grupo === "TABASCO").actos, 15);
});

test("excluye faltantes de la suma y conserva la cobertura", () => {
  const summary = summarizeNumericField(rows, "totalMontoAuditar");

  assert.equal(summary.value, 1250.5);
  assert.equal(summary.valid, 2);
  assert.equal(summary.total, 3);
  assert.equal(summary.hasData, true);
});

test("construye la cobertura del piloto por entidad y ejercicio", () => {
  const coverage = buildPilotCoverage(
    [
      {
        año: "2024",
        entidadFederativa: "TABASCO",
        enlace: "https://ejemplo.mx/paa-2024",
      },
      {
        año: "2025",
        entidadFederativa: "Tabasco",
        enlace: "N/A",
      },
    ],
    [
      {
        año: "2024",
        entidadFederativa: "Tabasco",
        enlace: "https://ejemplo.mx/informe-2024",
      },
      {
        año: "2025",
        entidadFederativa: "Guanajuato",
        enlace: "",
      },
    ]
  );

  assert.deepEqual(coverage.years, ["2024", "2025"]);
  assert.equal(coverage.stateCount, 2);
  assert.equal(coverage.programCount, 2);
  assert.equal(coverage.reportCount, 2);
  assert.equal(coverage.programsWithLink, 1);
  assert.equal(coverage.reportsWithLink, 1);

  const tabasco = coverage.states.find((state) => state.state === "Tabasco");
  assert.deepEqual(tabasco.byYear["2024"], { programs: 1, reports: 1 });
  assert.deepEqual(tabasco.byYear["2025"], { programs: 1, reports: 0 });
});

