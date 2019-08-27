/*
  
  // API DATA
  
*/
export const endpoint = "https://demospdn.host/demo1/api/v2/s1/declaraciones";

export const fetchObj = {
  method: "POST",
  headers: {
    "Content-Type": "application/json; charset=utf-8"
  },
  body: null
};

export const PROP_NAMES = {
         institucionResponsable: "metadatos.institucion_responsable",
         ente: "informacion_personal.datos_encargo_actual.ente_publico",
         nombres: "informacion_personal.informacion_general.nombres",
         apellido1:
           "informacion_personal.informacion_general.primer_apellido",
         apellido2:
           "informacion_personal.informacion_general.segundo_apellido",
         entidadID:
           "informacion_personal.datos_encargo_actual.direccion_encargo.entidad_federativa.cve_ent",
         municipioID:
           "informacion_personal.datos_encargo_actual.direccion_encargo.municipio.cve_mun",
         cargo:
           "informacion_personal.datos_encargo_actual.empleo_cargo_comision",
         nivelGobierno:
           "informacion_personal.datos_encargo_actual.nivel_gobierno.codigo",
         superficieConstruccion:
           "activos.bienes_inmuebles.superficie_construccion",
         superficieTerreno:
           "activos.bienes_inmuebles.superficie_terreno",
         adquisicionMetodo:
           "activos.bienes_inmuebles.forma_adquisicion.codigo",
         adquisicionPrecio:
           "activos.bienes_inmuebles.precio_adquisicion.valor",
         valorCatastral: "activos.bienes_inmuebles.valor_catastral",
         nivelEncargo:
           "informacion_personal.datos_encargo_actual.nivel_encargo",
         escolaridad:
           "informacion_personal.datos_curriculares.grado_maximo_escolaridad.codigo",
         ingresoAnual:
           "ingresos.sueldos_salarios_publicos.ingreso_bruto_anual.valor",
         ingresoMoneda:
           "ingresos.sueldos_salarios_publicos.ingreso_bruto_anual.moneda.codigo",
         nacimiento:
           "informacion_personal.informacion_general.fecha_nacimiento"
       };

/*
  
  // DICTIONARIES
  
*/
export const Incomefields = [
  "actividad_economica_menor",
  "actividad_empresarial",
  "actividad_profesional",
  "arrendamiento",
  "enajenacion_bienes",
  "intereses",
  "otros_ingresos",
  "premios",
  "sueldos_salarios_otros_empleos",
  "sueldos_salarios_publicos"
];

export const GobLevels = [
  { label: "Federal", key: "FED" },
  { label: "Estatal", key: "EST" },
  { label: "Municipal", key: "MUN" }
];

export const NivelEducacion = ["Secundaria", "Licenciatura", "Maestría"];

export const OFICINAS = [
  "ADMINISTRACION DEL PATRIMONIO DE LA BENEFICENCIA PUBLICA",
  "ADMINISTRACION FEDERAL DE SERVICIOS EDUCATIVOS EN EL DISTRITO FEDERAL",
  "ADMINISTRACION PORTUARIA INTEGRAL DE ALTAMIRA S.A. DE C.V.",
  "ADMINISTRACION PORTUARIA INTEGRAL DE COATZACOALCOS S.A. DE C.V.",
  "ADMINISTRACION PORTUARIA INTEGRAL DE DOS BOCAS S.A. DE C.V.",
  "ADMINISTRACION PORTUARIA INTEGRAL DE ENSENADA S.A. DE C.V.",
  "ADMINISTRACION PORTUARIA INTEGRAL DE GUAYMAS S.A. DE C.V.",
  "ADMINISTRACION PORTUARIA INTEGRAL DE LAZARO CARDENAS S.A. DE C.V.",
  "ADMINISTRACION PORTUARIA INTEGRAL DE MANZANILLO S.A. DE C.V.",
  "ADMINISTRACION PORTUARIA INTEGRAL DE MAZATLAN S.A. DE C.V.",
  "ADMINISTRACION PORTUARIA INTEGRAL DE PROGRESO S.A. DE C.V.",
  "ADMINISTRACION PORTUARIA INTEGRAL DE PUERTO MADERO, S.A. DE C.V.",
  "ADMINISTRACION PORTUARIA INTEGRAL DE PUERTO VALLARTA S.A. DE C.V.",
  "ADMINISTRACION PORTUARIA INTEGRAL DE SALINA CRUZ S.A. DE C.V.",
  "ADMINISTRACION PORTUARIA INTEGRAL DE TAMPICO S.A. DE C.V.",
  "ADMINISTRACION PORTUARIA INTEGRAL DE TOPOLOBAMPO S.A. DE C.V.",
  "ADMINISTRACION PORTUARIA INTEGRAL DE TUXPAN S.A. DE C.V.",
  "ADMINISTRACION PORTUARIA INTEGRAL DE VERACRUZ S.A. DE C.V.",
  "AEROPUERTO INTERNACIONAL DE LA CIUDAD DE MEXICO S.A. DE C.V.",
  "AEROPUERTOS Y SERVICIOS AUXILIARES",
  "AGENCIA ESPACIAL MEXICANA",
  "AGENCIA MEXICANA DE COOPERACIÓN INTERNACIONAL PARA EL DESARROLLO",
  "AGENCIA NACIONAL DE SEGURIDAD INDUSTRIAL Y DE PROTECCIÓN AL MEDIO AMBIENTE DEL SECTOR HIDROCARBUROS",
  "AGROASEMEX S.A.",
  "APOYOS Y SERVICIOS A LA COMERCIALIZACION AGROPECUARIA",
  "ARCHIVO GENERAL DE LA NACION",
  "AUTORIDAD FEDERAL PARA EL DESARROLLO DE LAS ZONAS ECONÓMICAS ESPECIALES",
  "BANCO DEL AHORRO NACIONAL Y SERVICIOS FINANCIEROS S N C",
  "BANCO NACIONAL DE COMERCIO EXTERIOR S.N.C.",
  "BANCO NACIONAL DE CREDITO RURAL S.N.C.",
  "BANCO NACIONAL DE OBRAS Y SERVICIOS PUBLICOS S.N.C.",
  "BANCO NACIONAL DEL EJERCITO FUERZA AEREA Y ARMADA S.N.C.",
  "CAMINOS Y PUENTES FEDERALES DE INGRESOS Y SERVICIOS CONEXOS",
  "CASA DE MONEDA DE MEXICO",
  "CENTRO DE CAPACITACION CINEMATOGRAFICA A.C.",
  "CENTRO DE ENSEÑANZA TECNICA INDUSTRIAL.",
  "CENTRO DE ESTUDIOS SUPERIORES EN TURISMO",
  "CENTRO DE EVALUACION Y DESARROLLO HUMANO",
  "CENTRO DE INGENIERIA Y DESARROLLO INDUSTRIAL",
  "CENTRO DE INVESTIGACION CIENTIFICA DE YUCATAN A.C.",
  "CENTRO DE INVESTIGACION CIENTIFICA Y DE EDUCACION SUPERIOR DE ENSENADA B.C.",
  "CENTRO DE INVESTIGACION EN ALIMENTACION Y DESARROLLO A.C.",
  "CENTRO DE INVESTIGACION EN GEOGRAFIA Y GEOMATICA ING. JORGE L. TAMAYO A.C.",
  "CENTRO DE INVESTIGACION EN MATEMATICAS A.C.",
  "CENTRO DE INVESTIGACION EN MATERIALES AVANZADOS S.C.",
  "CENTRO DE INVESTIGACION EN QUIMICA APLICADA",
  "CENTRO DE INVESTIGACION Y ASISTENCIA EN TECNOLOGIA Y DISEÑO DEL ESTADO DE JALISCO A.C.",
  "CENTRO DE INVESTIGACION Y DE ESTUDIOS AVANZADOS DEL INSTITUTO POLITECNICO NACIONAL",
  "CENTRO DE INVESTIGACION Y DESARROLLO TECNOLOGICO EN ELECTROQUIMICA S.C.",
  "CENTRO DE INVESTIGACION Y DOCENCIA ECONOMICAS A.C.",
  "CENTRO DE INVESTIGACION Y SEGURIDAD NACIONAL",
  "CENTRO DE INVESTIGACIONES BIOLOGICAS DEL NOROESTE S.C.",
  "CENTRO DE INVESTIGACIONES EN OPTICA A.C.",
  "CENTRO DE INVESTIGACIONES Y ESTUDIOS SUPERIORES EN ANTROPOLOGIA SOCIAL",
  "CENTRO DE PRODUCCION DE PROGRAMAS INFORMATIVOS Y ESPECIALES",
  "CENTRO NACIONAL DE CONTROL DE ENERGÍA",
  "CENTRO NACIONAL DE CONTROL DE GAS NATURAL",
  "CENTRO NACIONAL DE EQUIDAD DE GENERO Y SALUD REPRODUCTIVA",
  "CENTRO NACIONAL DE EXCELENCIA TECNOLOGICA EN SALUD",
  "CENTRO NACIONAL DE LA TRANSFUSION SANGUINEA",
  "CENTRO NACIONAL DE METROLOGIA",
  "CENTRO NACIONAL DE PLANEACION, ANALISIS E INFORMACION PARA EL COMBATE A LA DELINCUENCIA",
  "CENTRO NACIONAL DE PREVENCION DE DESASTRES",
  "CENTRO NACIONAL DE TRASPLANTES",
  "CENTRO NACIONAL DE VIGILANCIA EPIDEMIOLOGICA Y CONTRTOL DE ENFERMEDADES",
  "CENTRO NACIONAL PARA LA PREVENCION Y CONTROL DEL VIH/SIDA",
  "CENTRO NACIONAL PARA LA PREVENCIÓN Y EL CONTROL DE LAS ADICCIONES",
  "CENTRO NACIONAL PARA LA SALUD DE LA INFANCIA Y ADOLESCENCIA",
  "CENTRO REGIONAL DE ALTA ESPECIALIDAD EN CHIAPAS",
  "CENTROS DE INTEGRACION JUVENIL A.C.",
  "CFE CORPORATIVO",
  "CFE DISTRIBUCIÓN",
  "CFE GENERACIÓN I",
  "CFE GENERACIÓN II",
  "CFE GENERACIÓN III",
  "CFE GENERACIÓN IV",
  "CFE GENERACIÓN V",
  "CFE GENERACIÓN VI",
  "CFE SUMINISTRADOR DE SERVICIOS BÁSICOS",
  "CFE TRANSMISIÓN",
  "CIATEC, A.C. CENTRO DE INNOVACION APLICADA EN TECNOLOGIAS COMPETITIVAS",
  "CIATEQ, A.C. CENTRO DE TECNOLOGIA AVANZADA",
  "COLEGIO DE BACHILLERES",
  "COLEGIO DE POSTGRADUADOS",
  "COLEGIO NACIONAL DE EDUCACION PROFESIONAL TECNICA",
  "COLEGIO SUPERIOR AGROPECUARIO DEL ESTADO DE GUERRERO",
  "COMISION DE APELACION Y ARBITRAJE DEL DEPORTE",
  "COMISION DE OPERACION Y FOMENTO DE ACTIVIDADES ACADEMICAS DEL INSTITUTO POLITECNICO NACIONAL",
  "COMISIÓN EJECUTIVA DE ATENCIÓN A VÍCTIMAS",
  "COMISION FEDERAL DE ELECTRICIDAD",
  "COMISION FEDERAL DE MEJORA REGULATORIA",
  "COMISION FEDERAL DE TELECOMUNICACIONES",
  "COMISION FEDERAL PARA LA PROTECCION CONTRA RIESGOS SANITARIOS",
  "COMISION NACIONAL BANCARIA Y DE VALORES",
  "COMISION NACIONAL DE ACUACULTURA Y PESCA",
  "COMISION NACIONAL DE ARBITRAJE MEDICO",
  "COMISION NACIONAL DE AREAS NATURALES PROTEGIDAS",
  "COMISION NACIONAL DE BIOETICA",
  "COMISION NACIONAL DE CULTURA FISICA Y DEPORTE",
  "COMISIÓN NACIONAL DE HIDROCARBUROS",
  "COMISION NACIONAL DE LAS ZONAS ARIDAS",
  "COMISION NACIONAL DE LIBROS DE TEXTO GRATUITOS",
  "COMISION NACIONAL DE LOS SALARIOS MINIMOS",
  "COMISION NACIONAL DE PROTECCION SOCIAL EN SALUD",
  "COMISION NACIONAL DE SEGURIDAD NUCLEAR Y SALVAGUARDIAS",
  "COMISION NACIONAL DE SEGUROS Y FIANZAS",
  "COMISION NACIONAL DE VIVIENDA",
  "COMISION NACIONAL DEL AGUA",
  "COMISION NACIONAL DEL SISTEMA DE AHORRO PARA EL RETIRO",
  "COMISION NACIONAL FORESTAL",
  "COMISION NACIONAL PARA EL DESARROLLO DE LOS PUEBLOS INDIGENAS",
  "COMISION NACIONAL PARA EL USO EFICIENTE DE LA ENERGIA",
  "COMISION NAL. PARA LA PROTECCION Y DEFENSA DE LOS USUARIOS DE SERVICIOS FINANCIEROS",
  "COMISION PARA LA REGULARIZACION DE LA TENENCIA DE LA TIERRA",
  "COMISION PARA PREVENIR Y ERRADICAR LA VIOLENCIA CONTRA LAS MUJERES",
  "COMISION REGULADORA DE ENERGIA",
  "COMITE NACIONAL MIXTO DE PROTECCION AL SALARIO",
  "COMITÉ NACIONAL PARA EL DESARROLLO SUSTENTABLE DE LA CAÑA DE AZÚCAR",
  "COMPAÑIA MEXICANA DE EXPLORACIONES S.A. DE C.V.",
  "COMPAÑIA OPERADORA DEL CENTRO CULTURAL Y TURISTICO DE TIJUANA S.A. DE C.V.",
  "CONSEJERIA JURIDICA DEL EJECUTIVO FEDERAL",
  "CONSEJO DE MENORES",
  "CONSEJO DE PROMOCION TURISTICA DE MEXICO S.A. DE C.V.",
  "CONSEJO NACIONAL DE CIENCIA Y TECNOLOGIA",
  "CONSEJO NACIONAL DE EVALUACION DE LA POLITICA DE DESARROLLO SOCIAL",
  "CONSEJO NACIONAL DE FOMENTO EDUCATIVO",
  "CONSEJO NACIONAL DE NORMALIZACION Y CERTIFICACION DE COMPETENCIA LABORALES",
  "CONSEJO NACIONAL PARA EL DESARROLLO Y LA INCLUSIÓN DE LAS PERSONAS CON DISCAPACIDAD",
  "CONSEJO NACIONAL PARA LA CULTURA Y LAS ARTES",
  "CONSEJO NACIONAL PARA PREVENIR LA DISCRIMINACION",
  "COORDINACION GENERAL DE LA COMISION MEXICANA DE AYUDA A REFUGIADOS",
  "COORDINACION NACIONAL DEL PROGRAMA DE DESARROLLO HUMANO OPORTUNIDADES",
  "CORPORACIÓN ÁNGELES VERDES",
  "CORPORACION MEXICANA DE INVESTIGACION EN MATERIALES S.A. DE C.V.",
  "DICONSA S.A. DE C.V.",
  "EDUCAL S.A. DE C.V.",
  "EL COLEGIO DE LA FRONTERA NORTE A.C.",
  "EL COLEGIO DE LA FRONTERA SUR",
  "EL COLEGIO DE MEXICO, A.C.",
  "EL COLEGIO DE MICHOACAN A.C.",
  "EL COLEGIO DE SAN LUIS A.C",
  "ESTUDIOS CHURUBUSCO AZTECA S.A.",
  "EXPORTADORA DE SAL S.A.DE C.V.",
  "FERROCARRIL DEL ISTMO DE TEHUANTEPEC S.A. DE C.V.",
  "FERROCARRILES NACIONALES DE MEXICO",
  "FIDEICOMISO DE FOMENTO MINERO",
  "FIDEICOMISO DE FORMACION Y CAPACITACION PARA EL PERSONAL DE LA MARINA MERCANTE NACIONAL",
  "FIDEICOMISO DE RIESGO COMPARTIDO",
  "FIDEICOMISO FONDO DE CAPITALIZACION E INVERSION DEL SECTOR RURAL",
  "FIDEICOMISO FONDO NACIONAL DE FOMENTO EJIDAL",
  "FIDEICOMISO FONDO NACIONAL DE HABITACIONES POPULARES",
  "FIDEICOMISO PARA LA CINETECA NACIONAL",
  "FIDEICOMISO PROMEXICO",
  "FINANCIERA RURAL",
  "FONATUR CONSTRUCTORA, S.A. DE C.V.",
  "FONATUR MANTENIMIENTO TURISTICO, S.A. DE C.V.",
  "FONATUR OPERADORA PORTUARIA, S.A. DE C.V.",
  "FONATUR PRESTADORA DE SERVICIOS, S.A. DE C.V.",
  "FONDO DE CULTURA ECONOMICA",
  "FONDO DE EMPRESAS EXPROPIADAS DEL SECTOR AZUCARERO",
  "FONDO DE GARANTIA Y FOMENTO PARA LA AGRICULTURA, GANADERIA Y AVICULTURA",
  "FONDO DE GARANTIA Y FOMENTO PARA LAS ACTIVIDADES PESQUERAS",
  "FONDO DE INFORMACION Y DOCUMENTACION PARA LA INDUSTRIA",
  "FONDO DE LA VIVIENDA DEL ISSSTE",
  "FONDO DE OPERACION Y FINANCIAMIENTO BANCARIO A LA VIVIENDA",
  "FONDO ESPECIAL DE ASISTENCIA TECNICA Y GARANTIA PARA LOS CREDITOS AGROPECUARIOS",
  "FONDO ESPECIAL PARA FINANCIAMIENTOS AGROPECUARIOS",
  "FONDO NACIONAL DE FOMENTO AL TURISMO",
  "FONDO NACIONAL PARA EL FOMENTO DE LAS ARTESANIAS",
  "FONDO PARA EL DESARROLLO DE LOS RECURSOS HUMANOS",
  "GRUPO AEROPORTUARIO DE LA CIUDAD DE MEXICO S.A. DE C.V.",
  "HOSPITAL GENERAL DE MEXICO",
  "HOSPITAL GENERAL DR. MANUEL GEA GONZALEZ",
  "HOSPITAL INFANTIL DE MEXICO FEDERICO GOMEZ",
  "HOSPITAL JUAREZ DE MEXICO",
  "HOSPITAL REGIONAL DE ALTA ESPECIALIDAD DE CIUDAD VICTORIA BICENTENARIO 2010",
  "HOSPITAL REGIONAL DE ALTA ESPECIALIDAD DE IXTAPALUCA",
  "HOSPITAL REGIONAL DE ALTA ESPECIALIDAD DE LA PENINSULA DE YUCATAN",
  "HOSPITAL REGIONAL DE ALTA ESPECIALIDAD DE OAXACA",
  "HOSPITAL REGIONAL DE ALTA ESPECIALIDAD DEL BAJIO",
  "I.I.I. SERVICIOS S.A. DE C.V.",
  "IMPRESORA Y ENCUADERNADORA PROGRESO S.A. DE C.V.",
  "INSTALACIONES INMOBILIARIAS PARA INDUSTRIAS, S.A. DE C.V.",
  "INSTITUTO DE ADMINISTRACION Y AVALUOS DE BIENES NACIONALES",
  "INSTITUTO DE CAPACITACION Y PROFESIONALIZACION EN PROCURACION DE JUSTICIA FEDERAL",
  "INSTITUTO DE ECOLOGIA A.C. (INV)",
  "INSTITUTO DE INVESTIGACIONES DR. JOSE MARIA LUIS MORA",
  "INSTITUTO DE INVESTIGACIONES ELECTRICAS",
  "INSTITUTO DE LOS MEXICANOS EN EL EXTERIOR",
  "INSTITUTO DE SEGURIDAD SOCIAL PARA LAS FUERZAS ARMADAS MEXICANAS",
  "INSTITUTO DE SEGURIDAD Y SERVICIOS SOCIALES DE LOS TRABAJADORES DEL ESTADO",
  "INSTITUTO DEL FONDO NACIONAL PARA EL CONSUMO DE LOS TRABAJADORES",
  "INSTITUTO FEDERAL DE ACCESO A LA INFORMACION PUBLICA",
  "INSTITUTO FEDERAL DE TELECOMUNICACIONES",
  "INSTITUTO MATIAS ROMERO DE ESTUDIOS DIPLOMATICOS",
  "INSTITUTO MEXICANO DE CINEMATOGRAFIA",
  "INSTITUTO MEXICANO DE LA JUVENTUD",
  "INSTITUTO MEXICANO DE LA PROPIEDAD INDUSTRIAL",
  "INSTITUTO MEXICANO DE LA RADIO",
  "INSTITUTO MEXICANO DE TECNOLOGIA DEL AGUA",
  "INSTITUTO MEXICANO DEL PETROLEO",
  "INSTITUTO MEXICANO DEL SEGURO SOCIAL",
  "INSTITUTO MEXICANO DEL TRANSPORTE",
  "INSTITUTO NACIONAL DE ANTROPOLOGIA E HISTORIA",
  "INSTITUTO NACIONAL DE ASTROFISICA OPTICA Y ELECTRONICA",
  "INSTITUTO NACIONAL DE BELLAS ARTES Y LITERATURA",
  "INSTITUTO NACIONAL DE CANCEROLOGIA",
  "INSTITUTO NACIONAL DE CARDIOLOGIA IGNACIO CHAVEZ",
  "INSTITUTO NACIONAL DE CIENCIAS MEDICAS Y NUTRICION SALVADOR ZUBIRAN (INV)",
  "INSTITUTO NACIONAL DE CIENCIAS PENALES",
  "INSTITUTO NACIONAL DE DESARROLLO SOCIAL",
  "INSTITUTO NACIONAL DE ECOLOGIA",
  "INSTITUTO NACIONAL DE ECOLOGÍA Y CAMBIO CLIMÁTICO",
  "INSTITUTO NACIONAL DE ENFERMEDADES RESPIRATORIAS",
  "INSTITUTO NACIONAL DE ESTUDIOS HISTORICOS DE LAS REVOLUCIONES DE MEXICO",
  "INSTITUTO NACIONAL DE GERIATRÍA",
  "INSTITUTO NACIONAL DE INFRAESTRUCTURA FÍSICA EDUCATIVA",
  "INSTITUTO NACIONAL DE INVESTIGACIONES FORESTALES AGRICOLAS Y PECUARIAS",
  "INSTITUTO NACIONAL DE INVESTIGACIONES NUCLEARES",
  "INSTITUTO NACIONAL DE LA ECONOMÍA SOCIAL",
  "INSTITUTO NACIONAL DE LA PESCA",
  "INSTITUTO NACIONAL DE LAS MUJERES",
  "INSTITUTO NACIONAL DE LAS PERSONAS ADULTAS MAYORES",
  "INSTITUTO NACIONAL DE LENGUAS INDIGENAS",
  "INSTITUTO NACIONAL DE MEDICINA GENOMICA",
  "INSTITUTO NACIONAL DE MIGRACION",
  "INSTITUTO NACIONAL DE NEUROLOGIA Y NEUROCIRUGIA DR. MANUEL VELASCO SUAREZ",
  "INSTITUTO NACIONAL DE PEDIATRIA",
  "INSTITUTO NACIONAL DE PERINATOLOGIA ISIDRO ESPINOSA DE LOS REYES",
  "INSTITUTO NACIONAL DE PSIQUIATRIA RAMON DE LA FUENTE MUÑIZ",
  "INSTITUTO NACIONAL DE REHABILITACION",
  "INSTITUTO NACIONAL DE SALUD PUBLICA",
  "INSTITUTO NACIONAL DEL DERECHO DE AUTOR",
  "INSTITUTO NACIONAL PARA EL DESARROLLO DE CAPACIDADES DEL SECTOR RURAL A.C.",
  "INSTITUTO NACIONAL PARA EL FEDERALISMO Y EL DESARROLLO MUNICIPAL",
  "INSTITUTO NACIONAL PARA LA EDUCACION DE LOS ADULTOS",
  "INSTITUTO NACIONAL PARA LA EVALUACION DE LA EDUCACION",
  "INSTITUTO PARA EL DESARROLLO TECNICO DE LAS HACIENDAS PUBLICAS",
  "INSTITUTO PARA LA PROTECCION AL AHORRO BANCARIO",
  "INSTITUTO POLITECNICO NACIONAL",
  "INSTITUTO POTOSINO DE INVESTIGACION CIENTIFICA Y TECNOLOGICA, A.C.",
  "LABORATORIOS DE BIOLOGICOS Y REACTIVOS DE MEXICO S.A. DE C.V.",
  "LICONSA S.A. DE C.V.",
  "LOTERIA NACIONAL PARA LA ASISTENCIA PUBLICA",
  "NACIONAL FINANCIERA S.N.C.",
  "NOTIMEX, AGENCIA DE NOTICIAS DEL ESTADO MEXICANO",
  "NOTIMEX S.A. DE C.V.",
  "PATRONATO DE OBRAS E INSTALACIONES DEL INSTITUTO POLITECNICO NACIONAL",
  "PEMEX-EXPLORACION Y PRODUCCION",
  "PEMEX-GAS Y PETROQUIMICA BASICA",
  "PEMEX-PETROQUIMICA",
  "PEMEX-REFINACION",
  "PETROLEOS MEXICANOS",
  "P.M.I. COMERCIO INTERNACIONAL S.A. DE C.V.",
  "POLICIA FEDERAL",
  "PRESIDENCIA DE LA REPUBLICA",
  "PREVENCION Y READAPTACION SOCIAL",
  "PROCURADURIA AGRARIA",
  "PROCURADURIA DE LA DEFENSA DEL CONTRIBUYENTE",
  "PROCURADURIA FEDERAL DE LA DEFENSA DEL TRABAJO",
  "PROCURADURIA FEDERAL DE PROTECCION AL AMBIENTE",
  "PROCURADURIA FEDERAL DEL CONSUMIDOR",
  "PROCURADURIA GENERAL DE LA REPUBLICA",
  "PRODUCTORA NACIONAL DE BIOLOGICOS VETERINARIOS",
  "PRONOSTICOS PARA LA ASISTENCIA PUBLICA",
  "RADIO EDUCACION",
  "REGISTRO AGRARIO NACIONAL",
  "SECCION MEXICANA DE LA COMISION INTERNACIONAL DE LIMITES Y AGUAS MEXICO-ESTADOS UNIDOS DE AMERICA",
  "SECCION MEXICANA DE LA COMISION INTERNACIONAL DE LIMITES Y AGUAS MEXICO-GUATEMALA-BELICE",
  "SECRETARIA DE AGRICULTURA GANADERIA DESARROLLO RURAL PESCA Y ALIMENTACION",
  "SECRETARIA DE COMUNICACIONES Y TRANSPORTES",
  "SECRETARÍA DE CULTURA",
  "SECRETARIA DE DESARROLLO AGRARIO, TERRITORIAL Y URBANO",
  "SECRETARIA DE DESARROLLO SOCIAL",
  "SECRETARIA DE ECONOMIA",
  "SECRETARIA DE EDUCACION PUBLICA",
  "SECRETARIA DE ENERGIA",
  "SECRETARIA DE GOBERNACION",
  "SECRETARIA DE HACIENDA Y CREDITO PUBLICO",
  "SECRETARIA DE LA DEFENSA NACIONAL",
  "SECRETARIA DE LA FUNCION PUBLICA",
  "SECRETARIA DE MARINA",
  "SECRETARIA DE MEDIO AMBIENTE Y RECURSOS NATURALES",
  "SECRETARIA DE RELACIONES EXTERIORES",
  "SECRETARIA DE SALUD",
  "SECRETARIA DE TURISMO",
  "SECRETARIA DEL TRABAJO Y PREVISION SOCIAL",
  "SECRETARÍA EJECUTIVA DEL SISTEMA NACIONAL ANTICORRUPCIÓN",
  "SECRETARIA GENERAL DEL CONSEJO NACIONAL DE POBLACION",
  "SECRETARIA TECNICA DE LA COMISION CALIFICADORA DE PUBLICACIONES Y REVISTAS ILUSTRADAS",
  "SECRETARIADO EJECUTIVO DEL SISTEMA NACIONAL ANTICORRUPCIÓN",
  "SECRETARIADO EJECUTIVO DEL SISTEMA NACIONAL DE SEGURIDAD PUBLICA",
  "SERVICIO DE ADMINISTRACION TRIBUTARIA",
  "SERVICIO DE ADMINISTRACION Y ENAJENACION DE BIENES",
  "SERVICIO DE INFORMACION AGROALIMENTARIA Y PESQUERA",
  "SERVICIO DE PROTECCIÓN FEDERAL",
  "SERVICIO GEOLOGICO MEXICANO",
  "SERVICIO NACIONAL DE INSPECCION Y CERTIFICACION DE SEMILLAS",
  "SERVICIO NACIONAL DE SANIDAD INOCUIDAD Y CALIDAD AGROALIMENTARIA",
  "SERVICIO POSTAL MEXICANO",
  "SERVICIOS A LA NAVEGACION EN EL ESPACIO AEREO MEXICANO",
  "SERVICIOS AEROPORTUARIOS DE LA CIUDAD DE MEXICO S.A. DE C.V.",
  "SERVICIOS DE ALMACENAMIENTO DEL NORTE S.A.",
  "SERVICIOS DE ATENCION PSIQUIATRICA",
  "SISTEMA NACIONAL PARA EL DESARROLLO INTEGRAL DE LA FAMILIA",
  "SISTEMA PÚBLICO DE RADIODIFUSIÓN DEL ESTADO MEXICANO",
  "SOCIEDAD HIPOTECARIA FEDERAL S.N.C.",
  "TALLERES GRAFICOS DE MEXICO",
  "TECNOLOGICO NACIONAL DE MEXICO",
  "TELECOMUNICACIONES DE MEXICO",
  "TELEVISION METROPOLITANA S.A. DE C.V.",
  "TRANSPORTADORA DE SAL S.A. DE C.V.",
  "TRIBUNAL FEDERAL DE CONCILIACION Y ARBITRAJE",
  "TRIBUNAL FEDERAL DE JUSTICIA FISCAL Y ADMINISTRATIVA CON SEDE EN EL DISTRITO FEDERAL",
  "TRIBUNAL SUPERIOR AGRARIO.",
  "TRIBUNALES UNITARIOS AGRARIOS",
  "UNIVERSIDAD ABIERTA Y A DISTANCIA DE MÉXICO",
  "UNIVERSIDAD AUTONOMA AGRARIA ANTONIO NARRO",
  "UNIVERSIDAD AUTONOMA DE CHAPINGO",
  "UNIVERSIDAD AUTONOMA METROPOLITANA",
  "UNIVERSIDAD PEDAGOGICA NACIONAL",
  "XE-IPN CANAL 11"
];

/*
  
  // HELPERS
  
*/
export const reducer = (accumulator, currentValue) =>
  accumulator + currentValue;

/*
  
  // STATS CONFIG
  
*/
export const AgeChartsConf = {
  from: 18,
  to: 68,
  step: 10
};

export const SalaryChartConf = [
  [null, 100000],
  [100000, 300000],
  [300000, 600000],
  [600000, null]
];

export const propertyChartConf = [
  [null, 99],
  [100, 200],
  [200, 400],
  [400, null]
];

/*
  
  // CHARTIST OPTIONS
  
*/

export const StatsChartOptions = {
  donutOptions: { donut: true, donutWidth: 30 }
};

export const ChartColors = [
  "#8C5B6C",
  "#F5C48A",
  "#14ABBD",
  "#F5786F",
  "#99B898",
  "#F2355B",
  "#191226"
];

export const colorsChart = [
  "#2EB2E7",
  "#4B9DE3",
  "#6E85D5",
  "#8B6ABC",
  "#9F4D99",
  "#A62E6F",
  "#007DAF",
  "#CAF7FF",
  "#763500",
  "#D98EC5",
  "#A15A8F",
  "#1D534C",
  "#924C00",
  "#36897D",
  "#81F9BF",
  "#5C98B8",
  "#9AAEBB",
  "#D98EC5"
];

/*
  
  // SVG GRAPH OPTIONS
  
*/

export const BarChartConf = {
  width: 800,
  labelsWidthPercent: 0.2,
  barsWidthPercent: 0.7,
  dividerWidthPerecent: 0.03,
  dividerLines: 9,
  margin: {
    top: 50,
    right: 20,
    bottom: 30,
    left: 20
  },
  bars: {
    height: 30,
    margin: 10
  },
  colors: ["#83dfff", "#e8b3e2", "#b3cde2", "#b3e0ce", "#e5e27f", "#e09d9d"]
};

/*
  
  // estados
  
*/

export const GFStates = {
  states: [
    /*
    {
      "id": 1,
      "name": "Aguascalientes",
      "url": "aguascalientes",
      "clave_inegi": "01000",
      "lat": 22.034027099609,
      "lng": -102.36222457886
    },
    {
      "id": 2,
      "name": "Baja California",
      "url": "baja-california",
      "clave_inegi": "02000",
      "lat": 30.35791683197,
      "lng": -115.53708267212
    },
    {
      "id": 3,
      "name": "Baja California Sur",
      "url": "baja-california-sur",
      "clave_inegi": "03000",
      "lat": 25.435832977295,
      "lng": -112.29750061035
    },
    {
      "id": 4,
      "name": "Campeche",
      "url": "campeche",
      "clave_inegi": "04000",
      "lat": 19.256249427795,
      "lng": -90.800415039063
    },
    {
      "id": 5,
      "name": "Coahuila de Zaragoza",
      "url": "coahuila",
      "clave_inegi": "05000",
      "lat": 27.199584007263,
      "lng": -101.87833404541
    },
    {
      "id": 6,
      "name": "Colima",
      "url": "colima",
      "clave_inegi": "06000",
      "lat": 18.916250228882,
      "lng": -109.12874984741
    },
    {
      "id": 7,
      "name": "Chiapas",
      "url": "chiapas",
      "clave_inegi": "07000",
      "lat": 16.256249904633,
      "lng": -92.267913818359
    },
    {
      "id": 8,
      "name": "Chihuahua",
      "url": "chihuahua",
      "clave_inegi": "08000",
      "lat": 28.694167137146,
      "lng": -106.23278045654
    },
    {
      "id": 9,
      "name": "Cuidad de México",
      "url": "cdmx",
      "clave_inegi": "09000",
      "lat": 19.293750762939,
      "lng": -99.154724121094
    },
    {
      "id": 10,
      "name": "Durango",
      "url": "durango",
      "clave_inegi": "10000",
      "lat": 24.599444389343,
      "lng": -104.83847045898
    },
    {
      "id": 11,
      "name": "Guanajuato",
      "url": "guanajuato",
      "clave_inegi": "11000",
      "lat": 20.880556106567,
      "lng": -100.90013885498
    },
    {
      "id": 12,
      "name": "Guerrero",
      "url": "guerrero",
      "clave_inegi": "12000",
      "lat": 17.592082977295,
      "lng": -100.13444519043
    },
    {
      "id": 13,
      "name": "Hidalgo",
      "url": "hidalgo",
      "clave_inegi": "13000",
      "lat": 20.495555877686,
      "lng": -98.936252593994
    },
    */
    {
      id: 14,
      name: "Jalisco",
      url: "jalisco",
      clave_inegi: "14000",
      lat: 20.833055496216,
      lng: -103.60902786255
    },
    {
      id: 15,
      name: "México",
      url: "mexico",
      clave_inegi: "15000",
      lat: 19.323333740234,
      lng: -99.610832214355
    },
    {
      id: 16,
      name: "Michoacán de Ocampo",
      url: "michoacan",
      clave_inegi: "16000",
      lat: 19.160695075989,
      lng: -101.92708206177
    }
    /*
    ,{
      "id": 17,
      "name": "Morelos",
      "url": "morelos",
      "clave_inegi": "17000",
      "lat": 18.73888874054,
      "lng": -99.07833480835
    },
    {
      "id": 18,
      "name": "Nayarit",
      "url": "nayarit",
      "clave_inegi": "18000",
      "lat": 21.799722671509,
      "lng": -105.19416427612
    },
    {
      "id": 19,
      "name": "Nuevo León",
      "url": "nuevo-leon",
      "clave_inegi": "19000",
      "lat": 25.5,
      "lng": -99.817222595215
    },
    {
      "id": 20,
      "name": "Oaxaca",
      "url": "oaxaca",
      "clave_inegi": "20000",
      "lat": 17.15319442749,
      "lng": -96.223335266113
    },
    {
      "id": 21,
      "name": "Puebla",
      "url": "puebla",
      "clave_inegi": "21000",
      "lat": 19.358194351196,
      "lng": -97.907222747803
    },
    {
      "id": 22,
      "name": "Querétaro",
      "url": "Querétaro",
      "clave_inegi": "22000",
      "lat": 20.841526985168,
      "lng": -99.819583892822
    },
    {
      "id": 23,
      "name": "Quintana Roo",
      "url": "quintana-roo",
      "clave_inegi": "23000",
      "lat": 19.75,
      "lng": -87.960693359375
    },
    {
      "id": 24,
      "name": "San Luis Potosí",
      "url": "san-luis-potosi",
      "clave_inegi": "24000",
      "lat": 22.78111076355,
      "lng": -100.29416656494
    },
    {
      "id": 25,
      "name": "Sinaloa",
      "url": "sinaloa",
      "clave_inegi": "25000",
      "lat": 24.773194313049,
      "lng": -107.39791870117
    },
    {
      "id": 26,
      "name": "Sonora",
      "url": "sonora",
      "clave_inegi": "26000",
      "lat": 29.401390075684,
      "lng": -111.75916671753
    },
    {
      "id": 27,
      "name": "Tabasco",
      "url": "tabasco",
      "clave_inegi": "27000",
      "lat": 17.947777748108,
      "lng": -92.564445495605
    },
    {
      "id": 28,
      "name": "Tamaulipas",
      "url": "tamaulipas",
      "clave_inegi": "28000",
      "lat": 24.960139274597,
      "lng": -98.635555267334
    },
    {
      "id": 29,
      "name": "Tlaxcala",
      "url": "tlaxcala",
      "clave_inegi": "29000",
      "lat": 19.421388626099,
      "lng": -98.180137634277
    },
    {
      "id": 30,
      "name": "Veracruz de Ignacio de la Llave",
      "url": "veracruz",
      "clave_inegi": "30000",
      "lat": 19.810277938843,
      "lng": -96.136390686035
    },
    {
      "id": 31,
      "name": "Yucatán",
      "url": "yucatán",
      "clave_inegi": "31000",
      "lat": 21.012638092041,
      "lng": -88.9684715271
    },
    {
      "id": 32,
      "name": "Zacatecas",
      "url": "zacatecas",
      "clave_inegi": "32000",
      "lat": 23.071805953979,
      "lng": -102.55361175537
    }
    */
  ]
};
