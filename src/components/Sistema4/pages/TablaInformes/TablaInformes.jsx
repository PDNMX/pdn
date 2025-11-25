import { useSistema4Data } from "../../shared/context/Sistema4DataContext";
import { columns } from "./columns";
import DataGridBase from "../../shared/components/DataGridBase";

const TablaInformes = () => {
  const { informes } = useSistema4Data();

  const descriptionItems = [
    "Esta sección reúne los informes públicos generados por las entidades de control del país como resultado de sus auditorías y revisiones. A diferencia de los Programas Anuales (que son la planeación), estos documentos muestran los hallazgos, observaciones y seguimientos detectados.",
    "Su publicación, conforme al Artículo 55 de la LGSNA, garantiza el derecho de la ciudadanía a conocer los resultados de la vigilancia y el control de los recursos públicos.",
    "Puede filtrar los informes por año, trimestre, tipo de auditoría o entidad fiscalizadora.",
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
