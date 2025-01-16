import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import { PaidOutlined } from '@mui/icons-material';

const staticData = {
  total: '$ 868,559,031',
  descripcion: "Total en multas económicas aplicadas"
};

const TotalMultas = () => {
  return (
    <Paper 
      elevation={0} 
      sx={{
        height: '100%',
        minHeight: '200px',
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
      <Box 
        sx={{
          position: 'absolute',
          right: -20,
          top: -20,
          opacity: 0.05,
          transform: 'rotate(15deg)'
        }}
      >
        <PaidOutlined sx={{ fontSize: 150 }} />
      </Box>
      
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
          Multas Registradas
        </Typography>

        <Typography 
          variant="h3" 
          component="div" 
          sx={{ 
            fontWeight: 700,
            mb: 1,
            color: '#9085da',
            whiteSpace: 'nowrap', // Asegura que el texto permanezca en una línea
            overflow: 'visible' // Permite que el texto completo sea visible
          }}
        >
          {staticData.total}
        </Typography>

        <Typography 
          variant="body1" 
          color="textSecondary"
          sx={{
            lineHeight: 1.5,
            height: '3em',
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            textOverflow: 'ellipsis'
          }}
        >
          {staticData.descripcion}
        </Typography>

        <Box 
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            height: '4px',
            background: 'linear-gradient(90deg, #963476 0%, #2787C5 100%)',
            opacity: 0.7
          }}
        />
      </Box>
    </Paper>
  );
};

export default TotalMultas;