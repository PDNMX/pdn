import { useSistema4Data } from "../../shared/context/Sistema4DataContext";
import { columns } from "./columns";
import DataGridBase from "../../shared/components/DataGridBase";

const TablaInformes = () => {
  const { informes } = useSistema4Data();

  const descriptionItems = [
    "Conforme al Artículo 55 de la LGSNA, se establece que, al menos, lo que también debe contemplar el sistema son los informes que deben hacerse públicos en términos de las disposiciones jurídicas aplicables.",
    "Esta sección reúne los informes públicos generados por las entidades de control del país como resultado de sus auditorías y revisiones. Estos documentos muestran los hallazgos, observaciones y seguimientos detectados.",
    "Puede filtrar los informes por año, nombre del informe, ente público o número de actos fiscalizados o concluidos."
  ];

  return (
    <DataGridBase
      title="Aquí puedes consultar:"
      descriptionItems={descriptionItems}
      data={{ ...informes, columns }}
    />
  );
};

export default TablaInformes;
