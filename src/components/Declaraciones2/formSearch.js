import React from 'react';
import { Grid, Typography } from '@material-ui/core';

import { SelectElement, Divider } from './utils';

import {
	TextField,
	Radio,
	FormControlLabel,
	FormControl,
	MenuItem,
	Button,
	FormLabel,
	RadioGroup
} from '@material-ui/core';

import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { makeStyles } from '@material-ui/core/styles';
import Ordenamiento from './Ordenamiento';
import style from './style';
const useStyles = makeStyles(style);

export default function({
	query,
	handleInputChange,
	catEscolaridadNivel,
	catFormaAdquisicion,
	catEntidadesFederativas,
	catMunicipios,
	btnSearch,
	handlerFind,
	cleanForm,
	handleOrdenamiento,
	ordenamiento
}) {
	const classes = useStyles();
	let {
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
	} = query;

	const [ checked, setChecked ] = React.useState(false);

	return (
		<React.Fragment>
			<Grid container spacing={0} className={classes.infoBusqueda}>
				<Grid item xs={12}>
					<Typography paragraph>
						<b>Aquí encontrarás la siguiente información:</b>
					</Typography>
					<ul className={classes.ul}>
						<li className={classes.li}>
							<Typography color="textPrimary" display="inline">
								La evolución patrimonial de las y los funcionarios
							</Typography>
						</li>
						<li className={classes.li}>
							<Typography color="textPrimary" display="inline">
								La trayectoria laboral de las y los funcionarios
							</Typography>
						</li>
						<li className={classes.li}>
							<Typography color="textPrimary" display="inline">
								Sus declaraciones sobre posibles conflictos de interés
							</Typography>
						</li>
					</ul>
				</Grid>
			</Grid>
			<Grid container spacing={0} className={classes.infoBusqueda}>
				<Grid item xs={12}>
					<Typography>
						<b>Busca un servidor público</b>
					</Typography>
				</Grid>
				<Divider />
				<Grid item xs={12}>
					<Grid container spacing={1}>
						<Grid item xs={12} md={3}>
							<FormControl className={classes.formControl}>
								<TextField
									id="mui-name"
									label="Nombres"
									value={nombres}
									className={classes.textField}
									name="nombres"
									onChange={handleInputChange}
									margin="normal"
									fullWidth
									InputLabelProps={{
										className: classes.inputShrink,
										shrink: true
									}}
								/>
							</FormControl>
						</Grid>
						<Grid item xs={12} md={3}>
							<FormControl className={classes.formControl}>
								<TextField
									id="primerApellido"
									name="primerApellido"
									value={primerApellido}
									className={classes.textField}
									onChange={handleInputChange}
									label="Apellido uno"
									margin="normal"
									fullWidth
									InputLabelProps={{
										className: classes.inputShrink,
										shrink: true
									}}
								/>
							</FormControl>
						</Grid>
						<Grid item xs={12} md={3}>
							<FormControl className={classes.formControl}>
								<TextField
									id="segundoApellido"
									name="segundoApellido"
									value={segundoApellido}
									className={classes.textField}
									onChange={handleInputChange}
									label="Apellido dos"
									margin="normal"
									fullWidth
									InputLabelProps={{
										className: classes.inputShrink,
										shrink: true
									}}
								/>
							</FormControl>
						</Grid>
						<Grid item xs={12} md={3}>
							<SelectElement
								formControl={classes.formControl}
								value={escolaridadNivel}
								handle={handleInputChange}
								data={catEscolaridadNivel}
								label="Nivel escolar"
								name="escolaridadNivel"
							/>
						</Grid>

						<Grid item xs={12} md={4}>
							<FormControl className={classes.formControl}>
								<TextField
									id="nombreEntePublico"
									label="Nombre del Ente Público"
									value={nombreEntePublico}
									className={classes.textField}
									name="nombreEntePublico"
									onChange={handleInputChange}
									margin="normal"
									fullWidth
									InputLabelProps={{
										className: classes.inputShrink,
										shrink: true
									}}
								/>
							</FormControl>
						</Grid>
						<Grid item xs={12} md={4}>
							<FormControl className={classes.formControl}>
								<TextField
									id="empleoCargoComision"
									label="Empleo, Cargo o Comisión"
									value={empleoCargoComision}
									className={classes.textField}
									name="empleoCargoComision"
									onChange={handleInputChange}
									margin="normal"
									fullWidth
									InputLabelProps={{
										className: classes.inputShrink,
										shrink: true
									}}
								/>
							</FormControl>
						</Grid>
						<Grid item xs={12} md={4}>
							<FormControl className={classes.formControl}>
								<TextField
									id="nivelEmpleoCargoComision"
									label="Nivel del Empleo, Cargo o Comisión"
									value={nivelEmpleoCargoComision}
									className={classes.textField}
									name="nivelEmpleoCargoComision"
									onChange={handleInputChange}
									margin="normal"
									fullWidth
									InputLabelProps={{
										className: classes.inputShrink,
										shrink: true
									}}
								/>
							</FormControl>
						</Grid>

						<Grid item xs={12} md={4}>
							<FormControl className={classes.formControl}>
								<TextField
									id="entidadFederativa"
									name="entidadFederativa"
									margin="normal"
									select
									label="Entidad Federativa"
									value={entidadFederativa}
									onChange={handleInputChange}
								>
									{catEntidadesFederativas.map((q) => {
										return (
											<MenuItem key={'entidadFederativa' + q.cve_agee} value={q.cve_agee}>
												{q.nom_agee}
											</MenuItem>
										);
									})}
								</TextField>
							</FormControl>
						</Grid>
						<Grid item xs={12} md={4}>
							<FormControl className={classes.formControl}>
								<TextField
									id="municipioAlcaldia"
									name="municipioAlcaldia"
									margin="normal"
									select
									label="Municipio/Alcaldía"
									value={municipioAlcaldia}
									onChange={handleInputChange}
								>
									{catMunicipios.map((q) => {
										return (
											<MenuItem key={'municipioAlcaldia' + q.cve_agem} value={q.cve_agem}>
												{q.nom_agem}
											</MenuItem>
										);
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
                    );
                  })}
                </Select>
              </FormControl>
            </Grid> */}
						<Grid item xs={12} md={4}>
							<SelectElement
								formControl={classes.formControl}
								value={formaAdquisicion}
								handle={handleInputChange}
								data={catFormaAdquisicion}
								label="Forma de adquisición"
								name="formaAdquisicion"
							/>
						</Grid>

						<Grid item xs={12} md={3}>
							<FormControl component="fieldset" className={classes.formControl}>
								<FormLabel component="legend">Superficie de construcción</FormLabel>
								<Grid container spacing={1}>
									<Grid item xs={6}>
										<TextField
											id="superficieConstruccionMin"
											placeholder="mínimo"
											value={superficieConstruccionMin}
											className={classes.textField}
											name="superficieConstruccionMin"
											onChange={handleInputChange}
											margin="normal"
											fullWidth
											InputLabelProps={{
												className: classes.inputShrink,
												shrink: true
											}}
										/>
									</Grid>
									<Grid item xs={6}>
										<TextField
											id="superficieConstruccionMax"
											placeholder="máximo"
											value={superficieConstruccionMax}
											className={classes.textField}
											name="superficieConstruccionMax"
											onChange={handleInputChange}
											margin="normal"
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
							<FormControl component="fieldset" className={classes.formControl}>
								<FormLabel component="legend">Superficie de terreno</FormLabel>
								<Grid container spacing={1}>
									<Grid item xs={6}>
										<TextField
											id="superficieTerrenoMin"
											placeholder="mínimo"
											value={superficieTerrenoMin}
											className={classes.textField}
											name="superficieTerrenoMin"
											onChange={handleInputChange}
											margin="normal"
											fullWidth
											InputLabelProps={{
												className: classes.inputShrink,
												shrink: true
											}}
										/>
									</Grid>
									<Grid item xs={6}>
										<TextField
											id="superficieTerrenoMax"
											placeholder="máximo"
											value={superficieTerrenoMax}
											className={classes.textField}
											name="superficieTerrenoMax"
											onChange={handleInputChange}
											margin="normal"
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
							<FormControl component="fieldset" className={classes.formControl}>
								<FormLabel component="legend">Valor de adquisición</FormLabel>
								<Grid container spacing={1}>
									<Grid item xs={6}>
										<TextField
											id="valorAdquisicionMin"
											placeholder="mínimo"
											value={valorAdquisicionMin}
											className={classes.textField}
											name="valorAdquisicionMin"
											onChange={handleInputChange}
											margin="normal"
											fullWidth
											InputLabelProps={{
												className: classes.inputShrink,
												shrink: true
											}}
										/>
									</Grid>
									<Grid item xs={6}>
										<TextField
											id="valorAdquisicionMax"
											placeholder="máximo"
											value={valorAdquisicionMax}
											className={classes.textField}
											name="valorAdquisicionMax"
											onChange={handleInputChange}
											margin="normal"
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
							<FormControl component="fieldset" className={classes.formControl}>
								<FormLabel component="legend">Total de Ingresos Netos</FormLabel>
								<Grid container spacing={1}>
									<Grid item xs={6}>
										<TextField
											id="totalIngresosNetosMin"
											placeholder="mínimo"
											value={totalIngresosNetosMin}
											className={classes.textField}
											name="totalIngresosNetosMin"
											onChange={handleInputChange}
											margin="normal"
											fullWidth
											InputLabelProps={{
												className: classes.inputShrink,
												shrink: true
											}}
										/>
									</Grid>
									<Grid item xs={6}>
										<TextField
											id="totalIngresosNetosMax"
											placeholder="máximo"
											value={totalIngresosNetosMax}
											className={classes.textField}
											name="totalIngresosNetosMax"
											onChange={handleInputChange}
											margin="normal"
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
							<FormControl component="fieldset" className={classes.formControl}>
								<FormLabel component="legend">
									Nivel/Orden de Gobierno del Empleo, Cargo o Comisión:
								</FormLabel>
								<RadioGroup
									aria-label="nivelOrdenGobierno"
									name="nivelOrdenGobierno"
									className={classes.group}
									value={nivelOrdenGobierno}
									onChange={handleInputChange}
									row
								>
									<FormControlLabel value="" control={<Radio color="secondary" />} label="TODOS" />
									<FormControlLabel
										value="FEDERAL"
										control={<Radio color="secondary" />}
										label="FEDERAL"
									/>
									<FormControlLabel
										value="ESTATAL"
										control={<Radio color="secondary" />}
										label="ESTATAL"
									/>
									<FormControlLabel
										value="MUNICIPAL_ALCALDIA"
										control={<Radio color="secondary" />}
										label="MUNICIPAL/ALCALDÍA"
									/>
								</RadioGroup>
							</FormControl>
						</Grid>
						<Divider />
						<Grid item xs={12}>
							<Button
								onClick={() => setChecked(!checked)}
								startIcon={checked ? <ExpandLessIcon /> : <ExpandMoreIcon />}
							>
								Ordenamiento
							</Button>
						</Grid>
						{checked && (
							<Grid item xs={12}>
								<Ordenamiento handleOrdenamiento={handleOrdenamiento} ordenamiento={ordenamiento} />
							</Grid>
						)}

						<Grid item xs={12} style={{ textAlign: 'right' }}>
							<Button
								className={classes.button}
								type="submit"
								variant="contained"
								color="secondary"
								onClick={(e) => {
									handlerFind();
								}}
								disabled={btnSearch}
							>
								Buscar
							</Button>
							<Button
								className={classes.button}
								type="reset"
								variant="contained"
								color="secondary"
								onClick={(e) => {
									cleanForm();
								}}
							>
								Limpiar
							</Button>
						</Grid>
						<Divider />
					</Grid>
				</Grid>
			</Grid>
		</React.Fragment>
	);
}
