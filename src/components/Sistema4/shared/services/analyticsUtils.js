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

