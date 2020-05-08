const domicilioMexico = {
	calle: 'DATO RESERVADO',
	numeroExterior: 'DATO RESERVADO',
	numeroInterior: 'DATO RESERVADO',
	coloniaLocalidad: 'DATO RESERVADO',
	municipioAlcaldia: {
		valor: 'DATO RESERVADO'
	},
	entidadFederativa: {
		valor: 'DATO RESERVADO'
	},
	codigoPostal: 'DATO RESERVADO'
};
const domicilioExtranjero = {
	calle: 'DATO RESERVADO',
	numeroExterior: 'DATO RESERVADO',
	numeroInterior: 'DATO RESERVADO',
	ciudadLocalidad: 'DATO RESERVADO',
	estadoProvincia: 'DATO RESERVADO',
	pais: 'DATO RESERVADO',
	codigoPostal: 'DATO RESERVADO'
};

const actividadLaboralSectorPublico = {
	nivelOrdenGobierno: 'DATO RESERVADO',
	ambitoPublico: 'DATO RESERVADO',
	nombreEntePublico: 'DATO RESERVADO',
	areaAdscripcion: 'DATO RESERVADO',
	empleoCargoComision: 'DATO RESERVADO',
	funcionPrincipal: 'DATO RESERVADO',
	salarioMensualNeto: {
		valor: 'DATO RESERVADO',
		moneda: ''
	},
	fechaIngreso: 'DATO RESERVADO'
};

const actividadLaboralSectorPrivadoOtro = {
	nombreEmpresaSociedadAsociacion: 'DATO RESERVADO',
	empleoCargoComision: 'DATO RESERVADO',
	rfc: 'DATO RESERVADO',
	fechaIngreso: 'DATO RESERVADO',
	sector: {
		clave: 'DATO RESERVADO',
		valor: 'DATO RESERVADO'
	},
	salarioMensualNeto: {
		valor: 'DATO RESERVADO',
		moneda: ''
	},
	proveedorContratistaGobierno: 'DATO RESERVADO'
};

export { domicilioMexico, domicilioExtranjero, actividadLaboralSectorPublico, actividadLaboralSectorPrivadoOtro };
