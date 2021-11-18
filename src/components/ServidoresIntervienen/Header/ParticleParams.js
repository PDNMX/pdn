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
                    "src": process.env.PUBLIC_URL + "/img/flotantes/servidores/1.svg",
                    "height": 30,
                    "width": 30
                },
                {
                    "src": process.env.PUBLIC_URL + "/img/flotantes/servidores/2.svg",
                    "height": 30,
                    "width": 30
                },
                {
                    "src": process.env.PUBLIC_URL + "/img/flotantes/servidores/3.svg",
                    "height": 30,
                    "width": 30
                },
                {
                    "src": process.env.PUBLIC_URL + "/img/flotantes/servidores/4.svg",
                    "height": 30,
                    "width": 30
                },
                {
                    "src": process.env.PUBLIC_URL + "/img/flotantes/servidores/5.svg",
                    "height": 30,
                    "width": 30
                },
                {
                    "src": process.env.PUBLIC_URL + "/img/flotantes/servidores/6.svg",
                    "height": 30,
                    "width": 30
                },
                {
                    "src": process.env.PUBLIC_URL + "/img/flotantes/servidores/7.svg",
                    "height": 30,
                    "width": 30
                },
                {
                    "src": process.env.PUBLIC_URL + "/img/flotantes/servidores/8.svg",
                    "height": 30,
                    "width": 30
                },
                {
                    "src": process.env.PUBLIC_URL + "/img/flotantes/servidores/9.svg",
                    "height": 30,
                    "width": 30
                },
                {
                    "src": process.env.PUBLIC_URL + "/img/flotantes/servidores/10.svg",
                    "height": 30,
                    "width": 30
                },
                {
                    "src": process.env.PUBLIC_URL + "/img/flotantes/servidores/11.svg",
                    "height": 30,
                    "width": 30
                },
                {
                    "src": process.env.PUBLIC_URL + "/img/flotantes/servidores/12.svg",
                    "height": 30,
                    "width": 30
                },
                {
                    "src": process.env.PUBLIC_URL + "/img/flotantes/servidores/13.svg",
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