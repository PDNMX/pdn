export const EMPTY_ANALYTICS_FILTERS = Object.freeze({
  query: "",
  year: "",
  entity: "",
  publicBody: "",
});

export const PROGRAM_FILTER_FIELDS = Object.freeze({
  year: "año",
  entity: "entidadFederativa",
  publicBody: "entePublico",
  searchable: [
    "año",
    "entidadFederativa",
    "entePublico",
    "ambito",
    "nombreDocumento",
  ],
});

export const REPORT_FILTER_FIELDS = Object.freeze({
  year: "año",
  entity: "entidadFederativa",
  publicBody: "entePublico",
  searchable: [
    "año",
    "entidadFederativa",
    "entePublico",
    "nombreInforme",
  ],
});

export const normalizeText = (value) =>
  String(value ?? "")
    .trim()
    .replace(/\s+/g, " ")
    .toLocaleLowerCase("es-MX");

export const parseNumericValue = (value) => {
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : null;
  }

  if (value === null || value === undefined) return null;

  const text = String(value).trim();
  if (!text || !/\d/.test(text)) return null;

  const isNegative = /^\(.*\)$/.test(text);
  const normalized = text.replace(/[^0-9.-]/g, "");
  if (!normalized || normalized === "-" || normalized === ".") return null;

  const parsed = Number(normalized);
  if (!Number.isFinite(parsed)) return null;
  return isNegative ? -Math.abs(parsed) : parsed;
};

const matchesSelection = (value, selection) =>
  !selection || normalizeText(value) === normalizeText(selection);

export const filterAnalyticsRows = (
  rows,
  filters = EMPTY_ANALYTICS_FILTERS,
  fields
) => {
  const query = normalizeText(filters.query);

  return (rows || []).filter((row) => {
    if (!matchesSelection(row[fields.year], filters.year)) return false;
    if (!matchesSelection(row[fields.entity], filters.entity)) return false;
    if (!matchesSelection(row[fields.publicBody], filters.publicBody))
      return false;

    if (!query) return true;

    return fields.searchable.some((field) =>
      normalizeText(row[field]).includes(query)
    );
  });
};

const getCanonicalOptions = (rows, field) => {
  const byNormalizedValue = new Map();

  (rows || []).forEach((row) => {
    const value = String(row[field] ?? "").trim().replace(/\s+/g, " ");
    const normalized = normalizeText(value);
    if (normalized && !byNormalizedValue.has(normalized)) {
      byNormalizedValue.set(normalized, value);
    }
  });

  return Array.from(byNormalizedValue.values()).sort((a, b) =>
    a.localeCompare(b, "es-MX", { numeric: true, sensitivity: "base" })
  );
};

export const getAnalyticsFilterOptions = (rows, filters, fields) => {
  const yearRows = rows || [];
  const entityRows = yearRows.filter((row) =>
    matchesSelection(row[fields.year], filters.year)
  );
  const publicBodyRows = entityRows.filter((row) =>
    matchesSelection(row[fields.entity], filters.entity)
  );

  return {
    years: getCanonicalOptions(yearRows, fields.year),
    entities: getCanonicalOptions(entityRows, fields.entity),
    publicBodies: getCanonicalOptions(publicBodyRows, fields.publicBody),
  };
};

export const summarizeNumericField = (rows, field) => {
  let value = 0;
  let valid = 0;

  (rows || []).forEach((row) => {
    const parsed = parseNumericValue(row[field]);
    if (parsed !== null) {
      value += parsed;
      valid += 1;
    }
  });

  return {
    value,
    valid,
    total: (rows || []).length,
    hasData: valid > 0,
  };
};

const hasAvailableValue = (value) => {
  const normalized = normalizeText(value);
  return (
    Boolean(normalized) &&
    !["na", "n/a", "sin dato", "no aplica"].includes(normalized)
  );
};

const chooseDisplayLabel = (current, candidate) => {
  const value = String(candidate ?? "").trim().replace(/\s+/g, " ");
  if (!current) return value;

  const currentIsUppercase = current === current.toLocaleUpperCase("es-MX");
  const candidateHasLowercase = value !== value.toLocaleUpperCase("es-MX");
  return currentIsUppercase && candidateHasLowercase ? value : current;
};

export const buildPilotCoverage = (programRows = [], reportRows = []) => {
  const states = new Map();
  const years = new Set();

  const addRows = (rows, type) => {
    rows.forEach((row) => {
      const rawState = String(row.entidadFederativa ?? "").trim();
      const stateKey = normalizeText(rawState);
      const year = String(row.año ?? "").trim();
      if (!stateKey || !year) return;

      years.add(year);
      if (!states.has(stateKey)) {
        states.set(stateKey, {
          key: stateKey,
          state: rawState,
          programs: 0,
          reports: 0,
          programsWithLink: 0,
          reportsWithLink: 0,
          byYear: {},
        });
      }

      const state = states.get(stateKey);
      state.state = chooseDisplayLabel(state.state, rawState);
      if (!state.byYear[year]) {
        state.byYear[year] = { programs: 0, reports: 0 };
      }

      if (type === "programs") {
        state.programs += 1;
        state.byYear[year].programs += 1;
        if (hasAvailableValue(row.enlace)) state.programsWithLink += 1;
      } else {
        state.reports += 1;
        state.byYear[year].reports += 1;
        if (hasAvailableValue(row.enlace)) state.reportsWithLink += 1;
      }
    });
  };

  addRows(programRows, "programs");
  addRows(reportRows, "reports");

  const sortedYears = Array.from(years).sort((a, b) =>
    a.localeCompare(b, "es-MX", { numeric: true })
  );
  const stateRows = Array.from(states.values()).sort((a, b) =>
    a.state.localeCompare(b.state, "es-MX", { sensitivity: "base" })
  );

  return {
    years: sortedYears,
    states: stateRows,
    stateCount: stateRows.length,
    programCount: stateRows.reduce(
      (total, state) => total + state.programs,
      0
    ),
    reportCount: stateRows.reduce(
      (total, state) => total + state.reports,
      0
    ),
    programsWithLink: stateRows.reduce(
      (total, state) => total + state.programsWithLink,
      0
    ),
    reportsWithLink: stateRows.reduce(
      (total, state) => total + state.reportsWithLink,
      0
    ),
  };
};

export const aggregateAnalyticsRows = (rows, dimensionField, metrics) => {
  const groups = new Map();

  (rows || []).forEach((row) => {
    const rawLabel = String(row[dimensionField] ?? "").trim();
    const normalizedLabel = normalizeText(rawLabel);
    if (!normalizedLabel) return;

    if (!groups.has(normalizedLabel)) {
      groups.set(normalizedLabel, {
        grupo: rawLabel,
        registros: 0,
      });
    }

    const group = groups.get(normalizedLabel);
    group.registros += 1;

    Object.entries(metrics).forEach(([metricKey, field]) => {
      const parsed = field === null ? 1 : parseNumericValue(row[field]);
      if (parsed !== null) {
        group[metricKey] = (group[metricKey] || 0) + parsed;
      }
    });
  });

  return Array.from(groups.values()).sort((a, b) =>
    a.grupo.localeCompare(b.grupo, "es-MX", {
      numeric: true,
      sensitivity: "base",
    })
  );
};

export const combineRowsForFilters = (datasets) =>
  datasets.flatMap(({ rows, fields }) =>
    (rows || []).map((row) => ({
      año: row[fields.year],
      entidadFederativa: row[fields.entity],
      entePublico: row[fields.publicBody],
      textoBusqueda: fields.searchable.map((field) => row[field]).join(" "),
    }))
  );

export const CONSOLIDATED_FILTER_FIELDS = Object.freeze({
  year: "año",
  entity: "entidadFederativa",
  publicBody: "entePublico",
  searchable: [
    "año",
    "entidadFederativa",
    "entePublico",
    "textoBusqueda",
  ],
});

