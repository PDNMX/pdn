import axios from 'axios';
// Hook personalizado
import { useState, useCallback } from 'react';

/**
 * Realiza una petición GET a la API con body
 * @param {string} path - Ruta de la API
 * @param {Object} body - Cuerpo de la petición
 * @returns {Promise} Respuesta de la API
 */

const fetchApi = async (path, body) => {
  try {
    if (!path || typeof path !== 'string') {
      throw new Error('El path es requerido y debe ser un string');
    }

    const response = await axios.post("https://dev-tablero-contrataciones.plataformadigitalnacional.org/back/api"+ path, { query: body });
    return response.data;
  } catch (error) {
    console.error('Error en la petición:', error);
    throw error;
  }
};


/* const fetchApi = async (path, body) => {
  try {
    if (!path || typeof path !== 'string') {
      throw new Error('El path es requerido y debe ser un string');
    }

    const response = await fetch("https://dev-tablero-contrataciones.plataformadigitalnacional.org/back/api/"+ path, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    });
    

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error en la petición:', error);
    throw error;
  }
}; */



export const useFetchApi = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(async (path, body = {}) => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchApi(path, body);
      return data;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    execute,
    loading,
    error,
  };
};