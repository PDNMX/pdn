import { Typography, Grid, Paper, Box } from '@mui/material';
import withStyles from '@mui/styles/withStyles';
import Link from '@mui/material/Link';
import HeaderV2 from '../HomeV2/HeaderV2';
import pdnRoutes from '../../routes';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  section: {
    maxWidth: '1200px',
    paddingRight: theme.spacing(2),
    paddingLeft: theme.spacing(2),
    paddingBottom: 90,
    paddingTop: 90,
  },
  ul: {
    listStyle: 'none',
    paddingLeft: '20px',
  },
  li: {
    '&:before': {
      content: '"•"',
      color: '#7A3D71',
      fontWeight: 'bold',
      display: 'inline-block',
      width: '1em',
      marginLeft: '-1em',
    },
  },
  title: {
    color: theme.palette.text.secondary,
  },
  subTitle: {
    fontWeight: 'bolder',
    color: theme.palette.text.primary,
  },
  paper: {
    backgroundColor: theme.palette.background.opaque,
    padding: theme.spacing(2),
    color: theme.palette.primary.contrastText,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: theme.palette.background.border,
    borderRadius: '10px 10px 10px 10px',
    display: 'flex',
    justifyContent: 'center',
  },
  box: {
    maxWidth: '900px',
    paddingTop: '50px',
    paddingBottom: '50px',
  },
});

const Terminos = props => {
  const { classes } = props;
  const section = pdnRoutes.find(route => route.path === '/terminos');

  return (
    <div className={classes.root}>
      <HeaderV2 section={section} />
      <Grid container spacing={0} justifyContent="center">
        <Grid item xs={12} className={classes.section}>
          <Paper className={classes.paper} elevation={15}>
            <Box className={classes.box}>
              <Typography variant="h5" paragraph>
                TÉRMINOS Y CONDICIONES DE USO DE LA PLATAFORMA DIGITAL NACIONAL
              </Typography>

              <Typography paragraph>
                La Plataforma Digital Nacional (PDN) se desarrolla de conformidad con la normatividad vigente:
              </Typography>

              <ul className={classes.ul}>
                <li className={classes.li}>
                  <Typography display="inline">
                    <Link
                      target="_blank"
                      href="https://www.diputados.gob.mx/LeyesBiblio/ref/lgsna.htm"
                      rel="noreferrer"
                    >
                      Ley General del Sistema Nacional Anticorrupción
                    </Link>
                    , publicada en el Diario Oficial de la Federación el 18 de julio del 2016.
                  </Typography>
                </li>
                <li className={classes.li}>
                  <Typography display="inline">
                    <Link target="_blank" href="https://www.diputados.gob.mx/LeyesBiblio/ref/lgra.htm" rel="noreferrer">
                      Ley General de Responsabilidades Administrativas
                    </Link>
                    , publicada en el Diario Oficial de la Federación el 12 de abril del 2016.
                  </Typography>
                </li>
                <li className={classes.li}>
                  <Typography display="inline">
                    <Link
                      target="_blank"
                      href="https://www.dof.gob.mx/nota_detalle.php?codigo=5541802&fecha=23/10/2018"
                      rel="noreferrer"
                    >
                      Bases para el Funcionamiento de la Plataforma Digital Nacional
                    </Link>
                    , publicadas en el Diario Oficial de la Federación el 23 de octubre del 2018.
                  </Typography>
                </li>
                <li className={classes.li}>
                  <Typography display="inline">
                    <Link target="_blank" href="https://www.dof.gob.mx/nota_detalle.php?codigo=5678528&fecha=01/02/2023#gsc.tab=0" rel="noreferrer">
                      Estatuto Orgánico de la Secretaría Ejecutiva del Sistema Nacional Anticorrupción
                    </Link>
                    , publicado en el
                    Diario Oficial de la Federación el 01 de febrero de 2023.
                  </Typography>
                </li>
                <li className={classes.li}>
                  <Typography display="inline">
                    <Link target="_blank" href="https://www.dof.gob.mx/nota_detalle.php?codigo=5718117&fecha=27/02/2024#gsc.tab=0" rel="noreferrer">
                      Lineamientos para la incorporación de la información al sistema de evolución patrimonial, de
                      declaración de intereses y constancia de presentación de declaración fiscal de la Plataforma
                      Digital Nacional
                    </Link>
                    , publicados en el Diario Oficial de la Federación el 27 de febrero de 2024
                      (Lineamientos S1).
                  </Typography>
                </li>
                <li className={classes.li}>
                  <Typography display="inline">
                    <Link target="_blank" href="https://www.dof.gob.mx/nota_detalle.php?codigo=5729579&fecha=05/06/2024#gsc.tab=0" rel="noreferrer">
                      Declaratoria de inicio de funciones del Sistema de evolución patrimonial, de declaración de
                      intereses y constancia de presentación de declaración fiscal de la Plataforma Digital Nacional
                    </Link>
                    ,
                      publicada en el Diario Oficial de la Federación el 5 de junio de 2024.
                  </Typography>
                </li>
              </ul>

              <Typography paragraph>
                La PDN está conceptualizada como una Plataforma de interoperabilidad, que integrará y conectará los
                diversos sistemas<sup>i</sup> que posean datos e información para las autoridades encargadas en la lucha
                contra la corrupción. Por lo anterior, los datos e información presentados en la PDN{' '}
                <b>
                  <u>no son generados ni actualizados por</u>
                </b>{' '}
                la SESNA, de acuerdo con la normatividad vigente.
              </Typography>

              <Typography paragraph>
                Para el manejo de los datos, la Plataforma seguirá las disposiciones aplicables en materia de
                transparencia, acceso a la información, datos abiertos y protección de datos personales.
              </Typography>

              <Typography variant="h6" className={classes.subTitle}>
                Sobre el uso de la dirección WEB plataformadigitalnacional.org, se señala lo siguiente:
              </Typography>

              <ul className={classes.ul}>
                <li className={classes.li}>
                  <Typography display="inline">
                    Los enlaces de sitios web presentes en la PDN son proporcionados sólo con fines informativos, por lo
                    que los contenidos o recursos son ajenos a la PDN y no serán responsabilidad de esta.
                  </Typography>
                </li>
                <li className={classes.li}>
                  <Typography display="inline">
                    Este sitio contiene medidas de seguridad para proteger la información de cualquier alteración
                    realizada por terceros.
                  </Typography>
                </li>
                <li className={classes.li}>
                  <Typography display="inline">
                    La SESNA se deslinda de cualquier responsabilidad, perjuicio o daño que pueda generar el usuario por
                    el uso inadecuado del portal o la información contenida en plataformadigitalnacional.org
                  </Typography>
                </li>
                <li className={classes.li}>
                  <Typography display="inline">
                    Se exime a la SESNA de la responsabilidad por los daños que el uso del sitio le pudieran ocasionar
                    en forma incidental o consecuente con su equipo, información, patrimonio o persona, así como de la
                    responsabilidad por la alteración o manipulación de los datos una vez publicados en él.
                  </Typography>
                </li>
              </ul>

              <Typography variant="h6" className={classes.subTitle}>
                De acuerdo con la normatividad antes señalada, se tendrán las siguientes obligaciones y
                responsabilidades:
              </Typography>

              <Typography variant="subtitle1" className={classes.subTitle}>
                I. Del usuario:
              </Typography>

              <ul className={classes.ul}>
                <li className={classes.li}>
                  <Typography display="inline">
                    No dañar, inutilizar o deteriorar los sistemas informáticos que puedan ser incorporados en este
                    sitio, incluido el portal plataformadigitalnacional.org.
                  </Typography>
                </li>
                <li className={classes.li}>
                  <Typography display="inline">
                    No modificar los sistemas informáticos que puedan ser incorporados a la PDN.
                  </Typography>
                </li>
                <li className={classes.li}>
                  <Typography display="inline">
                    No utilizar versiones de sistemas modificados con el fin de obtener acceso no autorizado a cualquier
                    sistema de información, contenido y/o servicios del portal.
                  </Typography>
                </li>
                <li className={classes.li}>
                  <Typography display="inline">
                    No interferir ni interrumpir el acceso, funcionalidad y utilización del portal, servidores o redes
                    conectadas al mismo.
                  </Typography>
                </li>
                <li className={classes.li}>
                  <Typography display="inline">
                    Se obliga a hacer buen uso del sitio, respetando la Ley General del Sistema Nacional Anticorrupción,
                    la Ley Federal de Derechos de Autor y demás normatividad aplicable.
                  </Typography>
                </li>
                <li className={classes.li}>
                  <Typography display="inline">
                    Debe contar con un equipo que cumpla con las características mínimas necesarias para navegar en el
                    sitio. Se recomienda la navegación con las últimas versiones de los navegadores Google Chrome,
                    Mozilla Firefox y Safari para obtener la mejor experiencia.
                  </Typography>
                </li>
                <li className={classes.li}>
                  <Typography display="inline">
                    Exime a la SESNA de toda responsabilidad por los daños que el uso del sitio le pudiera ocasionar en
                    forma incidental o consecuente con su equipo, información, patrimonio o persona, así como ninguna
                    responsabilidad por la alteración o manipulación de los datos una vez publicados en él.
                  </Typography>
                </li>
                <li className={classes.li}>
                  <Typography display="inline">
                    Acepta y se obliga a utilizar el sitio para fines lícitos y con apego a las disposiciones legales
                    aplicables.
                  </Typography>
                </li>
                <li className={classes.li}>
                  <Typography display="inline">
                    Usar adecuadamente la información conforme a los objetivos y normatividad del Sistema Nacional
                    Anticorrupción y la legislación aplicable.
                  </Typography>
                </li>
                <li className={classes.li}>
                  <Typography display="inline">
                    El destino y tratamiento de los datos que se obtengan de la plataforma, son responsabilidad
                    exclusivamente del usuario, y de ninguna manera señalarán el posicionamiento de ningún Ente Público
                    <sup>ii</sup>, salvo que expresamente se refiera.
                  </Typography>
                </li>
              </ul>

              <Typography variant="subtitle1" className={classes.subTitle}>
                II. De los encargados<sup>iii</sup>, concentradores<sup>iv</sup> y proveedores<sup>v</sup>
              </Typography>

              <ul className={classes.ul}>
                <li className={classes.li}>
                  <Typography display="inline">Resguardar la información que le sea suministrada.</Typography>
                </li>
                <li className={classes.li}>
                  <Typography display="inline">
                    Implementar criterios y mecanismos de seguridad de la información.
                  </Typography>
                </li>
                <li className={classes.li}>
                  <Typography display="inline">Garantizar la protección de los datos personales.</Typography>
                </li>
                <li className={classes.li}>
                  <Typography display="inline">
                    Administrar, en el ámbito de su competencia, la información que se incorporará a la PDN.
                  </Typography>
                </li>
                <li className={classes.li}>
                  <Typography display="inline">
                    Mantener actualizada la información, de conformidad con la normatividad aplicable.
                  </Typography>
                </li>
                <li className={classes.li}>
                  <Typography display="inline">
                    Mantener disponible la información, con excepción de los períodos para los servicios de
                    mantenimiento de sus sistemas informáticos.
                  </Typography>
                </li>
                <li className={classes.li}>
                  <Typography display="inline">
                    Cumplir con la normatividad, especificaciones técnicas y protocolos que señale la SESNA.
                  </Typography>
                </li>
                <li className={classes.li}>
                  <Typography display="inline">
                    Los encargados, según corresponda, tendrán la obligación de actualizar y administrar los subsistemas
                    <sup>vi</sup>, y de cumplir la normatividad que corresponda para garantizar la estandarización,
                    integridad e interoperabilidad de la información de los sistemas de la Plataforma.
                  </Typography>
                </li>
                <li className={classes.li}>
                  <Typography display="inline">
                    Los concentradores tendrán la obligación de agrupar la información proporcionada por los proveedores
                    en los conjuntos de datos, para que sea ingresada a los sistemas o subsistemas, según corresponda.
                  </Typography>
                </li>
                <li className={classes.li}>
                  <Typography display="inline">
                    Será obligación de los encargados y los concentradores vigilar la homologación, actualización y
                    disponibilidad de la información que sea transferida de los subsistemas y conjuntos de datos a los
                    sistemas, de conformidad con la normatividad aplicable, y verificar de manera permanente el correcto
                    funcionamiento de los subsistemas y conjuntos de datos, así como sus procesos de generación,
                    estandarización, actualización y distribución de información a los sistemas, de acuerdo con las
                    disposiciones emitidas por la SESNA, para asegurar el correcto funcionamiento de la Plataforma.
                  </Typography>
                </li>
                <li className={classes.li}>
                  <Typography display="inline">
                    Los proveedores de datos deberán proporcionar los datos e información, en tiempo y forma, de
                    conformidad con la legislación aplicable.
                  </Typography>
                </li>
              </ul>

              <Typography variant="subtitle1" className={classes.subTitle}>
                III. De las Secretarías Ejecutivas de los Sistemas Locales Anticorrupción;
              </Typography>

              <ul className={classes.ul}>
                <li className={classes.li}>
                  <Typography display="inline">
                    Solicitar, en el ámbito de su competencia, los datos de sus respectivos concentradores y encargados
                    para su incorporación a sus Plataformas o Sistemas estatales, y posteriormente interconectarse a la
                    PDN.
                  </Typography>
                </li>
                <li className={classes.li}>
                  <Typography display="inline">
                    Informar a sus concentradores que los datos se deberán integrar de conformidad con las
                    especificaciones técnicas.
                  </Typography>
                </li>
                <li className={classes.li}>
                  <Typography display="inline">
                    Disponer de los elementos técnicos y capacidades necesarias que permitan la continua actualización
                    de la información para su incorporación a la PDN.
                  </Typography>
                </li>
                <li className={classes.li}>
                  <Typography display="inline">
                    Coadyuvar con la SESNA en las acciones necesarias para la implementación de los sistemas.
                  </Typography>
                </li>
                <li className={classes.li}>
                  <Typography display="inline">
                    Mantener disponible la información, con excepción de los periodos para servicios de mantenimiento de
                    sus sistemas informáticos.
                  </Typography>
                </li>
              </ul>

              <Typography variant="subtitle1" className={classes.subTitle}>
                IV. De la SESNA:
              </Typography>

              <ul className={classes.ul}>
                <li className={classes.li}>
                  <Typography display="inline">Administrar la PDN.</Typography>
                </li>
                <li className={classes.li}>
                  <Typography display="inline">
                    Emitir los protocolos, estándares, reglamentos, especificaciones técnicas y cualquier normatividad
                    necesaria para la colaboración, provisión de datos y acciones para cumplir con las Bases, los cuales
                    serán obligatorios para todos los proveedores, concentradores y encargados a nivel federal, estatal
                    y municipal.
                  </Typography>
                </li>
                <li className={classes.li}>
                  <Typography display="inline">
                    Verificar de manera permanente el correcto funcionamiento de los componentes de la PDN, con la
                    finalidad de prevenir fallas y, en caso de diagnosticarlas, dar pronta atención a las mismas.
                  </Typography>
                </li>
                <li className={classes.li}>
                  <Typography display="inline">
                    En caso de que la Plataforma o alguno de sus sistemas presente una falla técnica, la SESNA deberá
                    hacer del conocimiento de los usuarios la magnitud de la falla y el tiempo de recuperación, para que
                    éstos estén en posibilidad de implementar las medidas necesarias para el cumplimiento de sus
                    respectivas obligaciones.
                  </Typography>
                </li>
                <li className={classes.li}>
                  <Typography display="inline">
                    En caso de que algún subsistema o conjunto de datos presente una falla técnica, el encargado o
                    concentrador correspondiente deberá informar a la SESNA sobre la magnitud de la falla y el tiempo de
                    recuperación, para que la SESNA esté en posibilidad de implementar las medidas necesarias para
                    cumplir con sus respectivas obligaciones en tiempo y forma.
                  </Typography>
                </li>
                <li className={classes.li}>
                  <Typography display="inline">
                    Informar a los integrantes del Comité Coordinador sobre el funcionamiento de la Plataforma,
                    recomendaciones para mejorarlo, y sobre las fallas que esta o cualquiera de sus componentes puedan
                    haber presentado, y las medidas que se tomarán para solucionarlas.
                  </Typography>
                </li>
                <li className={classes.li}>
                  <Typography display="inline">
                    La SESNA se coordinará con las Secretarías Ejecutivas de los Sistemas Locales Anticorrupción, con el
                    fin de determinar su participación en la construcción de los sistemas de la Plataforma y la forma de
                    interconexión que tendrán con cada uno de los sistemas a nivel local.
                  </Typography>
                </li>
                <li className={classes.li}>
                  <Typography display="inline">
                    Solicitar los datos a sus respectivos concentradores, encargados y a las Secretarías Ejecutivas de
                    los Sistemas Locales Anticorrupción para integrarlos a la PDN.
                  </Typography>
                </li>
                <li className={classes.li}>
                  <Typography display="inline">
                    Aprobar, conforme a las especificaciones técnicas, la integración, conexión con la PDN, así como su
                    respectiva baja.
                  </Typography>
                </li>
                <li className={classes.li}>
                  <Typography display="inline">
                    Mantener disponible la PDN, con excepción de los periodos para los servicios de mantenimiento.
                  </Typography>
                </li>
              </ul>

              <Typography variant="h6" className={classes.subTitle}>
                CONDICIONES DE USO DE LOS DATOS PÚBLICOS DE LA PLATAFORMA DIGITAL NACIONAL
              </Typography>

              <Typography paragraph>
                El tratamiento de los datos personales contenidos en la PDN podrá ser consultado en el Aviso de
                Privacidad de cada uno de los sistemas.
              </Typography>

              <Typography paragraph>
                Para citar a la Plataforma Digital Nacional como fuente de los datos se debe mencionar:
              </Typography>

              <ul className={classes.ul}>
                <li className={classes.li}>
                  <Typography display="inline">
                    Nombre del sistema o sección de la PDN en el que se consultaron los datos;
                  </Typography>
                </li>
                <li className={classes.li}>
                  <Typography display="inline">Plataforma Digital Nacional;</Typography>
                </li>
                <li className={classes.li}>
                  <Typography display="inline">Fecha de consulta;</Typography>
                </li>
                <li className={classes.li}>
                  <Typography display="inline">
                    Liga de internet para acceder a los datos a través de la PDN.
                  </Typography>
                </li>
              </ul>

              <Typography paragraph>
                Ejemplo: Sistema de evolución patrimonial, de declaración de intereses y constancia de presentación de
                declaración fiscal; Plataforma Digital Nacional. Recuperado el 25 de junio de 2024, mediante el enlace:{' '}
                <Link href="https://www.plataformadigitalnacional.org/declaraciones" target="_blank" rel="noreferrer">
                  https://www.plataformadigitalnacional.org/declaraciones
                </Link>
              </Typography>

              <Typography variant="h6" className={classes.subTitle}>
                Queda prohibido:
              </Typography>

              <Typography paragraph>
                Utilizar la información con el objeto de engañar o confundir a la población alterando el sentido
                original de la información y su veracidad.
              </Typography>

              <Typography paragraph>
                Aparentar que el uso que se haga de los datos representa una postura oficial de algún Ente Público del
                Estado Mexicano o que el mismo está avalado por la fuente de origen.
              </Typography>

              <Typography variant="h6" className={classes.subTitle}>
                Propiedad intelectual:
              </Typography>

              <Typography paragraph>
                La información del portal plataformadigitalnacional.org es pública a menos que se indique lo contrario,
                en cuyo caso antes de reproducirla, se deberá observar si tiene derechos reservados y respetarlos en
                términos de las normas relativas a derechos de autor y propiedad industrial.
              </Typography>

              <Typography variant="h6" className={classes.subTitle}>
                Actualización de los términos y condiciones:
              </Typography>

              <Typography paragraph>
                La SESNA podrá modificar los presentes Términos y Condiciones en cualquier momento con el fin de mejorar
                la experiencia en la utilización de la PDN. Por lo anterior, sugerimos revisar constantemente el portal.
              </Typography>

              <Typography paragraph>
                El uso del portal plataformadigitalnacional.org o de cualquiera de sus componentes, implica la
                aceptación expresa de los presentes &quot;Términos y Condiciones&quot;.
              </Typography>

              <hr />

              <Typography variant="body2">
                <sup>i</sup> Sistemas: Los establecidos, de manera enunciativa más no limitativa, de conformidad con lo
                previsto en el artículo 49 de la Ley General del Sistema Nacional Anticorrupción, los cuales se
                alimentan de la información de los subsistemas, conjuntos de datos o proveedores, y que en su conjunto
                conforman la Plataforma Digital Nacional.
              </Typography>

              <Typography variant="body2">
                <sup>ii</sup> Ente Público: En términos de lo dispuesto en el artículo 3, fracción X de la Ley General
                de Responsabilidades Administrativas.
              </Typography>

              <Typography variant="body2">
                <sup>iii</sup> Encargados: Toda persona o ente que recibe, ordena o resguarda datos e información en los
                subsistemas para su integración a los sistemas.
              </Typography>

              <Typography variant="body2">
                <sup>iv</sup> Concentradores: Toda persona o ente que recibe, ordena o resguarda datos e información en
                los conjuntos de datos para su integración a los sistemas.
              </Typography>

              <Typography variant="body2">
                <sup>v</sup> Proveedores: Toda persona o ente que suministra datos o información que será integrada a
                los sistemas.
              </Typography>

              <Typography variant="body2">
                <sup>vi</sup> Subsistemas: Conjuntos de datos e información concentrados, resguardados, administrados y
                actualizados por los encargados que alimentan a los sistemas, y que contendrán la información que
                establezca la SESNA para ser interconectada e integrada en los sistemas.
              </Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default withStyles(styles)(Terminos);
