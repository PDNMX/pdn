const commonStyles = theme => ({
    // Contenedor principal
    root: {
      padding: theme.spacing(3),
    },

    // Secciones y títulos
    sectionTitle: {
      color: '#666',
      marginBottom: theme.spacing(3),
    },
    sectionContainer: {
      marginBottom: theme.spacing(4),
      padding: theme.spacing(2),
    },

    // Elementos de formulario
    formControl: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    radioGroup: {
      flexDirection: 'row',
      gap: theme.spacing(4),
    },

    // Contenedor de botones
    buttonContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      marginTop: theme.spacing(3),
      gap: theme.spacing(2),
    },

    // Botones
    searchButton: {
      backgroundColor: '#9c27b0',
      color: '#fff',
      '&:hover': {
        backgroundColor: '#7b1fa2',
      },
    },
    clearButton: {
      color: '#9c27b0',
      borderColor: '#9c27b0',
      '&:hover': {
        borderColor: '#7b1fa2',
        backgroundColor: 'rgba(156, 39, 176, 0.04)',
      },
    },

    // Estados de carga y resultados
    loading: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: theme.spacing(3),
    },
    resultsContainer: {
      marginTop: theme.spacing(4),
    },

    // Tabla de resultados
    tableContainer: {
      marginTop: theme.spacing(2),
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    },
    tableHeaderCell: {
      fontWeight: 'bold',
      backgroundColor: '#f5f5f5',
    },
    tableRow: {
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: 'rgba(156, 39, 176, 0.04) !important',
      },
    },

    // Mensajes
    noResults: {
      textAlign: 'center',
      padding: theme.spacing(3),
      backgroundColor: '#f5f5f5',
      borderRadius: theme.shape.borderRadius,
    },
    errorMessage: {
      color: theme.palette.error.main,
      marginTop: theme.spacing(2),
      padding: theme.spacing(2),
      backgroundColor: theme.palette.error.light,
      borderRadius: theme.shape.borderRadius,
    },

    // Estilos para el diálogo
    dialogTitle: {
      backgroundColor: '#f5f5f5',
      borderBottom: '1px solid #e0e0e0',
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
    },
    dialogSection: {
      marginBottom: theme.spacing(2),
      marginTop: theme.spacing(2),
    },
    dialogSectionTitle: {
      color: theme.palette.primary.main,
      marginBottom: theme.spacing(1),
      fontWeight: 600,
    },
    label: {
      fontWeight: 600,
      color: '#666',
    },
    value: {
      color: '#333',
    },
  });

  export default commonStyles;
