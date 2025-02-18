// mockData.js
export const estadosData = [
  {
    id: "CDMX",
    name: "Ciudad de México",
    totalCases: 234,
    uniqueEstado: [
      { estado: 'En Proceso', count: 100 },
      { estado: 'Finalizado', count: 114 },
      { estado: 'Cancelado', count: 20 }
    ],
    uniqueTipo: [
      { tipo: 'Licitación Pública', count: 120 },
      { tipo: 'Adjudicación Directa', count: 80 },
      { tipo: 'Invitación Restringida', count: 34 }
    ],
    monto: {
      total: 45000000,
      porTipo: [
        { tipo: 'Licitación Pública', monto: 25000000 },
        { tipo: 'Adjudicación Directa', monto: 15000000 },
        { tipo: 'Invitación Restringida', monto: 5000000 }
      ]
    },
    contratos: [
      {
        id: 'CDMX-2024-001',
        fecha: '2024-02-15',
        dependencia: 'Secretaría de Desarrollo Urbano CDMX',
        tipo: 'Licitación Pública',
        titulo: 'Renovación de infraestructura vial en Centro Histórico',
        monto: 1500000,
        descripcion: 'Proyecto de renovación de infraestructura vial en avenidas principales del Centro Histórico',
      },
      {
        id: 'CDMX-2024-002',
        fecha: '2024-02-16',
        dependencia: 'Secretaría de Salud CDMX',
        tipo: 'Adjudicación Directa',
        titulo: 'Adquisición de equipo médico para hospitales',
        monto: 800000,
        descripcion: 'Compra de equipamiento médico para hospitales públicos de la CDMX',
      },
      {
        id: 'CDMX-2024-003',
        fecha: '2024-02-17',
        dependencia: 'Secretaría de Obras CDMX',
        tipo: 'Invitación Restringida',
        titulo: 'Mantenimiento de parques públicos',
        monto: 600000,
        descripcion: 'Mantenimiento y renovación de áreas verdes en parques públicos',
      }
    ]
  },
  {
    id: "JAL",
    name: "Jalisco",
    totalCases: 186,
    uniqueEstado: [
      { estado: 'En Proceso', count: 80 },
      { estado: 'Finalizado', count: 96 },
      { estado: 'Cancelado', count: 10 }
    ],
    uniqueTipo: [
      { tipo: 'Licitación Pública', count: 90 },
      { tipo: 'Adjudicación Directa', count: 66 },
      { tipo: 'Invitación Restringida', count: 30 }
    ],
    monto: {
      total: 35000000,
      porTipo: [
        { tipo: 'Licitación Pública', monto: 20000000 },
        { tipo: 'Adjudicación Directa', monto: 10000000 },
        { tipo: 'Invitación Restringida', monto: 5000000 }
      ]
    },
    contratos: [
      {
        id: 'JAL-2024-001',
        fecha: '2024-02-15',
        dependencia: 'Secretaría de Infraestructura Jalisco',
        tipo: 'Licitación Pública',
        titulo: 'Construcción de puente vehicular',
        monto: 2500000,
        descripcion: 'Construcción de puente vehicular en zona metropolitana de Guadalajara',
      },
      {
        id: 'JAL-2024-002',
        fecha: '2024-02-16',
        dependencia: 'Secretaría de Educación Jalisco',
        tipo: 'Adjudicación Directa',
        titulo: 'Equipamiento de aulas digitales',
        monto: 900000,
        descripcion: 'Equipamiento tecnológico para aulas en escuelas públicas',
      },
      {
        id: 'JAL-2024-003',
        fecha: '2024-02-17',
        dependencia: 'Secretaría de Movilidad Jalisco',
        tipo: 'Invitación Restringida',
        titulo: 'Señalización vial',
        monto: 400000,
        descripcion: 'Renovación de señalización vial en zonas urbanas',
      }
    ]
  }
];

export const getTotalData = () => {
  return {
    totalCases: estadosData.reduce((sum, estado) => sum + estado.totalCases, 0),
    uniqueEstado: [
      {
        estado: 'En Proceso',
        count: estadosData.reduce((sum, estado) =>
          sum + estado.uniqueEstado.find(e => e.estado === 'En Proceso').count, 0)
      },
      {
        estado: 'Finalizado',
        count: estadosData.reduce((sum, estado) =>
          sum + estado.uniqueEstado.find(e => e.estado === 'Finalizado').count, 0)
      },
      {
        estado: 'Cancelado',
        count: estadosData.reduce((sum, estado) =>
          sum + estado.uniqueEstado.find(e => e.estado === 'Cancelado').count, 0)
      }
    ],
    uniqueTipo: [
      {
        tipo: 'Licitación Pública',
        count: estadosData.reduce((sum, estado) =>
          sum + estado.uniqueTipo.find(t => t.tipo === 'Licitación Pública').count, 0)
      },
      {
        tipo: 'Adjudicación Directa',
        count: estadosData.reduce((sum, estado) =>
          sum + estado.uniqueTipo.find(t => t.tipo === 'Adjudicación Directa').count, 0)
      },
      {
        tipo: 'Invitación Restringida',
        count: estadosData.reduce((sum, estado) =>
          sum + estado.uniqueTipo.find(t => t.tipo === 'Invitación Restringida').count, 0)
      }
    ],
    monto: {
      total: estadosData.reduce((sum, estado) => sum + estado.monto.total, 0),
      porTipo: [
        {
          tipo: 'Licitación Pública',
          monto: estadosData.reduce((sum, estado) =>
            sum + estado.monto.porTipo.find(t => t.tipo === 'Licitación Pública').monto, 0)
        },
        {
          tipo: 'Adjudicación Directa',
          monto: estadosData.reduce((sum, estado) =>
            sum + estado.monto.porTipo.find(t => t.tipo === 'Adjudicación Directa').monto, 0)
        },
        {
          tipo: 'Invitación Restringida',
          monto: estadosData.reduce((sum, estado) =>
            sum + estado.monto.porTipo.find(t => t.tipo === 'Invitación Restringida').monto, 0)
        }
      ]
    },
    contratos: estadosData.reduce((acc, estado) => [...acc, ...estado.contratos], [])
  };
};