import React, { useEffect } from 'react';
import Canvas from './Canvas'
import withStyles from "@mui/styles/withStyles";
import { Typography, Grid } from "@mui/material";
// import { Link } from "react-router-dom";
import BuscadorModal from "./Asistente/BotonPrincipal";

/* import bgPDN from "../../assets/rediseno2023/imgs/fondos/fondo-mapa.svg"; */
import lgoSNA from "../../assets/rediseno2023/imgs/iconos/logotipos/logo-sna.svg";
import lgoSESNA from "../../assets/rediseno2023/imgs/iconos/logotipos/logo-sesna.svg";

import ScrollAnimation from "./ScrollAnimation";

const styles = () => ({
  container: {
    /* background: `url(${bgPDN}) 10% -10px no-repeat rgb(255, 255, 255)`, */
    maxWidth: 1500,
    margin: "auto",
    /* background: "#f2f0f2", */
    paddingTop: "4rem",
    paddingBottom: "4rem",
  },
});

const QueEsPDN = (props) => {
  const { classes } = props;

  const draw = (ctx, frameCount) => {
    //  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    //  ctx.fillStyle = '#000000'
    // ctx.beginPath()
    // ctx.arc(50, 100, 20*Math.sin(frameCount*0.05)**2, 0, 2*Math.PI)
    // ctx.fill()


    
   

      // Adjustable variables
      var settings = {
        pointDensity: 8,
        connections: 2,
        sizeVariation: 0.5,
        velocity: 0.00003,
        maxMovement: 50,
        attractionRange: 400,
        attractionFactor: .8,
        imagePath: 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyBpZD0iQ2FwYV8xIiBkYXRhLW5hbWU9IkNhcGEgMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2ZXJzaW9uPSIxLjEiIHZpZXdCb3g9IjAgMCAyMCAxOCI+CiAgPGRlZnM+CiAgICA8c3R5bGU+CiAgICAgIC5jbHMtMSB7CiAgICAgICAgZmlsbDogI2ZmZjsKICAgICAgICBzdHJva2U6ICMwMmIzZTQ7CiAgICAgICAgc3Ryb2tlLW1pdGVybGltaXQ6IDEwOwogICAgICB9CiAgICA8L3N0eWxlPgogIDwvZGVmcz4KICA8Y2lyY2xlIGNsYXNzPSJjbHMtMSIgY3g9IjkuOCIgY3k9IjkiIHI9IjguNCIvPgo8L3N2Zz4=',
        imgWidth: 12,
        imgHeight: 12,
        lineColor: "rgba(241, 239, 243, 1)",
        particleDensity: 0.2,
        particleChance: 0.2,
        particleVelocity: 70,
        particleColor: "rgba(2, 179, 228, .2)",
        particleLength: 10,
        flashRadius: 15,
        flashOpacity: 0.6,
        flashDecay: 0.2
      }

      var start = null,
        delta = 0,
        lasttimestamp = null;

      var points = [],
        particles = [];

      var mousePoint = { x: 0, y: 0 };

      var img = new Image();
      img.src = settings.imagePath;

     

      // resize the canvas to fill browser window dynamically
      var resizeTimer;
      window.addEventListener('resize', resizeCanvas, false);
      function resizeCanvas() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function () {
          ctx.canvas.width = window.innerWidth;
          ctx.canvas.height = 400
          //ctx.canvas.height = window.innerHeight;
          createPoints();
          drawFrame();
        }, 250);

      }
      resizeCanvas();

      createPoints();

      document.onmousemove = handleMouseMove;

      window.requestAnimationFrame(animate);

      function createPoints() {
        points = [];
        particles = [];
        for (var x = 0 - 100; x < ctx.canvas.width + 100; x = x + 1000 / settings.pointDensity) {
          for (var y = 0 - 100; y < ctx.canvas.height + 100; y = y + 1000 / settings.pointDensity) {
            var px = Math.floor(x + Math.random() * 1000 / settings.pointDensity);
            var py = Math.floor(y + Math.random() * 1000 / settings.pointDensity);
            var pSizeMod = Math.random() * settings.sizeVariation + 1
            var pw = settings.imgWidth * pSizeMod;
            var ph = settings.imgHeight * pSizeMod;
            var pAnimOffset = Math.random() * 2 * Math.PI;
            var p = { x: px, originX: px, y: py, originY: py, w: pw, h: ph, sizeMod: pSizeMod, animOffset: pAnimOffset, attraction: 1, flashOpacity: 0 };
            points.push(p);
          }
        }

        // for each point find the closest points. From https://tympanus.net/codrops/2014/09/23/animated-background-headers/
        for (var i = 0; i < points.length; i++) {
          var closest = [];
          var p1 = points[i];
          for (var j = 0; j < points.length; j++) {
            var p2 = points[j]
            if (!contains(p2.closest, p1) && p1 != p2) {
              var placed = false;
              for (var k = 0; k < settings.connections; k++) {
                if (!placed && closest[k] == undefined) {
                  closest[k] = p2;
                  placed = true;
                }
              }

              for (var k = 0; k < settings.connections; k++) {
                if (!placed && getDistance(p1, p2) < getDistance(p1, closest[k])) {
                  closest[k] = p2;
                  placed = true;
                }
              }
            }
          }
          p1.closest = closest;
        }
      }

      function animate(timestamp) {
        // Calculate frametime
        if (!start) {
          start = timestamp;
          lasttimestamp = timestamp;
        }
        var elapsed = timestamp - start,
          delta = (timestamp - lasttimestamp) / 100;
        lasttimestamp = timestamp;

        // Move points around
        for (var i = 0; i < points.length; i++) {
          var point = points[i];
          var displacementFactor = 0
          var attractionOffset = { x: 0, y: 0 };
          var distanceToMouse = getDistance({ x: point.originX, y: point.originY }, mousePoint);
          if (distanceToMouse <= settings.attractionRange) {
            displacementFactor = (Math.cos(distanceToMouse / settings.attractionRange * Math.PI) + 1) / 2 * settings.attractionFactor;
            attractionOffset.x = displacementFactor * (mousePoint.x - point.x);
            attractionOffset.y = displacementFactor * (mousePoint.y - point.y);
          }

          point.x = point.originX + Math.sin(elapsed * settings.velocity + point.animOffset) * settings.maxMovement * point.sizeMod + attractionOffset.x;
          point.y = point.originY - Math.cos(elapsed * settings.velocity + point.animOffset) * settings.maxMovement * point.sizeMod + attractionOffset.y;

          point.flashOpacity = Math.max(0, point.flashOpacity - settings.flashDecay * delta);
        }

        // Move particles
        for (var i = 0; i < particles.length; i++) {
          var particle = particles[i];

          var origin = points[particle.origin];
          var target = origin.closest[particle.target];

          var distance = getDistance({ x: origin.x, y: origin.y }, { x: target.x, y: target.y });
          var direction = { x: (target.x - origin.x) / distance, y: (target.y - origin.y) / distance };

          particle.traveled += settings.particleVelocity * delta;
          particle.direction = direction;

          particle.x = origin.x + direction.x * particle.traveled;
          particle.y = origin.y + direction.y * particle.traveled;

          if (!between(origin, { x: particle.x }, target)) {
            particles.splice(i, 1);
            i--;
          }

        }

        // Spawn new particles
        for (var i = 0; i < settings.particleDensity * points.length; i++) {
          if (Math.random() < settings.particleChance * delta) {
            var pOriginNum = Math.floor(Math.random() * points.length);
            var pOrigin = points[pOriginNum];
            var pTargetNum = Math.floor(Math.random() * pOrigin.closest.length);
            var px = pOrigin.x;
            var py = pOrigin.y;
            var p = { origin: pOriginNum, target: pTargetNum, x: px, y: py, traveled: 0, direction: { x: 0, y: 0 } };
            particles.push(p);
            pOrigin.flashOpacity = settings.flashOpacity;
          }
        }

        drawFrame();

        window.requestAnimationFrame(animate);

      }

      function handleMouseMove(event) {
        mousePoint.x = event.pageX;
        mousePoint.y = event.pageY;
        // console.log(mousePoint.x, mousePoint.y);
      }

      function drawFrame() {
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

        for (var i = 0; i < points.length; i++) {
          drawLines(points[i]);
        }

        for (var i = 0; i < particles.length; i++) {
          var particle = particles[i];
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(particle.x - particle.direction.x * settings.particleLength, particle.y - particle.direction.y * settings.particleLength);
          ctx.strokeStyle = settings.particleColor;
          ctx.stroke();
        }

        for (var i = 0; i < points.length; i++) {
          var point = points[i];
          if (point.flashOpacity > 0) {
            ctx.beginPath();
            ctx.rect(point.x - settings.flashRadius, point.y - settings.flashRadius, settings.flashRadius * 2, settings.flashRadius * 2);
            var gradient = ctx.createRadialGradient(point.x, point.y, settings.flashRadius, point.x, point.y, 1);
            gradient.addColorStop(0, "rgba(2, 179, 228, 0)");
            gradient.addColorStop(1, "rgba(2, 179, 228, " + point.flashOpacity + ")");
            ctx.fillStyle = gradient;
            ctx.fill();
          }
          ctx.drawImage(img, point.x - point.w / 2, point.y - point.h / 2, point.w, point.h);
        }
      }

      function drawLines(p) {
        for (var i in p.closest) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p.closest[i].x, p.closest[i].y);
          ctx.strokeStyle = settings.lineColor;
          ctx.stroke();
        }
      }

      //Util
      function getDistance(p1, p2) {
        return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
      }

      function contains(a, obj) {
        if (a !== undefined) {
          for (var i = 0; i < a.length; i++) {
            if (a[i] === obj) {
              return true;
            }
          }
        }
        return false;
      }

      function between(p1, p2, t) {
        return (p1.x - p2.x) * (p2.x - t.x) > 0;
      }

    





















  }





  return (
    <>
      <div className="rootHome contenedor">
      <Canvas id="myCanvas" draw={draw}/>
        <Grid
          container
          alignItems="row"
          justifyContent="center"
          className={classes.container}
        >
          <Grid
            item
            md={12}
            lg={12}
            xs={12}
            p={{ xs: 1, xl: 0 }}
            sx={{ textAlign: "center" }}
          >
         
            <div className="pdn-txt-bg">
              <ScrollAnimation>
                <Typography variant="h1">
                  PLATAFORMA DIGITAL NACIONAL
                </Typography>
                <Typography variant="h2">Inteligencia Anticorrupción</Typography>
                <div>
                  <img
                    style={{ margin: "1rem" }}
                    src={lgoSNA}
                    alt="Sistema Nacional Anticorrupción"
                  />
                  <img
                    style={{ margin: "1rem" }}
                    src={lgoSESNA}
                    alt="Secretaría Ejecutiva del Sistema Nacional Anticorrupción"
                  />
                </div>
                <br />
                <BuscadorModal />
              </ScrollAnimation>
            </div>
          </Grid>
          {/* <Grid item lg={7} md={7} xs={12} align='left' p={{ xs: 1, lg: 0 }}>
            <Typography>
              La <b>Plataforma Digital Nacional (PDN)</b> del Sistema Nacional
              Anticorrupción (SNA) es un <b>instrumento de inteligencia</b> que
              tiene como objetivo eliminar las barreras de información para que
              los datos públicos sean comparables, accesibles y utilizables a
              efecto de combatir cualquier acto de corrupción.
              <br />
              <br />
              <b>
                La Secretaría Ejecutiva del Sistema Nacional Anticorrupción
                (SESNA)
              </b>
              , organismo descentralizado no sectorizado, es responsable de
              administrar la <b>PDN</b>.<br />
              <br />
              La PDN no es generadora ni un repositorio de datos, sino una
              plataforma de <b>interoperabilidad</b> que consulta información de
              diversas fuentes.
              <br />
              <br />
            </Typography>
          </Grid> */}

          {/* <Grid item xs={12} pr={{ xs: 0, md: 1 }}>
            <Stack direction="row" justifyContent={{ xs: "center", md: "end" }}>
              <Link className={classes.link} to="/about">
                <ButtonPDN style={{ color: "white" }}>Conoce más</ButtonPDN>
              </Link>
            </Stack>
          </Grid> */}
        </Grid>
      </div>
    </>
  );
};
export default withStyles(styles)(QueEsPDN);
