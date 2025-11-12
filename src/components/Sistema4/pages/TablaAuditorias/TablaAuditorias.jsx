import { useSistema4Data } from "../../shared/context/Sistema4DataContext";
import { columns } from "./columns";
import DataGridBase from "../../shared/components/DataGridBase";
import DescargaSistema4 from "../../shared/components/DescargaSistema4";

const TablaAuditorias = () => {
  const { auditorias } = useSistema4Data();
  const { rows } = auditorias;

  const descriptionItems = [
    "En esta sección puede consultar los Programas Anuales de Auditoría (PAA) y sus documentos equivalentes (como Programas Anuales de Fiscalización o de Trabajo) de los distintos órganos fiscalizadores del país.",
    "En cumplimiento del Artículo 55 de la Ley General del Sistema Nacional Anticorrupción (LGSNA), el objetivo es transparentar la planeación de las auditorías. Esto permite a la ciudadanía conocer qué entidades públicas, programas o fondos serán revisados durante el año.",
    "Utilice los filtros de la tabla para buscar programas por año, entidad fiscalizadora o área responsable."
  ];

  return (
    <>
      <DataGridBase
        title="Aquí puedes consultar:"
        descriptionItems={descriptionItems}
        data={{ ...auditorias, columns }}
      />
      {/* <DescargaSistema4 fileName="auditorias" data={rows} /> */}
    </>
  );
};

export default TablaAuditorias;
