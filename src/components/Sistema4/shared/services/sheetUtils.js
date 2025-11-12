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

/**
 * Mapea los datos procesados al formato esperado por el DataGrid.
 */
export const mapSheetToGridData = (item, index) => ({
  id: item.id || index + 1,
  folio: item.folio,
  entidad: item.entidad,
  programa: item.programa,
  area: item.area,
  responsable: item.responsable,
  origenDatos: item.origenDatos,
  hipervinculo: item.hipervinculo,
  año: item.año,
});