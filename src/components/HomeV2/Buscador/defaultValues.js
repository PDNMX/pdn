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
    institucion: "",
    tipoSancion: [],
  },
  "empresas-contratos": { nombreRazonSocial: "", bienServicioOtorgado: "" },
  "instituciones-contrataciones": {
    institucionContratante: "",
    bienServicioOtorgado: "",
    tipoContratacion: "any",
  },
};

export default defaultValues;
