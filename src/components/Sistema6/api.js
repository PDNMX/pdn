export const S6_REQUEST_TIMEOUT_MS = 20000

export const DEFAULT_S6_PAGINATION = {
  pageSize: 10,
  page: 0,
  total: 0
}

export const normalizeS6Pagination = (pagination, fallback = DEFAULT_S6_PAGINATION) => ({
  pageSize: Number.isInteger(pagination?.pageSize) && pagination.pageSize > 0
    ? pagination.pageSize
    : fallback.pageSize,
  page: Number.isInteger(pagination?.page) && pagination.page >= 0
    ? pagination.page
    : fallback.page,
  total: Number.isInteger(pagination?.total) && pagination.total >= 0
    ? pagination.total
    : fallback.total
})

export const getS6ErrorMessage = error => {
  const timedOut = error?.code === 'ECONNABORTED' || error?.code === 'ETIMEDOUT'

  if (timedOut) {
    return 'El servicio de contrataciones tardó demasiado en responder. Intenta nuevamente más tarde.'
  }

  const status = error?.response?.status

  if ([502, 503, 504].includes(status)) {
    return 'El servicio de contrataciones no está disponible temporalmente. Intenta nuevamente más tarde.'
  }

  return 'No fue posible consultar el servicio de contrataciones. Intenta nuevamente más tarde.'
}
