const domicilioMexico = {
	calle: 'NO PÚBLICO',
	numeroExterior: 'NO PÚBLICO',
	numeroInterior: 'NO PÚBLICO',
	coloniaLocalidad: 'NO PÚBLICO',
	municipioAlcaldia: {
		valor: 'NO PÚBLICO'
	},
	entidadFederativa: {
		valor: 'NO PÚBLICO'
	},
	codigoPostal: 'NO PÚBLICO'
};
const domicilioExtranjero = {
	calle: 'NO PÚBLICO',
	numeroExterior: 'NO PÚBLICO',
	numeroInterior: 'NO PÚBLICO',
	ciudadLocalidad: 'NO PÚBLICO',
	estadoProvincia: 'NO PÚBLICO',
	pais: 'NO PÚBLICO',
	codigoPostal: 'NO PÚBLICO'
};

const actividadLaboralSectorPublico = {
	nivelOrdenGobierno: 'NO PÚBLICO',
	ambitoPublico: 'NO PÚBLICO',
	nombreEntePublico: 'NO PÚBLICO',
	areaAdscripcion: 'NO PÚBLICO',
	empleoCargoComision: 'NO PÚBLICO',
	funcionPrincipal: 'NO PÚBLICO',
	salarioMensualNeto: {
		valor: 'NO PÚBLICO',
		moneda: ''
	},
	fechaIngreso: 'NO PÚBLICO'
};

const actividadLaboralSectorPrivadoOtro = {
	nombreEmpresaSociedadAsociacion: 'NO PÚBLICO',
	empleoCargoComision: 'NO PÚBLICO',
	rfc: 'NO PÚBLICO',
	fechaIngreso: 'NO PÚBLICO',
	sector: {
		clave: 'NO PÚBLICO',
		valor: 'NO PÚBLICO'
	},
	salarioMensualNeto: {
		valor: 'NO PÚBLICO',
		moneda: ''
	},
	proveedorContratistaGobierno: 'NO PÚBLICO'
};

export { domicilioMexico, domicilioExtranjero, actividadLaboralSectorPublico, actividadLaboralSectorPrivadoOtro };
