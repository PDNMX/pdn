import React from 'react'
import { Grid, Typography, TextField, Radio, FormControlLabel, FormControl, MenuItem, Button, FormLabel, RadioGroup, Checkbox, IconButton } from '@mui/material'

import { SelectElement } from './utils'

import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import CampaignIcon from '@mui/icons-material/Campaign'
import CloseIcon from '@mui/icons-material/Close'

import makeStyles from '@mui/styles/makeStyles'
import Ordenamiento from './Ordenamiento'
import style from '../style'
import { withStyles } from '@mui/styles'
import ReactGA from 'react-ga4'
import ButtonPDN from '../Compartidos/ButtonPDN'
const useStyles = makeStyles(style)

const CustomTypography = withStyles(theme => ({
  root: {
    color: theme.palette.text.primary
  },
  background: {
    backgroundColor: theme.palette.background.noSelect
  }
}))(Typography)

const SURVEY_URL = 'https://www.google.com'
const SURVEY_DISMISS_KEY = 's1_survey_banner_hidden'

const FormSearch = ({ query, handleInputChange, catEscolaridadNivel, catFormaAdquisicion, catEntidadesFederativas, catMunicipios, btnSearch, handlerFind, cleanForm, handleOrdenamiento, ordenamiento }) => {
  const classes = useStyles()
  const {
    nombres,
    primerApellido,
    segundoApellido,
    escolaridadNivel,
    nivelOrdenGobierno,
    nombreEntePublico,
    entidadFederativa,
    municipioAlcaldia,
    empleoCargoComision,
    nivelEmpleoCargoComision,
    superficieConstruccionMin,
    superficieConstruccionMax,
    superficieTerrenoMin,
    superficieTerrenoMax,
    valorAdquisicionMin,
    valorAdquisicionMax,
    totalIngresosNetosMin,
    totalIngresosNetosMax,
    formaAdquisicion
  } = query

  const [checked, setChecked] = React.useState(false)
  const [showSurveyBanner, setShowSurveyBanner] = React.useState(false)
  const [disableSurveyBanner, setDisableSurveyBanner] = React.useState(false)

  React.useEffect(() => {
    if (!SURVEY_URL) {
      return
    }

    try {
      const isHidden = window.localStorage.getItem(SURVEY_DISMISS_KEY) === '1'
      setShowSurveyBanner(!isHidden)
    } catch {
      setShowSurveyBanner(true)
    }
  }, [])

  const handleCloseSurveyBanner = () => {
    if (disableSurveyBanner) {
      try {
        window.localStorage.setItem(SURVEY_DISMISS_KEY, '1')
      } catch {
        // ignore localStorage failures
      }
    }
    setShowSurveyBanner(false)
    ReactGA.event({ category: 'encuesta-s1', action: 'close' })
  }

  return (
    <>
      <Grid container spacing={0} className={classes.infoBusqueda}>
        <Grid item xs={12}>
          <CustomTypography paragraph>
            <b>Aquí puedes consultar:</b>
          </CustomTypography>
          <ul className={classes.ul}>
            <li className={classes.li}>
              <CustomTypography color='textPrimary' display='inline'>
                Las declaraciones patrimoniales de las y los servidores públicos.
              </CustomTypography>
            </li>
            <li className={classes.li}>
              <CustomTypography color='textPrimary' display='inline'>
                La trayectoria laboral de las y los servidores públicos.
              </CustomTypography>
            </li>
            <li className={classes.li}>
              <CustomTypography color='textPrimary' display='inline'>
                Las declaraciones sobre posibles conflictos de interés de las personas servidoras públicas.
              </CustomTypography>
            </li>
          </ul>
        </Grid>
      </Grid>
      <Grid container spacing={0} className={classes.infoBusqueda}>
        {/* <Grid item xs={12}>
          <CustomTypography variant='h6'>
            <b>Busca una persona servidora pública</b>
          </CustomTypography>
        </Grid> */}
        {/* <Divider /> */}
        <Grid item xs={12}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={3}>
              <FormControl className={classes.formControl}>
                <TextField style={{ background: '#f2f0f2' }} id='mui-name' label='Nombre(s)' color='primary' value={nombres} name='nombres' onChange={handleInputChange} margin='normal' fullWidth />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl className={classes.formControl}>
                <TextField style={{ background: '#f2f0f2' }} id='primerApellido' name='primerApellido' value={primerApellido} onChange={handleInputChange} label='Primer Apellido' margin='normal' fullWidth />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <FormControl className={classes.formControl}>
                <TextField style={{ background: '#f2f0f2' }} id='segundoApellido' name='segundoApellido' value={segundoApellido} onChange={handleInputChange} label='Segundo Apellido' margin='normal' fullWidth />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={3}>
              <SelectElement formControl={classes.formControl} value={escolaridadNivel} handle={handleInputChange} data={catEscolaridadNivel} label='Nivel escolar' name='escolaridadNivel' />
            </Grid>

            <Grid item xs={12} md={4}>
              <FormControl className={classes.formControl}>
                <TextField style={{ background: '#f2f0f2' }} id='nombreEntePublico' label='Nombre del Ente Público' value={nombreEntePublico} name='nombreEntePublico' onChange={handleInputChange} margin='normal' fullWidth />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl className={classes.formControl}>
                <TextField style={{ background: '#f2f0f2' }} id='empleoCargoComision' label='Empleo, Cargo o Comisión' value={empleoCargoComision} name='empleoCargoComision' onChange={handleInputChange} margin='normal' fullWidth />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl className={classes.formControl}>
                <TextField style={{ background: '#f2f0f2' }} id='nivelEmpleoCargoComision' label='Nivel del Empleo, Cargo o Comisión' value={nivelEmpleoCargoComision} name='nivelEmpleoCargoComision' onChange={handleInputChange} margin='normal' fullWidth />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={4}>
              <FormControl className={classes.formControl}>
                <TextField style={{ background: '#f2f0f2' }} id='entidadFederativa' name='entidadFederativa' margin='normal' select label='Entidad Federativa' value={entidadFederativa} onChange={handleInputChange}>
                  {catEntidadesFederativas.map(q => {
                    return (
                      <MenuItem key={'entidadFederativa' + q.cve_agee} value={q.cve_agee}>
                        {q.nom_agee}
                      </MenuItem>
                    )
                  })}
                </TextField>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl className={classes.formControl}>
                <TextField style={{ background: '#f2f0f2' }} id='municipioAlcaldia' name='municipioAlcaldia' margin='normal' select label='Municipio/Alcaldía' value={municipioAlcaldia} onChange={handleInputChange}>
                  {catMunicipios.map(q => {
                    return (
                      <MenuItem key={'municipioAlcaldia' + q.cve_agem} value={q.cve_agem}>
                        {q.nom_agem}
                      </MenuItem>
                    )
                  })}
                </TextField>
              </FormControl>
            </Grid>
            {/* <Grid item xs={12} md={8}>
              <FormControl className={classes.formControl}>
                <InputLabel id="institucion">Institución</InputLabel>
                <Select
                  id="institucion"
                  name="institucion"
                  value={this.state.institucion}
                  onChange={handleInputChange}
                >
                  {this.state.providers.map((p, k) => {
                    return (
                      <MenuItem value={p.supplier_id} key={"pro-" + k}>
                        {p.supplier_name}
                      </MenuItem>
                    )
                  })}
                </Select>
              </FormControl>
            </Grid> */}
            <Grid item xs={12} md={4}>
              <SelectElement formControl={classes.formControl} value={formaAdquisicion} handle={handleInputChange} data={catFormaAdquisicion} label='Forma de adquisición' name='formaAdquisicion' />
            </Grid>

            <Grid item xs={12} md={3}>
              <FormControl component='fieldset' className={classes.formControl}>
                <FormLabel component='legend'>Superficie de construcción</FormLabel>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <TextField
                      style={{ background: '#f2f0f2' }}
                      id='superficieConstruccionMin'
                      placeholder='mínimo'
                      value={superficieConstruccionMin}
                      name='superficieConstruccionMin'
                      onChange={handleInputChange}
                      margin='normal'
                      fullWidth
                      InputLabelProps={{
                        className: classes.inputShrink,
                        shrink: true
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      style={{ background: '#f2f0f2' }}
                      id='superficieConstruccionMax'
                      placeholder='máximo'
                      value={superficieConstruccionMax}
                      name='superficieConstruccionMax'
                      onChange={handleInputChange}
                      margin='normal'
                      fullWidth
                      InputLabelProps={{
                        className: classes.inputShrink,
                        shrink: true
                      }}
                    />
                  </Grid>
                </Grid>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={3}>
              <FormControl component='fieldset' className={classes.formControl}>
                <FormLabel component='legend'>Superficie de terreno</FormLabel>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <TextField
                      style={{ background: '#f2f0f2' }}
                      id='superficieTerrenoMin'
                      placeholder='mínimo'
                      value={superficieTerrenoMin}
                      name='superficieTerrenoMin'
                      onChange={handleInputChange}
                      margin='normal'
                      fullWidth
                      InputLabelProps={{
                        className: classes.inputShrink,
                        shrink: true
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      style={{ background: '#f2f0f2' }}
                      id='superficieTerrenoMax'
                      placeholder='máximo'
                      value={superficieTerrenoMax}
                      name='superficieTerrenoMax'
                      onChange={handleInputChange}
                      margin='normal'
                      fullWidth
                      InputLabelProps={{
                        className: classes.inputShrink,
                        shrink: true
                      }}
                    />
                  </Grid>
                </Grid>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={3}>
              <FormControl component='fieldset' className={classes.formControl}>
                <FormLabel component='legend'>Valor de adquisición</FormLabel>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <TextField
                      style={{ background: '#f2f0f2' }}
                      id='valorAdquisicionMin'
                      placeholder='mínimo'
                      value={valorAdquisicionMin}
                      name='valorAdquisicionMin'
                      onChange={handleInputChange}
                      margin='normal'
                      fullWidth
                      InputLabelProps={{
                        className: classes.inputShrink,
                        shrink: true
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      style={{ background: '#f2f0f2' }}
                      id='valorAdquisicionMax'
                      placeholder='máximo'
                      value={valorAdquisicionMax}
                      name='valorAdquisicionMax'
                      onChange={handleInputChange}
                      margin='normal'
                      fullWidth
                      InputLabelProps={{
                        className: classes.inputShrink,
                        shrink: true
                      }}
                    />
                  </Grid>
                </Grid>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={3}>
              <FormControl component='fieldset' className={classes.formControl}>
                <FormLabel component='legend'>Total de Ingresos Netos</FormLabel>
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <TextField
                      style={{ background: '#f2f0f2' }}
                      id='totalIngresosNetosMin'
                      placeholder='mínimo'
                      value={totalIngresosNetosMin}
                      name='totalIngresosNetosMin'
                      onChange={handleInputChange}
                      margin='normal'
                      fullWidth
                      InputLabelProps={{
                        className: classes.inputShrink,
                        shrink: true
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      style={{ background: '#f2f0f2' }}
                      id='totalIngresosNetosMax'
                      placeholder='máximo'
                      value={totalIngresosNetosMax}
                      name='totalIngresosNetosMax'
                      onChange={handleInputChange}
                      margin='normal'
                      fullWidth
                      InputLabelProps={{
                        className: classes.inputShrink,
                        shrink: true
                      }}
                    />
                  </Grid>
                </Grid>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={12}>
              <FormControl component='fieldset' className={classes.formControl}>
                <FormLabel component='legend'>Ámbito:</FormLabel>
                <RadioGroup aria-label='nivelOrdenGobierno' name='nivelOrdenGobierno' className={classes.group} value={nivelOrdenGobierno} onChange={handleInputChange} row>
                  <FormControlLabel value='' control={<Radio color='primary' />} label='TODOS' />
                  <FormControlLabel value='FEDERAL' control={<Radio color='primary' />} label='FEDERAL' />
                  <FormControlLabel value='ESTATAL' control={<Radio color='primary' />} label='ESTATAL' />
                  <FormControlLabel value='MUNICIPAL_ALCALDIA' control={<Radio color='primary' />} label='MUNICIPAL/ALCALDÍA' />
                </RadioGroup>
              </FormControl>
            </Grid>
            {/* <Divider /> */}
            <Grid item xs={12}>
              <Button onClick={() => setChecked(!checked)} startIcon={checked ? <ExpandLessIcon /> : <ExpandMoreIcon />}>
                <CustomTypography>Ordenamiento</CustomTypography>
              </Button>
            </Grid>
            {checked && (
              <Grid item xs={12}>
                <Ordenamiento handleOrdenamiento={handleOrdenamiento} ordenamiento={ordenamiento} />
              </Grid>
            )}

            <Grid item xs={12} style={{ textAlign: 'right' }}>
              <ButtonPDN
                type='reset'
                variant='contained'
                color='primary'
                onClick={() => {
                  cleanForm()
                }}
              >
                Limpiar
              </ButtonPDN>
              <ButtonPDN
                type='submit'
                variant='contained'
                color='primary'
                onClick={() => {
                  handlerFind()
                  ReactGA.event({ category: 'busqueda-s1', action: 'click' })
                }}
                disabled={btnSearch}
              >
                Buscar
              </ButtonPDN>
            </Grid>
            {/* <Divider /> */}
          </Grid>
        </Grid>
      </Grid>
      {SURVEY_URL && showSurveyBanner && (
        <div
          style={{
            position: 'fixed',
            right: '16px',
            top: '104px',
            width: 'calc(100vw - 32px)',
            maxWidth: '380px',
            zIndex: 1200
          }}
        >
          <div
            style={{
              borderRadius: '12px',
              padding: '12px 14px',
              background: 'linear-gradient(90deg, #fff4df 0%, #ffe8c7 100%)',
              border: '1px solid #f1c27d',
              boxShadow: '0 12px 24px rgba(0, 0, 0, 0.2)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <CampaignIcon style={{ color: '#9b2c2c' }} />
                <Typography style={{ color: '#4b2b0b', fontWeight: 700 }}>Tu opinion nos ayuda</Typography>
              </div>
              <IconButton size='small' aria-label='Cerrar encuesta' onClick={handleCloseSurveyBanner}>
                <CloseIcon fontSize='small' />
              </IconButton>
            </div>
            <Typography style={{ color: '#4b2b0b', marginTop: '6px' }}>Toma 1 minuto y ayudanos a mejorar esta seccion.</Typography>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px', marginTop: '10px' }}>
              <ButtonPDN
                href={SURVEY_URL}
                target='_blank'
                rel='noopener noreferrer'
                onClick={() => ReactGA.event({ category: 'encuesta-s1', action: 'click' })}
                style={{
                  margin: 0,
                  boxShadow: '0 8px 18px rgba(122, 62, 124, 0.3)'
                }}
              >
                Ir a la encuesta
              </ButtonPDN>
              <FormControlLabel
                style={{ marginRight: 0 }}
                control={<Checkbox color='primary' size='small' checked={disableSurveyBanner} onChange={(event) => setDisableSurveyBanner(event.target.checked)} />}
                label={<Typography style={{ color: '#4b2b0b', fontSize: '0.85rem' }}>No volver a mostrar</Typography>}
              />
            </div>
          </div>
        </div>
      )}
    </>
  )
}
export default FormSearch
