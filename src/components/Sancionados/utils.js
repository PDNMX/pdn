import axios from 'axios';

export const getInstitutions = query => {
  return new Promise((resolve, reject) => {
    let options = {
      url: process.env.REACT_APP_S3S_BACKEND + '/api/v1/entities',
      json: true,
      method: 'post',
      data: {}
    };
    if (query.nivel !== 'any') options.data.nivel_gobierno = query.nivel;
    if (query.provider !== 'any') options.data.supplier_id = query.provider;

    axios(options)
      .then(data => resolve(data.data.map((item, index) => ({ value: item.nombre, label: item.nombre, key: index }))))
      .catch(err => reject(err));
  });
};

export const getProviders = query => {
  return new Promise((resolve, reject) => {
    let options = {
      url: process.env.REACT_APP_S3S_BACKEND + '/api/v1/getProviders',
      json: true,
      method: 'post',
      data: {}
    };
    if (query.nivel !== 'any') options.data.nivel_gobierno = query.nivel;

    axios(options)
      .then(data => resolve(data.data.map(provider => ({ value: provider.supplier_id, label: provider.supplier_name, key: provider.supplier_id }))))
      .catch(err => reject(err));
  });
};

export const getSummary = query => {
  return new Promise((resolve, reject) => {
    let options = {
      method: 'POST',
      url: process.env.REACT_APP_S3S_BACKEND + '/api/v1/summary',
      json: true,
      data: query
    };

    axios(options)
      .then(res => resolve(res.data))
      .catch(err => reject(err));
  });
};

export const getDataAPI = query => {
  return new Promise((resolve, reject) => {
    let options = {
      method: 'POST',
      url: process.env.REACT_APP_S3S_BACKEND + '/api/v1/search',
      json: true,
      data: query
    };

    axios(options)
      .then(res => resolve(res.data))
      .catch(err => reject(err));
  });
};
