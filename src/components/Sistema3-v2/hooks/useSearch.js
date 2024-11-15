import { useState } from 'react';
import { fetchProviders, checkProviderAvailability, searchInProvider } from '../utils/api';
import { buildSearchQuery, getEndpoint } from '../utils/search';

export const useSearch = (type) => {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const clearResults = () => {
    setResults(null);
    setError(null);
  };

  const performSearch = async (formData, subtype) => {
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const baseUrl = process.env.REACT_APP_S3_V2_BACKEND;
      const providers = await fetchProviders(baseUrl);
      const endpoint = getEndpoint(type, subtype);

      const availableProviders = (await Promise.all(
        providers.map(provider =>
          checkProviderAvailability(baseUrl, endpoint, provider.id)
        )
      )).filter(check => check.available)
        .map(check => check.providerId);

      // Construir queryString solo si hay datos en el formulario
      const queryString = Object.values(formData).some(value => value)
        ? buildSearchQuery(formData)
        : '';

      const searchResults = await Promise.all(
        availableProviders.map(providerId =>
          searchInProvider(baseUrl, endpoint, providerId, queryString)
        )
      );

      const validResults = searchResults.filter(result => result && !result.error);
      setResults(validResults);

      const errors = searchResults
        .filter(result => result?.error)
        .map(result => `${result.providerId}: ${result.error}`);

      if (errors.length) {
        setError(`Errores en algunos proveedores: ${errors.join('; ')}`);
      }
    } catch (err) {
      setError('Error al realizar la búsqueda: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    results,
    loading,
    error,
    performSearch,
    clearResults
  };
};
