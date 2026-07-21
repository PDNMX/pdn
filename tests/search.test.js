import { describe, expect, it } from 'vitest'
import { buildSearchQuery, combineFilters } from '../src/components/Sistema3-v2/utils/search.js'

describe('buildSearchQuery', () => {
  it('preserva el contrato del filtro para datos generales y empleo público', () => {
    expect(buildSearchQuery({
      nombre: '  Ana  ',
      apellidoUno: 'Pérez',
      apellidoDos: '',
      entePublico: '  Secretaría  ',
      entidadFederativa: '09',
      ordenGobierno: 'FEDERAL',
      ambito: 'EJECUTIVO',
      faltaCometida: 'COHECHO',
      tipoSancion: 'INHABILITACION',
      cometioFaltaEntidad: '15'
    })).toEqual({
      datosGenerales: {
        nombres: { _icontains: 'Ana' },
        primerApellido: { _icontains: 'Pérez' }
      },
      empleoCargoComision: {
        nombreEntePublico: { _icontains: 'Secretaría' },
        entidadFederativa: { _eq: '09' },
        nivelOrdenGobierno: { _in: ['FEDERAL'] },
        ambitoPublico: { _in: ['EJECUTIVO'] }
      },
      faltaCometida: { clave: { _in: ['COHECHO'] } },
      tipoSancion: { clave: { _in: ['INHABILITACION'] } },
      dondeCometioLaFalta: { entidadFederativa: { _eq: '15' } }
    })
  })

  it('no genera filtros para campos vacíos', () => {
    expect(buildSearchQuery({ nombre: '', entePublico: '   ' })).toEqual({})
  })
})

describe('combineFilters', () => {
  it('descarta filtros vacíos y combina los restantes con $and', () => {
    const first = { activo: { _eq: true } }
    const second = { entidad: { _eq: '09' } }

    expect(combineFilters([{}, first, null, second])).toEqual({ $and: [first, second] })
    expect(combineFilters([{}, first])).toBe(first)
    expect(combineFilters([{}, null])).toEqual({})
  })
})
