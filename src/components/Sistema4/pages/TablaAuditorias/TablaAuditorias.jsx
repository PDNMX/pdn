import { useSistema4Data } from "../../shared/context/Sistema4DataContext";
import { columns } from "./columns";
import DataGridBase from "../../shared/components/DataGridBase";
import DescargaSistema4 from "../../shared/components/DescargaSistema4";

const TablaAuditorias = () => {
  const { auditorias } = useSistema4Data();
  const { rows } = auditorias;

  const descriptionItems = [
   "En cumplimiento del Artículo 55 de la Ley General del Sistema Nacional Anticorrupción (LGSNA), que establece que, al menos, lo que debe contemplar el sistema son los Programas Anuales de Auditorías de los órganos de fiscalización de los tres órdenes de gobierno.",
   "En esta sección puede consultar los Programas Anuales de Auditoría (PAA) y sus documentos equivalentes, como son los Programas Anuales de Fiscalización o los Programas Anuales de Trabajo de los distintos órganos fiscalizadores del país.","Utilice los filtros de la tabla para buscar los programas por año, por ente público o por nombre del documento."
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
