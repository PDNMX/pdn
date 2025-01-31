import React, { useState, useEffect } from 'react';
import { withStyles } from '@mui/styles';
import { Grid, Box, Tabs, Tab, Paper, CircularProgress } from '@mui/material';
import PropTypes from 'prop-types';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import FormServidores from './ServidoresPublicos/FormServidores';
import DashboardServidores from './ServidoresPublicos/DashboardServidores';
import Descarga from '../Compartidos/Descarga';
import HeaderV2 from '../HomeV2/HeaderV2';
import pdnRoutes from '../../routes/index';
import { ThemeProvider } from '@mui/material/styles';
import ThemeV2 from '../../ThemeV2';
import FormParticulares from './Particulares/FormParticulares';
import DashboardParticulares from './Particulares/DashboardParticulares';
import { BarChartOutlined } from '@mui/icons-material';

const styles = (theme) => ({
  root: {
    minHeight: '100vh',
    backgroundColor: '#f6f7f9',
  },
  section: {
    maxWidth: '1200px',
    width: '100%',
    margin: '0 auto',
  },
  mainContainer: {
    backgroundColor: '#fff',
    /* borderRadius: '12px', */
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)', // Sombra más pronunciada
    overflow: 'hidden',
    marginTop: theme.spacing(3),
  },
  tabsContainer: {
    backgroundColor: '#ede7f6', // Color de fondo más distintivo
    borderBottom: '1px solid rgba(156, 39, 176, 0.2)', // Borde con el color primario
    position: 'relative',
    '&::after': {
      // Sombra sutil debajo de los tabs
      content: '""',
      position: 'absolute',
      bottom: '-1px',
      left: 0,
      right: 0,
      height: '4px',
      background: 'linear-gradient(180deg, rgba(0,0,0,0.03) 0%, rgba(0,0,0,0) 100%)',
    },
  },
  tabs: {
    '& .MuiTabs-indicator': {
      backgroundColor: '#9c27b0',
      height: '3px',
    },
    '& .MuiTab-root': {
      margin: '0',
    },
  },
  tab: {
    minHeight: '64px',
    textTransform: 'none',
    fontSize: '0.9rem',
    fontWeight: 500,
    color: '#666',
    '&.Mui-selected': {
      color: '#9c27b0',
      fontWeight: 600,
    },
    '&:hover': {
      backgroundColor: 'rgba(156, 39, 176, 0.04)',
      color: '#9c27b0',
    },
    [theme.breakpoints.up('md')]: {
      minWidth: '300px',
    },
  },
  tabIcon: {
    marginBottom: '0 !important',
    marginRight: theme.spacing(1),
    color: 'inherit', // El ícono heredará el color del tab
  },
  tabLabel: {
    fontSize: '0.9rem',
    textTransform: 'none',
    alignItems: 'center',
    display: 'flex',
  },
  tabPanel: {
    backgroundColor: '#fff', // Aseguramos fondo blanco para el contenido
  },
  contentWrapper: {
    margin: theme.spacing(0, 3),
  },
});

const TabPanel = ({ children, value, index, ...other }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`sancionados-tabpanel-${index}`}
      aria-labelledby={`sancionados-tab-${index}`}
      {...other}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const Index = ({ classes }) => {
  const [value, setValue] = useState(0);
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const system = pdnRoutes.find((route) => route.path === '/sancionados');

  useEffect(() => {
    const fetchProviders = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_S3_V2_BACKEND}/api/v1/providers`);
        if (!response.ok) throw new Error('Error al obtener los proveedores');

        const result = await response.json();
        if (!result.success || !Array.isArray(result.data)) {
          throw new Error('Formato de datos inválido');
        }

        setProviders(result.data);
      } catch (err) {
        setError(err.message);
        console.error('Error fetching providers:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProviders();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <div>Error al cargar los datos: {error}</div>
      </Box>
    );
  }

  return (
    <div className={classes.root}>
      <HeaderV2 section={system} />

      <Grid container justifyContent="center">
        <Grid item xs={12} className={classes.section}>
          <Paper className={classes.mainContainer} elevation={0}>
            <Box className={classes.tabsContainer}>
              <Tabs value={value} onChange={handleChange} className={classes.tabs} variant="fullWidth" centered>
                <Tab
                  className={classes.tab}
                  icon={
                    <Box className={classes.tabLabel}>
                      <PersonSearchIcon className={classes.tabIcon} />
                      <span>Buscador de personas servidoras públicas sancionadas</span>
                    </Box>
                  }
                  aria-label="servidores públicos"
                />
                <Tab
                  className={classes.tab}
                  icon={
                    <Box className={classes.tabLabel}>
                      <BusinessCenterIcon className={classes.tabIcon} />
                      <span>Buscador de particulares sancionados</span>
                    </Box>
                  }
                  aria-label="particulares"
                />
                <Tab
                  className={classes.tab}
                  icon={
                    <Box className={classes.tabLabel}>
                      <BarChartOutlined className={classes.tabIcon} />
                      <span>Visor de datos (personas servidoras públicas sancionadas)</span>
                    </Box>
                  }
                  aria-label="visor servidores públicos"
                />
                <Tab
                  className={classes.tab}
                  icon={
                    <Box className={classes.tabLabel}>
                      <BarChartOutlined className={classes.tabIcon} />
                      <span>Visor de datos (particulares sancionados)</span>
                    </Box>
                  }
                  aria-label="visor particulares"
                />                
              </Tabs>
            </Box>

            <ThemeProvider theme={ThemeV2}>
              <TabPanel value={value} index={0} className={classes.tabPanel}>
                <FormServidores providers={providers}/>
              </TabPanel>
              <TabPanel value={value} index={1} className={classes.tabPanel}>
                <FormParticulares providers={providers}/>
              </TabPanel>
              <TabPanel value={value} index={2} className={classes.tabPanel}>
                <DashboardServidores providers={providers}/>
              </TabPanel>
              <TabPanel value={value} index={3} className={classes.tabPanel}>
                <DashboardParticulares providers={providers}/>
              </TabPanel>
            </ThemeProvider>
          </Paper>

          <Box className={classes.descargaSection}>
            <Descarga
              url={value === 0 ? process.env.REACT_APP_BULK_S3_SERVIDORES : process.env.REACT_APP_BULK_S3_PARTICULARES}
              tipoGA={value === 0 ? 'bulk-s3SP' : 'bulk-s3P'}
            />
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Index);
