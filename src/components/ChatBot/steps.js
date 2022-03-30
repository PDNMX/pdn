function GoToPage(previousValue){
    window.location.assign(`${previousValue}`);
}

const steps = [
    {
        id: 'msjInicial',
        message: 'Hola, soy Eri, ¿En qué te puedo ayudar?',
        trigger: 'menuPrincipal',
    },
    {
        id: 'menuPrincipal',
        options: [
            { value: 1, label: 'Sistemas', trigger: 'preguntaSistema' },
            { value: 2, label: 'Conexión con la PDN', trigger: 'menuConexion' },
        ],
    },
    {
        id: 'preguntaSistema',
        message: 'Selecciona una opción',
        trigger: 'menuSistemas'
    },
    {
        id: 'menuSistemas',
        options: [
            { value: 's1', label: 'Declaraciones', trigger: 'menuDeclaraciones' },
            { value: '/sancionados', label:'Sancionados' , trigger: 'goTo'},
            { value: '/contrataciones', label: 'Contrataciones', trigger: 'goTo' },
            { value: '/fiscalizacion', label: 'Sistema de Fiscalización', trigger: 'goTo' },
            { value: '/denuncias', label: 'Denuncias por hechos de corrupción', trigger: 'goTo' },
            { value: '/servidores', label: 'Personas Servidoras Públicas que intervienen en contrataciones', trigger: 'goTo' },
            { value: 7, label: 'Regresar', trigger: 'menuPrincipal' },
            { value: 8, label: 'Terminar', trigger: 'adios' },
        ],
    },
    {
        id:'goTo',
        message: ({ previousValue, steps })=> GoToPage(previousValue)
    }
    ,
    {
        id: 'menuConexion',
        options: [
            { value: '/mesa-de-ayuda', label: 'Tengo dudas', trigger: 'goTo' },
            { value: '/especificaciones', label: 'Especificaciones técnicas', trigger: 'goTo' },
            { value: 'regresar', label: 'Regresar', trigger: 'menuPrincipal' },
        ],
    },
    {
        id: 'menuDeclaraciones',
        options: [
            {value:'/declaraciones', label: 'Consultar declaraciones',trigger:'goTo'},
            {value:2, label: 'Hacer mi declaración', trigger: 'hacerDec'},
            {value:3, label: 'Regresar', trigger: 'menuSistemas'}
        ]
    },
    {
        id:'hacerDec',
        message: 'Ups, en la PDN no puedes hacer tu declaración, acércate a tu área de control interno',
        trigger: 'pregFin'
    },
    {
        id: 'pregFin',
        message: '¿Quieres regresar al menú o terminar?',
        trigger: "menuFin"
    },
    {
        id: 'menuFin',
        options: [
            {value:1, label: 'Regresar', trigger: 'menuDeclaraciones'},
            {value:2, label: 'Terminar', trigger: 'adios'},
        ]
    },
    {
        id: 'adios',
        message: '¡Hasta pronto!',
        end: true
    }
];

export default steps;