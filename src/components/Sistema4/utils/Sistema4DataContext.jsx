import React, { createContext, useContext } from "react";
import { useSheetData } from "./useSheetData";

const Sistema4DataContext = createContext(null);

// Funciones de mapeo para Auditorías
// Mapea: entidad -> entePublico, programa -> nombreDocumento
const mapAuditorias = (item, index) => ({
  id: index + 1,
  folio: item.folio || "",
  año: item.año || "",
  nombreDocumento: item.programa || "", // programa es el nombre del documento
  entePublico: item.entidad || "", // entidad es el ente público
  hipervinculo: item.hipervinculo || "",
});

// Funciones de mapeo para Informes
// Los campos ya coinciden, solo agregamos folio si no existe
const mapInformes = (item, index) => ({
  id: index + 1,
  folio: item.folio || `INF-${item.año}-${String(index).padStart(3, '0')}`, // Generar folio si no existe
  año: item.año || "",
  nombreInforme: item.nombreInforme || "",
  entePublico: item.entePublico || "",
  hipervinculo: item.hipervinculo || "",
});

const URL_AUDITORIAS =
  "https://sheets.googleapis.com/v4/spreadsheets/1sc79o9tc3qkqbYExGmagIYhtRkpKnYPH2LEZTNlhjUs/values/Programas_Anuales_de_Auditorias?key=AIzaSyDrvQehuVTPGJVCFVx3FUeAq2zqYbTCFDo";

const URL_INFORMES =
  "https://sheets.googleapis.com/v4/spreadsheets/1sc79o9tc3qkqbYExGmagIYhtRkpKnYPH2LEZTNlhjUs/values/Informes_Publicos_de_Fiscalizacion?key=AIzaSyDrvQehuVTPGJVCFVx3FUeAq2zqYbTCFDo";

/**
 * Context Provider que precarga los datos de todas las tablas del Sistema 4
 */
export function Sistema4DataProvider({ children }) {
  const auditorias = useSheetData(URL_AUDITORIAS, mapAuditorias);
  const informes = useSheetData(URL_INFORMES, mapInformes);

  console.log("Sistema4DataProvider - Auditorias:", {
    loading: auditorias.loading,
    error: auditorias.error,
    rowsCount: auditorias.rows.length,
  });
  console.log("Sistema4DataProvider - Informes:", {
    loading: informes.loading,
    error: informes.error,
    rowsCount: informes.rows.length,
  });

  const value = { auditorias, informes };

  return (
    <Sistema4DataContext.Provider value={value}>
      {children}
    </Sistema4DataContext.Provider>
  );
}

/**
 * Hook para consumir los datos en cualquier tabla o componente
 */
export function useSistema4Data() {
  const ctx = useContext(Sistema4DataContext);
  if (!ctx)
    throw new Error(
      "useSistema4Data debe usarse dentro de <Sistema4DataProvider>"
    );
  return ctx;
}
