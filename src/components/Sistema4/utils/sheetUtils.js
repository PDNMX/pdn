/**
 * Convierte la respuesta cruda de Google Sheets en un array de objetos.
 */
export function processSheetData(values) {
  if (!values || values.length < 2) return [];
  const headers = values[0];
  return values.slice(1).map(row =>
    headers.reduce((obj, header, i) => ({ ...obj, [header]: row[i] }), {})
  );
}
