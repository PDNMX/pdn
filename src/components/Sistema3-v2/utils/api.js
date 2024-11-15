export const fetchProviders = async baseUrl => {
  try {
    const response = await fetch(`${baseUrl}/api/v1/providers`);
    if (!response.ok) throw new Error('Error al obtener los proveedores');

    const result = await response.json();
    if (!result.success || !Array.isArray(result.data)) {
      throw new Error('Formato de datos inválido');
    }

    return result.data;
  } catch (err) {
    throw err;
  }
};

export const checkProviderAvailability = async (baseUrl, endpoint, providerId) => {
  try {
    const response = await fetch(`${baseUrl}/api/v1/${endpoint}/${providerId}`);
    return {
      providerId,
      available: response.ok,
    };
  } catch (error) {
    return {
      providerId,
      available: false,
    };
  }
};

export const searchInProvider = async (baseUrl, endpoint, providerId, queryString) => {
    try {
      let searchUrl = `${baseUrl}/api/v1/${endpoint}/${providerId}`;
      if (queryString) {
        searchUrl += `?${queryString}`;
      }

      const response = await fetch(searchUrl);
      if (!response.ok) throw new Error(`Error en proveedor ${providerId}`);

      const providerData = await response.json();
      return { providerId, providerData };
    } catch (error) {
      return { providerId, error: error.message };
    }
  };
