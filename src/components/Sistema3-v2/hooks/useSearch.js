import { useState } from 'react';
import { searchInProvider } from '../utils/api';
import { buildSearchQuery } from '../utils/search';

export const useSearch = () => {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({});

  const clearResults = () => {
    setResults(null);
    setError(null);
    setPagination({});
  };

  const performSearch = async (formData, endpoint, providers, providerId = null, page = 1, limit = 50) => {
    if (!providers || !Array.isArray(providers)) {
      setError('No hay proveedores disponibles');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const baseUrl = process.env.REACT_APP_S3_V2_BACKEND;
      const filter = buildSearchQuery(formData);

      console.log('Filtro construido:', filter); // Para debug

      if (providerId) {
        const result = await searchInProvider(baseUrl, endpoint, providerId, filter, page, limit);

        if (result) {
          setResults(prevResults => {
            const updatedResults = prevResults.map(prevResult =>
              prevResult.providerId === providerId ? result : prevResult
            );
            return updatedResults;
          });

          setPagination(prev => ({
            ...prev,
            [providerId]: result.providerData.pagination
          }));
        }
      } else {
        const searchResults = await Promise.all(
          providers.map(provider =>
            searchInProvider(baseUrl, endpoint, provider.id, filter, page, limit)
          )
        );

        const validResults = searchResults.filter(result =>
          result && !result.error && result.providerData && result.providerData.data
        );

        setResults(validResults);

        const newPagination = {};
        validResults.forEach(result => {
          newPagination[result.providerId] = result.providerData.pagination;
        });
        setPagination(newPagination);
      }
    } catch (err) {
      console.error('Error en performSearch:', err);
      setError('Error al realizar la búsqueda: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return {
    results,
    loading,
    error,
    pagination,
    performSearch,
    clearResults
  };
};
