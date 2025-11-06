import React, { createContext, useContext } from "react";
import { useSheetData } from "./useSheetData";
import { mapSheetToGridData as mapAuditorias } from "../TablaAuditorias/columns";
import { mapSheetToGridData as mapInformes } from "../TablaInformes/columns";

const Sistema4DataContext = createContext(null);

const URL_AUDITORIAS =
  "https://sheets.googleapis.com/v4/spreadsheets/1sc79o9tc3qkqbYExGmagIYhtRkpKnYPH2LEZTNlhjUs/values/Programas_Anuales_de_Auditorias?key=AIzaSyDrvQehuVTPGJVCFVx3FUeAq2zqYbTCFDo";

const URL_INFORMES =
  "https://sheets.googleapis.com/v4/spreadsheets/1sc79o9tc3qkqbYExGmagIYhtRkpKnYPH2LEZTNlhjUs/values/Informes_Publicos_de_Fiscalizacion?key=AIzaSyDrvQehuVTPGJVCFVx3FUeAq2zqYbTCFDo";

/**
 * Context Provider que precarga los datos de todas las tablas del Sistema 4
 */
export function Sistema4DataProvider({ children }) {
  // ✅ Los hooks se llaman dentro del cuerpo del componente → no hay error
  const auditorias = useSheetData(URL_AUDITORIAS, mapAuditorias);
  const informes = useSheetData(URL_INFORMES, mapInformes);

  // puedes agregar más hojas aquí si las necesitas después
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
