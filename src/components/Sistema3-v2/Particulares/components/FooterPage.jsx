import PropTypes from 'prop-types';
import { Paper, Typography } from '@mui/material';

const FooterPage = ({ dataSet, provider, referenceDate }) => {
  return (
    <Paper elevation={0} sx={{ p: 2, height: '100%' }}>
      <Typography variant="body2" color="textSecondary">
        Dataset: {dataSet}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Proveedor: {provider}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Fecha de referencia: {referenceDate}
      </Typography>
    </Paper>
  );
};

FooterPage.propTypes = {
  dataSet: PropTypes.string.isRequired,
  provider: PropTypes.string.isRequired,
  referenceDate: PropTypes.string.isRequired,
};

export default FooterPage;
