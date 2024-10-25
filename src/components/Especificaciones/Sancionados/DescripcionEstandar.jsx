import { Typography } from "@mui/material";
import ButtonPDN from "../../Compartidos/ButtonPDN";
import withStyles from "@mui/styles/withStyles";
import { Link } from "@mui/material";

const styles = (theme) => ({
  root: {
    flexGrow: 1,
  },
  button: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginBottom: theme.spacing(2),
  },
  text: {
    color: theme.palette.text.primary,
    textAlign: "justify",
  },
  title: {
    color: theme.palette.primary.main,
  },
  list: {
    marginLeft: theme.spacing(3),
    marginBottom: theme.spacing(2),
    color: theme.palette.text.secondary,
    counterReset: "item",
    textAlign: "justify",
    "& li": {
      display: "block",
      marginBottom: theme.spacing(1),
      fontSize: "0.95rem",
      fontWeight: "bold",
      "&:before": {
        content: 'counter(item, lower-roman) ". "',
        counterIncrement: "item",
        fontWeight: "bold",
        marginRight: theme.spacing(1),
      },
    },
  },
  link: {
    textDecoration: "none",
    color: theme.palette.text.linkColor,
    "&:hover": {
      textDecoration: "underline",
    },
  },
});

const DescripcionEstandar = (props) => {
  const { classes } = props;

  const formatos = [
    {
      titulo:
        "Formato para sanciones firmes impuestas a personas servidoras públicas por faltas administrativas graves",
      url:
        "https://drive.google.com/file/d/1e2OxASnG-Lac9Irj4IiM5I9wqk-XGq_a/view?usp=drive_link",
    },
    {
      titulo:
        "Formato para sanciones firmes impuestas a particulares (personas físicas) por faltas administrativas graves",
      url:
        "https://drive.google.com/file/d/1RYiue5qRb_oIp3wQoYsE9eHa5yNiLzFK/view?usp=drive_link",
    },
    {
      titulo:
        "Formato para sanciones firmes impuestas a particulares (personas morales) por faltas administrativas graves",
      url:
        "https://drive.google.com/file/d/1COs9p68_sEkeO57lMJoCFDHfUDxWHGcc/view?usp=drive_link",
    },
    {
      titulo:
        "Formato para sanciones firmes impuestas a personas servidoras públicas por faltas administrativas no graves",
      url:
        "https://drive.google.com/file/d/1nkMZblc9xg9kfl0C9ObaIfSEYvPs_r5h/view?usp=drive_link",
    },
    {
      titulo:
        "Normas e instructivo para el registro de la información contenida en los formatos anteriores",
      url:
        "https://drive.google.com/file/d/1SLQYFEjPjRgf8Xfkyky-dgjJZp450NN-/view?usp=drive_link",
    },
  ];

  return (
    <div className={classes.root}>
      <Typography paragraph className={classes.text}>
        Esta guía tiene como finalidad describir el Estándar para la
        Interoperabilidad de Datos de Servidores Públicos y Particulares
        Sancionados, desarrollado por la Secretaría Ejecutiva del Sistema
        Nacional Anticorrupción (SESNA). Se presenta el modelo de
        interoperabilidad que deberán adoptar los diversos sistemas de registro
        de Servidores Públicos y Particulares Sancionados que proveerán
        información a la Plataforma Digital Nacional (PDN) y se proporcionan
        recomendaciones para la implementación del estándar por parte de las
        Instituciones.
      </Typography>

      <Typography variant="h5" className={classes.title} paragraph>
        Antecedentes
      </Typography>

      <Typography paragraph className={classes.text}>
        El 23 de octubre de 2018 fueron publicadas en el Diario Oficial de la
        Federación (DOF) las Bases para el funcionamiento de la Plataforma
        Digital Nacional (PDN). El Art. 6 establece que para el correcto
        funcionamiento de cada uno de los sistemas, la SESNA emitirá los
        protocolos, estándares, reglamentos, especificaciones técnicas y
        cualquier normativa necesaria para la colaboración, provisión de datos y
        acciones para cumplir con las Bases, los cuales serán obligatorios para
        todos los proveedores, concentradores y encargados a nivel federal,
        estatal y municipal.
      </Typography>

      <Typography paragraph className={classes.text}>
        El Comité Coordinador del Sistema Nacional Anticorrupción, en su Tercera
        Sesión Ordinaria celebrada el 16 de agosto de 2024, aprobó el{" "}
        <em>
          "Acuerdo por el que el Comité Coordinador del Sistema Nacional
          Anticorrupción emite los formatos que indican los datos que se
          inscribirán en el Sistema nacional de servidores públicos y
          particulares sancionados de la Plataforma Digital Nacional, por la
          comisión de faltas administrativas graves, faltas de particulares y
          faltas administrativas no graves, y expide las normas e instructivo
          para el registro de la información contenida en dichos formatos"
        </em>
        .
      </Typography>

      <Typography paragraph className={classes.text}>
        Mediante este acuerdo se emitieron los siguientes formatos:
      </Typography>

      <ol className={classes.list}>
        {formatos.map((formato, index) => (
          <li key={index}>
            <Link
              href={formato.url}
              target="_blank"
              rel="noopener noreferrer"
              className={classes.link}
            >
              {formato.titulo}
            </Link>
          </li>
        ))}
      </ol>

      <Typography paragraph className={classes.text}>
        Estos formatos se utilizarán para inscribir los datos en el Sistema
        nacional de Servidores públicos y particulares sancionados de la
        Plataforma Digital Nacional, de acuerdo con la Ley General de
        Responsabilidades Administrativas.
      </Typography>

      <Typography variant="h5" className={classes.title} paragraph>
        Introducción
      </Typography>

      <Typography paragraph className={classes.text}>
        En la actualidad, la información de los servidores públicos y
        particulares sancionados de los diferentes niveles de gobierno se
        encuentra contenida en diversos formatos, bases de datos y sistemas de
        información; cada uno de ellos con particularidades tecnológicas y
        reglas de negocio distintas, dificultando la integración y la
        interoperabilidad de los datos. El Estándar para la Interoperabilidad de
        Datos de Servidores Públicos y Particulares Sancionados surge a partir
        de la necesidad de distribuir, comparar y analizar la información de una
        manera uniforme e interoperable.
      </Typography>

      <Typography paragraph className={classes.text}>
        Conforme a lo anterior, la SESNA ha conceptualizado a la Plataforma
        Digital Nacional como una herramienta que permitirá la consulta de
        información de las diferentes instituciones de los tres niveles de
        gobierno en un solo punto. En ese sentido, resulta necesario dotar a la
        PDN de mecanismos que le permitan interconectarse con los diversos
        sistemas de gobierno para consultar la información que resulte
        necesaria, sin importar la tecnología con la que dichos sistemas fueron
        desarrollados (i.e., lenguajes de programación, bases de datos, etc.).
      </Typography>

      <Typography paragraph className={classes.text}>
        La PDN logrará la interoperabilidad técnica con los diversos sistemas
        que la integrarán a través de la creación de estándares de datos y
        mediante el uso de Interfaces de Programación de Aplicaciones o APIs
        (por sus siglas en Inglés). Los estándares de datos permitirán homologar
        la manera en que la información se debe representar para su entrega a la
        PDN, mientras que las APIs serán el mecanismo que permitirá la
        comunicación entre sistemas a través de Internet. Las APIs son
        ampliamente usadas para el desarrollo de aplicaciones a gran escala. El
        uso de APIs permitirá que las instituciones conserven el control de sus
        datos, gestionando el acceso a los mismos mediante reglas y perfiles de
        usuario.
      </Typography>

      <Typography paragraph className={classes.text}>
        La SESNA ha planeado el desarrollo de la PDN mediante el uso APIs Web
        con arquitectura REST (REpresentational State Transfer). Dicha
        tecnología es ampliamente usada en la industria del software para el
        desarrollo de aplicaciones web, y en la actualidad, existe gran
        diversidad de herramientas de código abierto que permiten la
        implementación de sistemas basados en APIs REST de manera rápida y a un
        bajo costo.
      </Typography>

      <Typography variant="h5" className={classes.title} id="oas" paragraph>
        Open API Specification
      </Typography>

      <Typography paragraph className={classes.text}>
        El Estándar para la Interoperabilidad de Datos de Servidores Públicos y
        Particulares Sancionados está basado en el formato conocido como Open
        API Specification (OAS), el cual es un formato de especificación que
        permite describir de manera precisa las características con las que
        deberán contar las APIs que integrarán a la PDN. El OAS cuenta con
        capacidades para describir los recursos, operaciones, parámetros y
        estructuras de datos con las que deberán contar las APIs, permitiendo su
        implementación con independencia tecnológica, es decir, las
        instituciones podrán emplear las herramientas tecnológicas de su
        elección (e.g., lenguajes de programación, bases de datos, etc.) siempre
        que se sigan las especificaciones de manera correcta.
      </Typography>

      <Typography className={classes.text} paragraph>
        <ButtonPDN
          target="_blank"
          href="https://github.com/OAI/OpenAPI-Specification"
        >
          Más información
        </ButtonPDN>
      </Typography>

      <Typography variant="h5" className={classes.title} id="jwt" paragraph>
        Autenticación JWT
      </Typography>

      <Typography paragraph className={classes.text}>
        El acceso a las APIs que se integrarán a la PDN se gestionará a través
        de Static JWT (JSON Web Tokens), un mecanismo de autenticación simple y
        seguro que utiliza tokens estáticos predefinidos. Este método es ideal
        para integraciones de sistema a sistema donde se requiere una
        autenticación persistente y confiable.
      </Typography>

      <Typography paragraph className={classes.text}>
        Todas las solicitudes a la API deben realizarse a través de HTTPS para
        garantizar la seguridad en la transmisión de datos. A diferencia de
        otros métodos de autenticación, el Static JWT no requiere renovación de
        tokens ni manejo de expiración, lo que lo hace ideal para integraciones
        automatizadas y de larga duración.
      </Typography>

      <Typography className={classes.text} paragraph>
        <ButtonPDN target="_blank" href="https://jwt.io/introduction">
          Más información sobre JWT
        </ButtonPDN>
        {"  "}
        <ButtonPDN
          target="_blank"
          href="https://docs.directus.io/reference/authentication.html#static-tokens"
        >
          Guía de autenticación
        </ButtonPDN>
      </Typography>
    </div>
  );
};

export default withStyles(styles)(DescripcionEstandar);
