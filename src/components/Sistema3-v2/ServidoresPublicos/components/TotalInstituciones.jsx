import { Paper, Typography, Box } from '@mui/material';
import { AccountBalance } from '@mui/icons-material';

const TotalInstituciones = ({ totalInstitutions }) => {

  const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <Paper
      elevation={0}
      sx={{
        height: '100%',
        background: 'linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)',
        border: '1px solid #e0e0e0',
        borderRadius: 2,
        position: 'relative',
        overflow: 'hidden',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
        }
      }}
    >
      {/* Decorative background icon */}
      <Box
        sx={{
          position: 'absolute',
          right: -20,
          top: -20,
          opacity: 0.05,
          transform: 'rotate(15deg)'
        }}
      >
        <AccountBalance sx={{ fontSize: 150 }} />
      </Box>

      {/* Content */}
      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-start"
        sx={{
          p: 3,
          position: 'relative',
          zIndex: 1
        }}
      >
        {/* Label */}
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{
            mb: 2,
            textTransform: 'uppercase',
            letterSpacing: '0.5px',
            fontWeight: 500
          }}
        >
          Entes públicos Registrados
        </Typography>

        {/* Number */}
        <Typography
          variant="h3"
          component="div"
          sx={{
            fontWeight: 700,
            mb: 1,
            color: '#9085da'
          }}
        >
          {formatNumber(totalInstitutions)}       
        </Typography>

        {/* Description */}
        <Typography
          variant="body1"
          color="textSecondary"
          sx={{
            lineHeight: 1.5,
            maxWidth: '90%'
          }}
        >
          Total de Entes públicos con personas servidoras públicas sancionados
        </Typography>

        {/* Subtle indicator bar */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '4px',
            background: 'linear-gradient(90deg, #9085da 0%, rgb(99, 91, 155) 100%)',
            opacity: 0.7
          }}
        />
      </Box>
    </Paper>
  );
};

export default TotalInstituciones;
