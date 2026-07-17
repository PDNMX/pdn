import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  CircularProgress,
  Box
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';

const ProviderAccordion = ({
  provider,
  loading,
  children,
  totalRegistros
}) => {
  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls={`provider-${provider.id}-content`}
        id={`provider-${provider.id}-header`}
      >
        <Box sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          pr: 2
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <AssuredWorkloadIcon sx={{ color: '#9c27b0' }} />
            <Typography>{provider.name}</Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', ml: 'auto' }}>
            {loading ? (
              <CircularProgress size={20} sx={{ mr: 2 }} />
            ) : (
              <Typography>
                Total de registros: {totalRegistros || 0}
              </Typography>
            )}
          </Box>
        </Box>
      </AccordionSummary>
      <AccordionDetails>
        {loading ? (
          <Box display="flex" justifyContent="center" p={2}>
            <CircularProgress />
          </Box>
        ) : totalRegistros === 0 ? (
          <Box p={2} textAlign="center">
            <Typography color="textSecondary">
              No se encontraron registros para este proveedor
            </Typography>
          </Box>
        ) : (
          children
        )}
      </AccordionDetails>
    </Accordion>
  );
};

export default ProviderAccordion;
