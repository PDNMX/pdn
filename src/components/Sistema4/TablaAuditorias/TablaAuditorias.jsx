import React from "react";
import { useSistema4Data } from "../shared/Sistema4DataContext";
import { columns } from "./columns";
import DataGridBase from "../shared/DataGridBase";
import DescargaSistema4 from "../shared/DescargaSistema4";

const TablaAuditorias = () => {
  const { auditorias } = useSistema4Data();
  const { rows } = auditorias;

  const descriptionItems = [
    "Programas anuales de auditorías de las entidades fiscalizadoras.",
    "Detalle de cada programa incluyendo áreas responsables y fechas de ejecución.",
    "Utiliza los filtros en cada columna para buscar información específica.",
  ];

  return (
    <>
      <DataGridBase
        title="Aquí puedes consultar:"
        descriptionItems={descriptionItems}
        data={{ ...auditorias, columns }}
      />
      <DescargaSistema4 fileName="auditorias" data={rows} />
    </>
  );
};

export default TablaAuditorias;
