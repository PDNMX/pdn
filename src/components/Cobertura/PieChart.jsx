import { Box } from '@mui/material'

const PieChart = props => {
  const { color, value } = props
  const percentage = Math.min(100, Math.max(0, Number(value) || 0))

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexGrow: 1
      }}>
      <Box
        role='img'
        aria-label={`${percentage}%`}
        sx={{
          width: 180,
          height: 180,
          borderRadius: '50%',
          border: '2px solid #d3d3d3',
          background: `conic-gradient(${color} 0 ${percentage}%, #eae1ea ${percentage}% 100%)`
        }}
      />
    </Box>
  );
}

export default PieChart
