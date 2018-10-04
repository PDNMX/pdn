const INITIAL_STATE = {
    denuncia:{
        "correo_solicitante" : "",
        "is_servidor" : false,
        "nombre_solicitante" : "",
        "apellido_uno_solicitante" : "",
        "apellido_dos_solicitante" : "",
        "genero_solicitante" : "",
        "edad_solicitante" : 0,
        "escolaridad_solicitante" : "",
        "ocupacion_solicitante" : "",
        "empresa_organizacion_solicitante" : "",
        "pais_solicitante" : "",
        "lada_solicitante" : "",
        "telefono_solicitante" : "",
        "fecha_hecho" : new Date(),
        "hora_hecho" : new Date(),
        "trato_recibido" : "",
        "lugar_hecho" : "",
        "institucion_servidor" : "",
        "nombre_tramite" : "",
        "solicitud_hecho" : "",
        "pais_hecho":"",
        "testigos" : [],
        "motivo_denuncia" : "",
        "motivo_peticion": "",
        "anonima" : false,
        "acusados" : [],
        "folio": ""
    }
};

let idTestigo = 0;
let idAcusado = 0;

const denunciaReducer = (state = INITIAL_STATE, action) =>{
    switch (action.type) {
        case "SET_FIELD":
            let denuncia= {
                ...state.denuncia,
              [action.name] : action.event.target.value
            };
            let ob = {denuncia : denuncia};
            return ob;
        case "SET_DATE":
            let d = {
                ...state.denuncia,
                [action.name] : action.date
            };
            let obj = {denuncia : d};
            return obj;
        case "SET_CHECK" :
            let de = {
                ...state.denuncia,
                [action.name] : action.event.target.checked
            };
            let objeto = {denuncia : de};
            return objeto;
        case "NEW_DENUNCIA" :
            return INITIAL_STATE;
        case "ADD_TESTIGO":
            action.testigo.id = idTestigo++;
            let denunciaTestigos = {
                ...state.denuncia,
                "testigos" : [
                    ...state.denuncia.testigos,
                    {
                        id : action.testigo.id,
                        nombre: action.testigo.nombre
                    }
                ]
            };
            let objetoTestigos = {denuncia : denunciaTestigos};
            return objetoTestigos;
        case "ADD_ACUSADO":
            action.acusado.id = idAcusado++;
            let denunciaAcusados = {
                ...state.denuncia,
                "acusados" : [
                    ...state.denuncia.acusados,
                    {
                        id : action.acusado.id,
                        nombre : action.acusado.nombre,
                    }
                ]
            };
            let obetoAcusados ={denuncia :denunciaAcusados};
            return obetoAcusados;
        default :
            return state;

    }
};

export default denunciaReducer;