const data = {
  servidores: [
    {
      id: 0,
      title: 'Institución',
      description: 'Institución o dependencia donde labora el servidor público'
    },
    {
      id: 1,
      title: 'Servidor público',
      description: 'Nombre del servidor público que interviene en contrataciones'
    },
    {
      id: 2,
      title: 'Puesto',
      description: 'Puesto que desempeña el servidor público'
    },
    {
      id: 3,
      title: 'Tipo de área',
      description: 'Los tipos de área consirados son: Contratante, Técnica, Responsable, Otra.'
    },
    {
      id: 4,
      title: 'Contrataciones públicas',
      description: 'Se contemplan aquellas sujetas a la Ley de Adquisiciones, Arrendamientos y Servicios del Sector Público (LAASSP), la Ley de Obras Públicas y Servicios Relacionados con las Mismas (LOPSRM) y la Ley de Asociaciones Público Privadas (LAPP).'
    },
    {
      id: 5,
      title: 'Enajenación de bienes muebles',
      description: 'Que incluyen los actos traslativos de propiedad de los bienes muebles de la federación y de las entidades paraestatales conforme a la Ley General de Bienes Nacionales (LGBN).'
    },
    {
      id: 6,
      title: 'Concesiones, licencias, premios, autorizaciones y prórrogas',
      description: 'Comprende los regulados por las diversas disposiciones jurídicas de carácter federal que otorgan las dependencias de la Administración Pública Federal (APF).'
    },
    {
      id: 7,
      title: 'Asignación y emisión de dictámenes de avalúos nacionales.',
      description: 'Comprende únicamente los que son competencia del Instituto de Administración y Avalúos de Bienes Nacionales (INDAABIN).'
    },
    {
      id: 8,
      title: 'Ramo',
      description: 'Identifica y clasifica los recursos en el presupuesto de egresos a las Dependencias y en su caso Entidades, a la Presidencia de la República, a la Procuraduría General de la República y a los Tribunales Administrativos.'
    },
    {
      id: 9,
      title: 'Periodo ejercicio',
      description: 'Fecha inicial y final del ejercicio'
    }

  ],
  particulares: [
    {
      id: 0,
      title: 'Hechos',
      description: 'Hechos constitutivos de la irregularidad'
    },
    {
      id: 1,
      title: 'Objeto social',
      description: 'Objeto social del Proveedor o Contratista'
    },
    {
      id: 2,
      title: 'Fecha notificación',
      description: 'Fecha en que se notificó la sanción'
    },
    {
      id: 3,
      title: 'Fecha captura',
      description: 'Fecha en que se captura la resolución sancionatoria'
    },
    {
      id: 4,
      title: 'Plazo',
      description: 'Periodo de la inhabilitación'
    },
    {
      id: 5,
      title: 'Monto',
      description: 'Monto de la sanción económica'
    },
    {
      id: 6,
      title: 'Responsable de la información',
      description: 'Titular del área de responsabilidades o Contralor del Órgano Interno de Control responsable de la información registrada'
    },
    {
      id: 7,
      title: 'Fecha de última actualización',
      description: 'La fecha y hora en la que se agrega o modifica el registro'
    },
    {
      id: 8,
      title: 'Expediente',
      description: 'Número de expediente'
    },
    {
      id: 9,
      title: 'Nombre/Razón social',
      description: 'Nombre o razón social del contratista'
    },
    {
      id: 10,
      title: 'Institución',
      description: 'Institución o dependencia'
    },
    {
      id: 11,
      title: 'Autoridad sancionadora',
      description: 'OIC o Unidad responsable de la sanción'
    },
    {
      id: 12,
      title: 'Tipo falta',
      description: 'Ej.,soborno, participación ilícita, tráfico de influencias, uso información falsa,colusión, obstrucción de facultades, contratación indebida, uso indebido de recusos públicos.'
    },
    {
      id: 13,
      title: 'Tipo sanción',
      description: " I= Inhabilitado, M = Multado, S = Suspensión de actividades, D = Disolución de la sociedad. e.g., ['I', 'M'] significa que el contratista fue inhabilitado y multado"
    },
    {
      id: 14,
      title: 'Sentido resolución',
      description: 'Sentido de la resolución. Por ejemplo, Sancionatoria con multa'
    },
    {
      id: 15,
      title: 'Observaciones',
      description: 'Cualquier observación pertinente'
    }
  ],
  servidoresSancionados: [
    {
      id: 0,
      title: 'Institución',
      description: 'Dependencia o Entidad donde cometió la irregularidad el Servidor público'
    },
    {
      id: 1,
      title: 'Servidor público',
      description: 'Apellido Paterno, Maaterno y Nombre del Servidor público sancionado'
    },
    {
      id: 2,
      title: 'Autoridad sancionadora',
      description: 'Nombre de la Autoridad que impone la sanción'
    },
    {
      id: 3,
      title: 'Expediente',
      description: 'Número de Expediente.'
    },
    {
      id: 4,
      title: 'Fecha resolución',
      description: 'Fecha en la que se emite la resolución Sancionatoria'
    },
    {
      id: 5,
      title: 'Sanción impuesta',
      description: "Tipo de sanción impuesta: I = Inhabilitado, M = Multado, S = Suspensión de actividades, D = Disolución de la sociedad. e.g., ['I', 'M'] significa que el contratista fue inhabilitado y multado"
    },
    {
      id: 6,
      title: 'Fecha inicio',
      description: 'Fecha de inicio de la sanción (Inhabilitación)'
    },
    {
      id: 7,
      title: 'Fecha fin',
      description: 'Fecha de término de la sanción (Inhabilitación)'
    },
    {
      id: 8,
      title: 'Monto',
      description: 'Monto de la sanción económica en caso de existir'
    },
    {
      id: 9,
      title: 'Causa',
      description: 'Causa por la cual se impuso la sanción: \n NEGLIGENCIA ADMINISTRATIVA \n VIOLACIÓN PROCEDIMIENTOS DE CONTRATACIÓN \n VIOLACIÓN LEYES Y NORMATIVIDAD PRESUPUESTAL \n ABUSO DE AUTORIDAD \n COHECHO O EXTORSIÓ \n INCUMPLIMIENTO EN DECLARACIÓN DE SITUACIÓN PATRIMONIAL \n DELITO COMETIDO POR SERVIDORES PÚBLICOS \n EJJERCICIO INDEBIDO DE SUS FUNCIONES EN MATERIA MIGRATORIA \n VIOLACIÓN A LOS DERECHOS HUMANOS \n OTRA'
    },
    {
      id: 10,
      title: 'Puesto',
      description: 'Puesto del Servidor Público sancionado'
    },
    {
      id: 11,
      title: 'Tipo falta',
      description: 'Ej.,soborno, participación ilícita, tráfico de influencias, uso información falsa,colusión, obstrucción de facultades, contratación indebida, uso indebido de recusos públicos'
    },
    {
      id: 12,
      title: 'Puesto',
      description: 'Puesto del Servidor Pùblico sancionado'
    },
    {
      id: 13,
      title: 'Fecha notificación',
      description: 'Fecha de notificación de la resolución'
    },
    {
      id: 14,
      title: 'Observaciones',
      description: 'Cualquier observación pertinente'
    },
    {
      id: 15,
      title: 'Plazo',
      description: 'Plazo de la sanción (Inhabilitación)'
    }
  ]
}

export default data
