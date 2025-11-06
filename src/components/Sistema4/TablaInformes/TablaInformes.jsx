import React from "react";
import { useSistema4Data } from "../shared/Sistema4DataContext";
import { columns } from "./columns";
import DataGridBase from "../shared/DataGridBase";
import DescargaSistema4 from "../shared/DescargaSistema4";

const TablaInformes = () => {
  const { informes } = useSistema4Data();

  const descriptionItems = [
    "Informes públicos de fiscalización generados por las entidades de control.",
    "Información detallada sobre las auditorías y seguimientos realizados.",
    "Utiliza los filtros en cada columna para buscar información específica por año, trimestre o entidad.",
  ];

  return (
    <>
      <DataGridBase
        title="Aquí puedes consultar:"
        descriptionItems={descriptionItems}
        data={{ ...informes, columns }}
      />
      <DescargaSistema4 fileName="informes" data={informes.rows} />
    </>
  );
};

export default TablaInformes;
