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


    
    var w = ctx.canvas.width = window.innerWidth,
    h = ctx.canvas.height = window.innerHeight,


    opts = {

      range: 500,
      baseConnections: 2,
      addedConnections: 5,
      baseSize: 5,
      minSize: 1,
      dataToConnectionSize: .9,
      sizeMultiplier: .7,
      allowedDist: 50,
      baseDist: 50,
      addedDist: 30,
      connectionAttempts: 10,

      dataToConnections: 1,
      baseSpeed: .005,
      addedSpeed: .005,
      baseGlowSpeed: .4,
      addedGlowSpeed: .4,

      rotVelX: .001,
      rotVelY: .0009,

      repaintColor: '#fff',
      connectionColor: 'hsla(193,98%,light%,alp)',
      rootColor: 'hsla(299,33%,light%,alp)',
      endColor: 'hsla(299,33%,light%,alp)',
      dataColor: 'hsla(272,66%,light%,alp)',

      wireframeWidth: 0.2,
      wireframeColor: '#8e8c91',

      depth: 250,
      focalLength: 300,
      vanishPoint: {
        x: w / 2,
        y: h / 2
      }
    }

    let squareRange, squareAllowed, mostDistant,sinX,cosX,sinY,cosY,connections,toDevelop,data,all,tick,totalProb,animating,Tau
    squareRange = opts.range * opts.range,
    squareAllowed = opts.allowedDist * opts.allowedDist,
    mostDistant = opts.depth + opts.range,
    sinX = sinY = 0,
    cosX = cosY = 0,

    connections = [],
    toDevelop = [],
    data = [],
    all = [],
    tick = 0,
    totalProb = 0,

    animating = false,

    Tau = Math.PI * 2;

    
    ctx.fillStyle = '#222';
    ctx.fillRect(0, 0, w, h);
    ctx.fillStyle = '#ccc';
    ctx.font = '50px Verdana';
    ctx.fillText('Calculating Nodes', w / 2 - ctx.measureText('Calculating Nodes').width / 2, h / 2 - 15);

    window.setTimeout(init, 4); // to render the loading screen

    function init() {

      connections.length = 0;
      data.length = 0;
      all.length = 0;
      toDevelop.length = 0;

      var connection = new Connection(0, 0, 0, opts.baseSize);
      connection.step = Connection.rootStep;
      connections.push(connection);
      all.push(connection);
      connection.link();

      while (toDevelop.length > 0) {

        toDevelop[0].link();
        toDevelop.shift();
      }

      if (!animating) {
        animating = true;
        anim();
      }
    }


    function Connection(x, y, z, size) {

      this.x = x;
      this.y = y;
      this.z = z;
      this.size = size;

      this.screen = {};

      this.links = [];
      this.probabilities = [];
      this.isEnd = false;

      this.glowSpeed = opts.baseGlowSpeed + opts.addedGlowSpeed * Math.random();
    }
    Connection.prototype.link = function () {

      if (this.size < opts.minSize)
        return this.isEnd = true;

      var links = [],
        connectionsNum = opts.baseConnections + Math.random() * opts.addedConnections | 0,
        attempt = opts.connectionAttempts,

        alpha, beta, len,
        cosA, sinA, cosB, sinB,
        pos = {},
        passedExisting, passedBuffered;

      while (links.length < connectionsNum && --attempt > 0) {

        alpha = Math.random() * Math.PI;
        beta = Math.random() * Tau;
        len = opts.baseDist + opts.addedDist * Math.random();

        cosA = Math.cos(alpha);
        sinA = Math.sin(alpha);
        cosB = Math.cos(beta);
        sinB = Math.sin(beta);

        pos.x = this.x + len * cosA * sinB;
        pos.y = this.y + len * sinA * sinB;
        pos.z = this.z + len * cosB;

        if (pos.x * pos.x + pos.y * pos.y + pos.z * pos.z < squareRange) {

          passedExisting = true;
          passedBuffered = true;
          for (var i = 0; i < connections.length; ++i)
            if (squareDist(pos, connections[i]) < squareAllowed)
              passedExisting = false;

          if (passedExisting)
            for (var i = 0; i < links.length; ++i)
              if (squareDist(pos, links[i]) < squareAllowed)
                passedBuffered = false;

          if (passedExisting && passedBuffered)
            links.push({ x: pos.x, y: pos.y, z: pos.z });

        }

      }

      if (links.length === 0)
        this.isEnd = true;
      else {
        for (var i = 0; i < links.length; ++i) {

          var pos = links[i],
            connection = new Connection(pos.x, pos.y, pos.z, this.size * opts.sizeMultiplier);

          this.links[i] = connection;
          all.push(connection);
          connections.push(connection);
        }
        for (var i = 0; i < this.links.length; ++i)
          toDevelop.push(this.links[i]);
      }
    }
    Connection.prototype.step = function () {

      this.setScreen();
      this.screen.color = (this.isEnd ? opts.endColor : opts.connectionColor).replace('light', 30 + ((tick * this.glowSpeed) % 30)).replace('alp', .2 + (1 - this.screen.z / mostDistant) * .8);

      for (var i = 0; i < this.links.length; ++i) {
        ctx.moveTo(this.screen.x, this.screen.y);
        ctx.lineTo(this.links[i].screen.x, this.links[i].screen.y);
      }
    }
    Connection.rootStep = function () {
      this.setScreen();
      this.screen.color = opts.rootColor.replace('light', 30 + ((tick * this.glowSpeed) % 30)).replace('alp', (1 - this.screen.z / mostDistant) * .8);

      for (var i = 0; i < this.links.length; ++i) {
        ctx.moveTo(this.screen.x, this.screen.y);
        ctx.lineTo(this.links[i].screen.x, this.links[i].screen.y);
      }
    }
    Connection.prototype.draw = function () {
      ctx.fillStyle = this.screen.color;
      ctx.beginPath();
      ctx.arc(this.screen.x, this.screen.y, this.screen.scale * this.size, 0, Tau);
      ctx.fill();
    }
    function Data(connection) {

      this.glowSpeed = opts.baseGlowSpeed + opts.addedGlowSpeed * Math.random();
      this.speed = opts.baseSpeed + opts.addedSpeed * Math.random();

      this.screen = {};

      this.setConnection(connection);
    }
    Data.prototype.reset = function () {

      this.setConnection(connections[0]);
      this.ended = 2;
    }
    Data.prototype.step = function () {

      this.proportion += this.speed;

      if (this.proportion < 1) {
        this.x = this.ox + this.dx * this.proportion;
        this.y = this.oy + this.dy * this.proportion;
        this.z = this.oz + this.dz * this.proportion;
        this.size = (this.os + this.ds * this.proportion) * opts.dataToConnectionSize;
      } else
        this.setConnection(this.nextConnection);

      this.screen.lastX = this.screen.x;
      this.screen.lastY = this.screen.y;
      this.setScreen();
      this.screen.color = opts.dataColor.replace('light', 40 + ((tick * this.glowSpeed) % 50)).replace('alp', .2 + (1 - this.screen.z / mostDistant) * .6);

    }
    Data.prototype.draw = function () {

      if (this.ended)
        return --this.ended; // not sre why the thing lasts 2 frames, but it does

      ctx.beginPath();
      ctx.strokeStyle = this.screen.color;
      ctx.lineWidth = this.size * this.screen.scale;
      ctx.moveTo(this.screen.lastX, this.screen.lastY);
      ctx.lineTo(this.screen.x, this.screen.y);
      ctx.stroke();
    }
    Data.prototype.setConnection = function (connection) {

      if (connection.isEnd)
        this.reset();

      else {

        this.connection = connection;
        this.nextConnection = connection.links[connection.links.length * Math.random() | 0];

        this.ox = connection.x; // original coordinates
        this.oy = connection.y;
        this.oz = connection.z;
        this.os = connection.size; // base size

        this.nx = this.nextConnection.x; // new
        this.ny = this.nextConnection.y;
        this.nz = this.nextConnection.z;
        this.ns = this.nextConnection.size;

        this.dx = this.nx - this.ox; // delta
        this.dy = this.ny - this.oy;
        this.dz = this.nz - this.oz;
        this.ds = this.ns - this.os;

        this.proportion = 0;
      }
    }
    Connection.prototype.setScreen = Data.prototype.setScreen = function () {

      var x = this.x,
        y = this.y,
        z = this.z;

      // apply rotation on X axis
      var Y = y;
      y = y * cosX - z * sinX;
      z = z * cosX + Y * sinX;

      // rot on Y
      var Z = z;
      z = z * cosY - x * sinY;
      x = x * cosY + Z * sinY;

      this.screen.z = z;

      // translate on Z
      z += opts.depth;

      this.screen.scale = opts.focalLength / z;
      this.screen.x = opts.vanishPoint.x + x * this.screen.scale;
      this.screen.y = opts.vanishPoint.y + y * this.screen.scale;

    }
    function squareDist(a, b) {

      var x = b.x - a.x,
        y = b.y - a.y,
        z = b.z - a.z;

      return x * x + y * y + z * z;
    }

    function anim() {

     window.requestAnimationFrame(anim);

      ctx.globalCompositeOperation = 'source-over';
      ctx.fillStyle = opts.repaintColor;
      ctx.fillRect(0, 0, w, h);

      ++tick;

      var rotX = tick * opts.rotVelX,
        rotY = tick * opts.rotVelY;

      cosX = Math.cos(rotX);
      sinX = Math.sin(rotX);
      cosY = Math.cos(rotY);
      sinY = Math.sin(rotY);

      if (data.length < connections.length * opts.dataToConnections) {
        var datum = new Data(connections[0]);
        data.push(datum);
        all.push(datum);
      }

      ctx.globalCompositeOperation = 'multiply';
      ctx.beginPath();
      ctx.lineWidth = opts.wireframeWidth;
      ctx.strokeStyle = opts.wireframeColor;
      all.map(function (item) { item.step(); });
      ctx.stroke();
      ctx.globalCompositeOperation = 'source-over';
      all.sort(function (a, b) { return b.screen.z - a.screen.z });
      all.map(function (item) { item.draw(); });

      /*ctx.beginPath();
      ctx.strokeStyle = 'red';
      ctx.arc( opts.vanishPoint.x, opts.vanishPoint.y, opts.range * opts.focalLength / opts.depth, 0, Tau );
      ctx.stroke();*/
    }

    window.addEventListener('resize', function () {

      opts.vanishPoint.x = (w = c.width = window.innerWidth) / 2;
      opts.vanishPoint.y = (h = c.height = window.innerHeight) / 2;
      ctx.fillRect(0, 0, w, h);
    });
    window.addEventListener('click', init);
















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
