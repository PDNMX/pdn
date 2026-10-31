import { useState, useEffect } from 'react'
import { withStyles } from 'tss-react/mui';
import { Paper, Typography, Grid } from '@mui/material'
import CountUp from 'react-countup'

const ligaDatosNumeralia = process.env.REACT_APP_NUMERALIA

const styles = theme => ({
  container: {
    padding: '5% 3%',
    backgroundColor: '#713972',
    minHeight: '320px'
  },
  Foot: {
    backgroundColor: '#5b2f52'
  },
  containerFoot: {
    backgroundColor: '#f2f0f2'
  },
  headingText: {
    color: theme.palette.secondary.contrastText,
    fontWeight: 500,
    fontSize: '45px'
  },
  text: {
    fontSize: '18px',
    fontWeight: 400,
    color: theme.palette.secondary.contrastText
  },
  textFoot: {
    fontSize: '15px',
    color: theme.palette.secondary.contrastText,
    margin: '5px'
  }

});

const Numeralia = props => {
  const { classes } = props

  const [isLoading, setIsLoading] = useState(true)
  const [numeralia, setNumeralia] = useState(null)
  const [error, setError] = useState(null)
  async function fetchData () {
    if (!ligaDatosNumeralia) {
      setError('No pudimos obtener la información en este momento')
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch(ligaDatosNumeralia)
      if (response.ok) {
        const data = await response.json()
        if (!Array.isArray(data?.values) || data.values.length < 6) {
          throw new Error('Respuesta de numeralia inválida')
        }
        setNumeralia(data)
        setError(null)
      } else {
        setError('Hubo un error al obtener la información')
      }
    } catch {
      setError('No pudimos hacer la solicitud para obtener la información')
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    if (isLoading) {
      fetchData()
    }
  }, [isLoading])
  if (isLoading) {
    return (
      <>
        <Paper>
          <Grid
            container
            direction='row'
            className={classes.container}
            sx={{
              alignItems: 'flex-start',
              justifyContent: 'center'
            }}>
            <Grid
              sx={{ textAlign: 'center' }}
              size={{
                md: 12,
                sm: 12,
                xs: 12
              }}>
              <Typography className={classes.headingText} sx={{
                marginBottom: "16px"
              }}>
                Cargando Información...
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </>
    );
  }
  if (error) {
    return (
      <>
        <Paper className={classes.bg}>
          <Grid
            container
            direction='row'
            className={classes.container}
            sx={{
              alignItems: 'flex-start',
              justifyContent: 'center'
            }}>
            <Grid
              sx={{ textAlign: 'center' }}
              size={{
                md: 12,
                sm: 12,
                xs: 12
              }}>
              <Typography className={classes.headingText} sx={{
                marginBottom: "16px"
              }}>
                {error}
              </Typography>
            </Grid>
          </Grid>
        </Paper>
      </>
    );
  }

  return (
    <>
      <Paper className={classes.bg}>
        <Grid
          container
          direction='row'
          className={classes.container}
          sx={{
            alignItems: 'flex-start',
            justifyContent: 'center'
          }}>
          <Grid
            sx={{ textAlign: 'center' }}
            size={{
              xl: 2,
              md: 4,
              sm: 6,
              xs: 12
            }}>
            <Typography className={classes.headingText} sx={{
              marginBottom: "16px"
            }}>
              <CountUp separator=',' end={numeralia.values[0][1]} duration={3} delay={0}>
                {({ countUpRef }) => (
                  <span ref={countUpRef} />
                )}
              </CountUp>
            </Typography>
            <Typography className={classes.text} sx={{
              marginBottom: "16px"
            }}>
              Entes conectados
            </Typography>
          </Grid>
          <Grid
            sx={{ textAlign: 'center' }}
            size={{
              xl: 2,
              md: 4,
              sm: 6,
              xs: 12
            }}>
            <Typography className={classes.headingText} sx={{
              marginBottom: "16px"
            }}>
              <CountUp separator=',' end={(numeralia.values[1][1])} duration={3} delay={0}>
                {({ countUpRef }) => (
                  <span ref={countUpRef} />
                )}
              </CountUp>
            </Typography>
            <Typography className={classes.text} sx={{
              marginBottom: "16px"
            }}>
              Declaraciones
            </Typography>
          </Grid>
          <Grid
            sx={{ textAlign: 'center' }}
            size={{
              xl: 2,
              md: 4,
              sm: 6,
              xs: 12
            }}>
            <Typography className={classes.headingText} sx={{
              marginBottom: "16px"
            }}>
              <CountUp separator=',' end={numeralia.values[2][1]} duration={3} delay={0}>
                {({ countUpRef }) => (
                  <span ref={countUpRef} />
                )}
              </CountUp>
            </Typography>
            <Typography className={classes.text} sx={{
              marginBottom: "16px"
            }}>
              Procedimientos de contratación
            </Typography>
          </Grid>
          <Grid
            sx={{ textAlign: 'center' }}
            size={{
              xl: 2,
              md: 4,
              sm: 6,
              xs: 12
            }}>
            <Typography className={classes.headingText} sx={{
              marginBottom: "16px"
            }}>
              <CountUp separator=',' end={numeralia.values[3][1]} duration={3} delay={0}>
                {({ countUpRef }) => (
                  <span ref={countUpRef} />
                )}
              </CountUp>
            </Typography>
            <Typography className={classes.text} sx={{
              marginBottom: "16px"
            }}>
              Sanciones
            </Typography>
          </Grid>
          <Grid
            sx={{ textAlign: 'center' }}
            size={{
              xl: 2,
              md: 4,
              sm: 6,
              xs: 12
            }}>
            <Typography className={classes.headingText} sx={{
              marginBottom: "16px"
            }}>
              <CountUp separator=',' end={numeralia.values[4][1]} duration={3} delay={0}>
                {({ countUpRef }) => (
                  <span ref={countUpRef} />
                )}
              </CountUp>
            </Typography>
            <Typography className={classes.text} sx={{
              marginBottom: "16px"
            }}>
              Herramientas en el MDA
            </Typography>
          </Grid>
        </Grid>
      </Paper>
      <Grid
        container
        direction='row'
        className={classes.containerFoot}
        sx={{
          alignItems: 'flex-end',
          justifyContent: 'flex-end'
        }}>
        <Grid
          sx={{ textAlign: 'right' }}
          className={classes.Foot}
          size={{
            md: 10,
            sm: 10,
            xs: 12
          }}>
          <Typography className={classes.textFoot} sx={{
            marginBottom: "16px"
          }}>
            Estadística actualizada al {numeralia.values[5][1]}
          </Typography>
        </Grid>
      </Grid>
    </>
  );
}
export default withStyles(Numeralia, styles);
