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

export const searchInProvider = async (baseUrl, endpoint, providerId, filter, page = 1, limit = 50) => {
  try {
    let searchUrl = `${baseUrl}/api/v1/${endpoint}/${providerId}`;
    const params = new URLSearchParams();

    // Solo agregamos el filtro si tiene propiedades
    if (filter && Object.keys(filter).length > 0) {
      params.append('filter', JSON.stringify(filter));
    }

    params.append('page', page.toString());
    params.append('limit', limit.toString());

    const finalUrl = `${searchUrl}?${params.toString()}`;

    const response = await fetch(finalUrl);

    if (!response.ok) return null;

    const providerData = await response.json();
    return { providerId, providerData };
  } catch (error) {
    console.error('Error en searchInProvider:', error);
    return null;
  }
};
