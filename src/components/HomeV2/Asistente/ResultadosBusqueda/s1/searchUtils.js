export const SEARCH_TIMEOUT_MS = 20000

const clean = value => String(value ?? '').trim()

export const buildSearchQuery = data => ({
  nombres: clean(data?.nombres),
  primerApellido: clean(data?.primerApellido),
  segundoApellido: clean(data?.segundoApellido),
  escolaridadNivel: '',
  nivelOrdenGobierno: '',
  nombreEntePublico: clean(data?.nombreEntePublico),
  entidadFederativa: '',
  municipioAlcaldia: '',
  empleoCargoComision: clean(data?.empleoCargoComision),
  nivelEmpleoCargoComision: '',
  superficieConstruccionMin: '',
  superficieConstruccionMax: '',
  superficieTerrenoMin: '',
  superficieTerrenoMax: '',
  valorAdquisicionMin: '',
  valorAdquisicionMax: '',
  formaAdquisicion: '',
  totalIngresosNetosMin: '',
  totalIngresosNetosMax: ''
})

export const normalizeRequestError = reason => {
  const timedOut = reason?.code === 'ECONNABORTED' || reason?.code === 'ETIMEDOUT'

  return {
    status: reason?.response?.status ?? (timedOut ? 408 : 0),
    statusText: reason?.response?.statusText || (timedOut
      ? 'Tiempo de espera agotado'
      : 'No se pudo establecer conexión con el proveedor')
  }
}

export const providerFromSettledResult = (provider, result) => {
  const defaults = {
    ...provider,
    finding: false,
    estatus: false,
    total: 0,
    data: [],
    pagination: {},
    error: undefined
  }

  if (provider.status === 'MANTENIMENT') {
    return { ...defaults, estatus: true }
  }

  if (result?.status !== 'fulfilled') {
    return { ...defaults, error: normalizeRequestError(result?.reason) }
  }

  const responseData = result.value?.data

  if (!responseData || responseData.error) {
    return {
      ...defaults,
      error: responseData?.error || {
        status: 0,
        statusText: 'El proveedor devolvió una respuesta inválida'
      }
    }
  }

  return {
    ...defaults,
    estatus: true,
    total: responseData.pagination?.totalRows ?? 0,
    data: responseData.results ?? [],
    pagination: responseData.pagination ?? {}
  }
}
