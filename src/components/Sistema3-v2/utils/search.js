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

    // Tipo de Sanción
    if (isValidValue(formData.tipoSancion)) {
      filter.tipoSancion = {
        clave: {
          _in: [formData.tipoSancion.trim()]
        }
      };
    }
  }

  return Object.keys(filter).length > 0
    ? `filter=${encodeURIComponent(JSON.stringify(filter))}`
    : '';
};

// Helper para combinar múltiples filtros
export const combineFilters = (filters) => {
  const validFilters = filters.filter(f => f && Object.keys(f).length > 0);
  if (validFilters.length === 0) return {};
  if (validFilters.length === 1) return validFilters[0];
  return { $and: validFilters };
};

export const getEndpoint = (type, subtype) => {
  const endpoints = {
    servidores: {
      grave: 'faltas_administrativas_graves',
      noGrave: 'faltas_administrativas_no_graves',
    },
    particulares: {
      fisica: 'particulares_fisicos',
      moral: 'particulares_morales',
    },
  };

  return endpoints[type]?.[subtype] || '';
};
