const defaultValues = {
  "psp-sancionados": {
    nombres: "",
    primerApellido: "",
    segundoApellido: "",
    institucion: null,
    tipoSancion: [],
  },
  "psp-participan": {
    nombres: "",
    primerApellido: "",
    segundoApellido: "",
    institucionS2: null,
    tipoProcedimientoContratacion: [],
  },
  "psp-declaraciones": {
    nombres: "",
    primerApellido: "",
    segundoApellido: "",
    institucion: "",
    empleoCargoComision: "",
  },
  "empresas-sancionadas": {
    nombreRazonSocial: "",
    institucion: null,
    tipoSancion: [],
  },
  "empresas-contratos": {
    nombreRazonSocial: "",
    bienServicioOtorgado: "",
    supplier: "SHCP"
  },
  "instituciones-contrataciones": {
    institucionContratante: "",
    bienServicioOtorgado: "",
    tipoContratacion: "any",
    supplier: "SHCP"
  },
};

export default defaultValues;
