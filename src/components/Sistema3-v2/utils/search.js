export const buildSearchQuery = (formData) => {
    const filter = {
      datosGenerales: {}
    };

    if (formData.nombre) {
      filter.datosGenerales.nombres = { _icontains: formData.nombre };
    }
    // Agrega más campos cuando se necesiten

    return `filter=${encodeURIComponent(JSON.stringify(filter))}`;
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
