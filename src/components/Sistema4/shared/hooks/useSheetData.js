import { useState, useEffect } from "react";
import { processSheetData } from "../services/sheetUtils";

/**
 * Hook genérico para cargar datos desde una hoja de Google Sheets
 * @param {string} apiUrl - URL completa del endpoint de Google Sheets
 * @param {(item: any, index: number) => any} mapFn - función que transforma cada fila al formato del DataGrid
 */
export function useSheetData(apiUrl, mapFn) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`Error ${response.status}`);
        const data = await response.json();
        const processedData = processSheetData(data.values);
        const mappedData = processedData.map(mapFn);
        setRows(mappedData);
      } catch (err) {
        console.error("Error fetching sheet data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [apiUrl]);

  return { rows, loading, error };
}
