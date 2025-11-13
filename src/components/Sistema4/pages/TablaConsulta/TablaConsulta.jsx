import { useSistema4Data } from "../../shared/context/Sistema4DataContext";
import { columns } from "./columns";
import DataGridBase from "../../shared/components/DataGridBase";
import DescargaSistema4 from "../../shared/components/DescargaSistema4";

const TablaConsulta = () => {
  const { miembrosSNF } = useSistema4Data();
  const { rows } = miembrosSNF;

  const descriptionItems = [
    "En esta sección puede consultar los miembros del Sistema Nacional de Fiscalización (SNF) organizados por el Comité Rector y grupos de trabajo.",
    "El Comité Rector está integrado por la Auditoría Superior de la Federación (ASF) y representantes de la Asociación Nacional de Organismos de Fiscalización Superior y Control Gubernamental (ASOFIS) y la Comisión Permanente de Contralores Estados-Federación (CPCE-F).",
    "Utilice los filtros de la tabla para buscar por ente público, responsable, grupo de trabajo o filial (ASOFIS/CPCE-F).",
  ];

  return (
    <>
      <DataGridBase
        title="Directorio de Miembros del SNF"
        descriptionItems={descriptionItems}
        data={{ ...miembrosSNF, columns }}
      />
      {/* <DescargaSistema4 fileName="miembros_snf" data={rows} /> */}
    </>
  );
};

export default TablaConsulta;
