const getParams = () => ({
    "particles": {
        "number": {
            "value": 24,
            "density": {
                "enable": true,
                "value_area": 800
            }
        },
        "line_linked": {
            "enable": false
        },
        "move": {
            "speed": 1,
            "out_mode": "out"
        },
        "shape": {
            "type": [
                "images"
            ],
            "images": [
                {
                    "src": process.env.PUBLIC_URL + "/img/flotantes/contrataciones/1.svg",
                    "height": 30,
                    "width": 30
                },
                {
                    "src": process.env.PUBLIC_URL + "/img/flotantes/contrataciones/2.svg",
                    "height": 30,
                    "width": 30
                },
                {
                    "src": process.env.PUBLIC_URL + "/img/flotantes/contrataciones/3.svg",
                    "height": 30,
                    "width": 30
                },
                {
                    "src": process.env.PUBLIC_URL + "/img/flotantes/contrataciones/4.svg",
                    "height": 30,
                    "width": 30
                },
                {
                    "src": process.env.PUBLIC_URL + "/img/flotantes/contrataciones/5.svg",
                    "height": 30,
                    "width": 30
                },
                {
                    "src": process.env.PUBLIC_URL + "/img/flotantes/contrataciones/6.svg",
                    "height": 30,
                    "width": 30
                },
                {
                    "src": process.env.PUBLIC_URL + "/img/flotantes/contrataciones/7.svg",
                    "height": 30,
                    "width": 30
                },
                {
                    "src": process.env.PUBLIC_URL + "/img/flotantes/contrataciones/8.svg",
                    "height": 30,
                    "width": 30
                },
                {
                    "src": process.env.PUBLIC_URL + "/img/flotantes/contrataciones/9.svg",
                    "height": 30,
                    "width": 30
                },
                {
                    "src": process.env.PUBLIC_URL + "/img/flotantes/contrataciones/10.svg",
                    "height": 30,
                    "width": 30
                },
                {
                    "src": process.env.PUBLIC_URL + "/img/flotantes/contrataciones/11.svg",
                    "height": 30,
                    "width": 30
                },
                {
                    "src": process.env.PUBLIC_URL + "/img/flotantes/contrataciones/12.svg",
                    "height": 30,
                    "width": 30
                },
                {
                    "src": process.env.PUBLIC_URL + "/img/flotantes/contrataciones/13.svg",
                    "height": 30,
                    "width": 30
                },
            ]
        },
        "size": {
            "value": 30,
            "random": false,
            "anim": {
                "enable": true,
                "speed": 4,
                "size_min": 10,
                "sync": false
            }
        }
    },
    "retina_detect": true
});

export {getParams};