export const S6_REQUEST_TIMEOUT_MS = 20000

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
