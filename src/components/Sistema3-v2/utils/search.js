// Constantes para los valores permitidos
export const GOBIERNO_TIPOS = {
  FEDERAL: 'FEDERAL',
  ESTATAL: 'ESTATAL',
  MUNICIPAL: 'MUNICIPAL_ALCALDIA'
};

export const AMBITO_TIPOS = {
  EJECUTIVO: 'EJECUTIVO',
  LEGISLATIVO: 'LEGISLATIVO',
  JUDICIAL: 'JUDICIAL',
  ORGANO_AUTONOMO: 'ORGANO_AUTONOMO'
};

// Tipos de sanción para faltas graves
export const SANCION_GRAVE_TIPOS = {
  SUSPENSION: 'SUSPENSION',
  DESTITUCION: 'DESTITUCION',
  SANCION_ECONOMICA: 'SANCION_ECONOMICA',
  INHABILITACION: 'INHABILITACION',
  OTRO: 'OTRO'
};

// Tipos de sanción para faltas no graves
export const SANCION_NO_GRAVE_TIPOS = {
  AMONESTACION: 'AMONESTACION',
  SUSPENSION: 'SUSPENSION',
  DESTITUCION: 'DESTITUCION',
  INHABILITACION: 'INHABILITACION',
  OTRO: 'OTRO'
};

// Labels para sanciones graves
export const SANCION_GRAVE_LABELS = {
  [SANCION_GRAVE_TIPOS.SUSPENSION]: 'Suspensión',
  [SANCION_GRAVE_TIPOS.DESTITUCION]: 'Destitución',
  [SANCION_GRAVE_TIPOS.SANCION_ECONOMICA]: 'Sanción Económica',
  [SANCION_GRAVE_TIPOS.INHABILITACION]: 'Inhabilitación',
  [SANCION_GRAVE_TIPOS.OTRO]: 'Otro'
};

// Labels para sanciones no graves
export const SANCION_NO_GRAVE_LABELS = {
  [SANCION_NO_GRAVE_TIPOS.AMONESTACION]: 'Amonestación',
  [SANCION_NO_GRAVE_TIPOS.SUSPENSION]: 'Suspensión',
  [SANCION_NO_GRAVE_TIPOS.DESTITUCION]: 'Destitución',
  [SANCION_NO_GRAVE_TIPOS.INHABILITACION]: 'Inhabilitación',
  [SANCION_NO_GRAVE_TIPOS.OTRO]: 'Otro'
};

// Constantes para faltas graves (las que ya teníamos)
export const FALTA_GRAVE_TIPOS = {
  ABUSO_FUNCIONES: 'ABUSO_FUNCIONES',
  COHECHO: 'COHECHO',
  PECULADO: 'PECULADO',
  DESVIO_RECURSOS_PUBLICOS: 'DESVIO_RECURSOS_PUBLICOS',
  UTILIZACION_INDEBIDA_INFORMACION: 'UTILIZACION_INDEBIDA_INFORMACION',
  CONFLICTO_INTERES: 'CONFLICTO_INTERES',
  CONTRATACION_INDEBIDA: 'CONTRATACION_INDEBIDA',
  ENRIQUECIMIENTO_OCULTO: 'ENRIQUECIMIENTO_OCULTO',
  TRAFICO_INFLUENCIAS: 'TRAFICO_INFLUENCIAS',
  SIMULACION_ACTO_JURIDICO: 'SIMULACION_ACTO_JURIDICO',
  ENCUBRIMIENTO: 'ENCUBRIMIENTO',
  DESACATO: 'DESACATO',
  NEPOTISMO: 'NEPOTISMO',
  OBSTRUCCION: 'OBSTRUCCION',
  OTRO: 'OTRO'
};

// Constantes para faltas no graves
export const FALTA_NO_GRAVE_TIPOS = {
  CUMPLIR_FUNCIONES: 'CUMPLIR_FUNCIONES',
  DENUNCIAR_FALTAS: 'DENUNCIAR_FALTAS',
  ATENDER_INSTRUCCIONES: 'ATENDER_INSTRUCCIONES',
  DECLARACIONES: 'DECLARACIONES',
  CUSTODIAR_DOCUMENTACION: 'CUSTODIAR_DOCUMENTACION',
  SUPERVISAR_ART_49_LGRA: 'SUPERVISAR_ART_49_LGRA',
  RENDIR_CUENTAS: 'RENDIR_CUENTAS',
  COLABORAR_PROCEDIMIENTOS: 'COLABORAR_PROCEDIMIENTOS',
  CAUSAR_DANOS: 'CAUSAR_DANOS',
  OTRO: 'OTRO'
};

// Labels para faltas graves
export const FALTA_GRAVE_LABELS = {
  [FALTA_GRAVE_TIPOS.ABUSO_FUNCIONES]: 'Abuso de funciones',
  [FALTA_GRAVE_TIPOS.COHECHO]: 'Cohecho',
  [FALTA_GRAVE_TIPOS.PECULADO]: 'Peculado',
  [FALTA_GRAVE_TIPOS.DESVIO_RECURSOS_PUBLICOS]: 'Desvío de recursos públicos',
  [FALTA_GRAVE_TIPOS.UTILIZACION_INDEBIDA_INFORMACION]: 'Utilización indebida de información',
  [FALTA_GRAVE_TIPOS.CONFLICTO_INTERES]: 'Conflicto de interés',
  [FALTA_GRAVE_TIPOS.CONTRATACION_INDEBIDA]: 'Contratación indebida',
  [FALTA_GRAVE_TIPOS.ENRIQUECIMIENTO_OCULTO]: 'Enriquecimiento oculto',
  [FALTA_GRAVE_TIPOS.TRAFICO_INFLUENCIAS]: 'Tráfico de influencias',
  [FALTA_GRAVE_TIPOS.SIMULACION_ACTO_JURIDICO]: 'Simulación de acto jurídico',
  [FALTA_GRAVE_TIPOS.ENCUBRIMIENTO]: 'Encubrimiento',
  [FALTA_GRAVE_TIPOS.DESACATO]: 'Desacato',
  [FALTA_GRAVE_TIPOS.NEPOTISMO]: 'Nepotismo',
  [FALTA_GRAVE_TIPOS.OBSTRUCCION]: 'Obstrucción',
  [FALTA_GRAVE_TIPOS.OTRO]: 'Otro'
};

// Labels para faltas no graves
export const FALTA_NO_GRAVE_LABELS = {
  [FALTA_NO_GRAVE_TIPOS.CUMPLIR_FUNCIONES]: 'No cumplir con las funciones',
  [FALTA_NO_GRAVE_TIPOS.DENUNCIAR_FALTAS]: 'No denunciar faltas',
  [FALTA_NO_GRAVE_TIPOS.ATENDER_INSTRUCCIONES]: 'No atender instrucciones',
  [FALTA_NO_GRAVE_TIPOS.DECLARACIONES]: 'Declaraciones',
  [FALTA_NO_GRAVE_TIPOS.CUSTODIAR_DOCUMENTACION]: 'No custodiar documentación',
  [FALTA_NO_GRAVE_TIPOS.SUPERVISAR_ART_49_LGRA]: 'No supervisar (Art. 49 LGRA)',
  [FALTA_NO_GRAVE_TIPOS.RENDIR_CUENTAS]: 'No rendir cuentas',
  [FALTA_NO_GRAVE_TIPOS.COLABORAR_PROCEDIMIENTOS]: 'No colaborar en procedimientos',
  [FALTA_NO_GRAVE_TIPOS.CAUSAR_DANOS]: 'Causar daños',
  [FALTA_NO_GRAVE_TIPOS.OTRO]: 'Otro'
};

/* PARTICULARES */
// Catálogo para persona física
export const FALTA_FISICA_TIPOS = {
  SOBORNO: 'SOBORNO',
  PARTICIPACION_ILICITA: 'PARTICIPACION_ILICITA',
  TRAFICO_INFLUENCIAS: 'TRAFICO_INFLUENCIAS',
  UTILIZACION_INFORMACION_FALSA: 'UTILIZACION_INFORMACION_FALSA',
  COLUSION: 'COLUSION',
  OBSTRUCCION_FACULTADES: 'OBSTRUCCION_FACULTADES',
  CONTRATACION_INDEBIDA: 'CONTRATACION_INDEBIDA',
  USO_INDEBIDO_RECURSOS_PUBLICOS: 'USO_INDEBIDO_RECURSOS_PUBLICOS',
  OTRO: 'OTRO'
};

export const SANCION_FISICA_TIPOS = {
  INHABILITACION: 'INHABILITACION',
  INDEMNIZACION: 'INDEMNIZACION',
  SANCION_ECONOMICA: 'SANCION_ECONOMICA',
  OTRO: 'OTRO'
};

// Catálogo para persona moral
export const FALTA_MORAL_TIPOS = {
  SOBORNO: 'SOBORNO',
  PARTICIPACION_ILICITA: 'PARTICIPACION_ILICITA',
  TRAFICO_INFLUENCIAS: 'TRAFICO_INFLUENCIAS',
  UTILIZACION_INFORMACION_FALSA: 'UTILIZACION_INFORMACION_FALSA',
  COLUSION: 'COLUSION',
  OBSTRUCCION_FACULTADES: 'OBSTRUCCION_FACULTADES',
  CONTRATACION_INDEBIDA: 'CONTRATACION_INDEBIDA',
  USO_INDEBIDO_RECURSOS_PUBLICOS: 'USO_INDEBIDO_RECURSOS_PUBLICOS',
  OTRO: 'OTRO'
};

export const SANCION_MORAL_TIPOS = {
  INHABILITACION: 'INHABILITACION',
  INDEMNIZACION: 'INDEMNIZACION',
  SANCION_ECONOMICA: 'SANCION_ECONOMICA',
  SUSPENSION_ACTIVIDADES: 'SUSPENSION_ACTIVIDADES',
  DISOLUCION_SOCIEDAD: 'DISOLUCION_SOCIEDAD',
  OTRO: 'OTRO'
};

// Labels para mejor visualización en la interfaz
export const FALTA_FISICA_LABELS = {
  [FALTA_FISICA_TIPOS.SOBORNO]: 'Soborno',
  [FALTA_FISICA_TIPOS.PARTICIPACION_ILICITA]: 'Participación ilícita',
  [FALTA_FISICA_TIPOS.TRAFICO_INFLUENCIAS]: 'Tráfico de influencias',
  [FALTA_FISICA_TIPOS.UTILIZACION_INFORMACION_FALSA]: 'Utilización de información falsa',
  [FALTA_FISICA_TIPOS.COLUSION]: 'Colusión',
  [FALTA_FISICA_TIPOS.OBSTRUCCION_FACULTADES]: 'Obstrucción de facultades',
  [FALTA_FISICA_TIPOS.CONTRATACION_INDEBIDA]: 'Contratación indebida',
  [FALTA_FISICA_TIPOS.USO_INDEBIDO_RECURSOS_PUBLICOS]: 'Uso indebido de recursos públicos',
  [FALTA_FISICA_TIPOS.OTRO]: 'Otro'
};

export const SANCION_FISICA_LABELS = {
  [SANCION_FISICA_TIPOS.INHABILITACION]: 'Inhabilitación',
  [SANCION_FISICA_TIPOS.INDEMNIZACION]: 'Indemnización',
  [SANCION_FISICA_TIPOS.SANCION_ECONOMICA]: 'Sanción económica',
  [SANCION_FISICA_TIPOS.OTRO]: 'Otro'
};

export const FALTA_MORAL_LABELS = {
  [FALTA_MORAL_TIPOS.SOBORNO]: 'Soborno',
  [FALTA_MORAL_TIPOS.PARTICIPACION_ILICITA]: 'Participación ilícita',
  [FALTA_MORAL_TIPOS.TRAFICO_INFLUENCIAS]: 'Tráfico de influencias',
  [FALTA_MORAL_TIPOS.UTILIZACION_INFORMACION_FALSA]: 'Utilización de información falsa',
  [FALTA_MORAL_TIPOS.COLUSION]: 'Colusión',
  [FALTA_MORAL_TIPOS.OBSTRUCCION_FACULTADES]: 'Obstrucción de facultades',
  [FALTA_MORAL_TIPOS.CONTRATACION_INDEBIDA]: 'Contratación indebida',
  [FALTA_MORAL_TIPOS.USO_INDEBIDO_RECURSOS_PUBLICOS]: 'Uso indebido de recursos públicos',
  [FALTA_MORAL_TIPOS.OTRO]: 'Otro'
};

export const SANCION_MORAL_LABELS = {
  [SANCION_MORAL_TIPOS.INHABILITACION]: 'Inhabilitación',
  [SANCION_MORAL_TIPOS.INDEMNIZACION]: 'Indemnización',
  [SANCION_MORAL_TIPOS.SANCION_ECONOMICA]: 'Sanción económica',
  [SANCION_MORAL_TIPOS.SUSPENSION_ACTIVIDADES]: 'Suspensión de actividades',
  [SANCION_MORAL_TIPOS.DISOLUCION_SOCIEDAD]: 'Disolución de sociedad',
  [SANCION_MORAL_TIPOS.OTRO]: 'Otro'
};

export const buildSearchQuery = (formData) => {
  const filter = {};

  const isValidValue = (value) => value && value.trim().length > 0;

  if (Object.values(formData).some(isValidValue)) {
    // Datos Generales
    const datosGenerales = {};

    if (isValidValue(formData.nombre)) {
      datosGenerales.nombres = { _icontains: formData.nombre.trim() };
    }

    if (isValidValue(formData.apellidoUno)) {
      datosGenerales.primerApellido = { _icontains: formData.apellidoUno.trim() };
    }

    if (isValidValue(formData.apellidoDos)) {
      datosGenerales.segundoApellido = { _icontains: formData.apellidoDos.trim() };
    }

    if (Object.keys(datosGenerales).length > 0) {
      filter.datosGenerales = datosGenerales;
    }

    // Ente Público
    if (isValidValue(formData.entePublico)) {
      filter.empleoCargoComision = {
        nombreEntePublico: { _icontains: formData.entePublico.trim() }
      };
    }

    // Orden de Gobierno
    if (isValidValue(formData.ordenGobierno)) {
      filter.empleoCargoComision = {
        ...filter.empleoCargoComision,
        nivelOrdenGobierno: { _in: [formData.ordenGobierno] }
      };
    }

    // Ámbito
    if (isValidValue(formData.ambito)) {
      filter.empleoCargoComision = {
        ...filter.empleoCargoComision,
        ambitoPublico: { _in: [formData.ambito] }
      };
    }

    // Falta cometida
    if (isValidValue(formData.faltaCometida)) {
      filter.faltaCometida = {
        clave: {
          _in: [formData.faltaCometida]
        }
      };
    }

    // Tipo de Sanción
    if (isValidValue(formData.tipoSancion)) {
      filter.tipoSancion = {
        clave: {
          _in: [formData.tipoSancion]
        }
      };
    }
  }

  // Retornamos el objeto completo
  return filter;
};

// Helper para combinar múltiples filtros
export const combineFilters = (filters) => {
  const validFilters = filters.filter(f => f && Object.keys(f).length > 0);
  if (validFilters.length === 0) return {};
  if (validFilters.length === 1) return validFilters[0];
  return { $and: validFilters };
};
