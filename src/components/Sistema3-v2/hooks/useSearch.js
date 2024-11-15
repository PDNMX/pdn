import { useState } from 'react';
import { searchInProvider } from '../utils/api';
import { buildSearchQuery } from '../utils/search';

export const useSearch = () => {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const clearResults = () => {
    setResults(null);
    setError(null);
  };

  const performSearch = async (formData, endpoint, providers) => {
    if (!providers || !Array.isArray(providers)) {
      setError('No hay proveedores disponibles');
      return;
    }

    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const baseUrl = process.env.REACT_APP_S3_V2_BACKEND;
      const queryString = buildSearchQuery(formData);

      const searchResults = await Promise.all(
        providers.map(provider =>
          searchInProvider(baseUrl, endpoint, provider.id, queryString)
        )
      );

      const validResults = searchResults.filter(result =>
        result &&
        !result.error &&
        result.providerData &&
        result.providerData.data
      );

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
