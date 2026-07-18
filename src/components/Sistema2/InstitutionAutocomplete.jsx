import React from 'react';
import { Autocomplete, TextField, Typography } from '@mui/material';

const InstitutionAutocomplete = ({ classes, entities, handleSetState }) => {
  // Analyze duplicates independently
  const checkDuplicates = (data) => {
    if (!data || !Array.isArray(data)) return;


    // Create a map of names and their occurrences
    const nameCount = {};
    const duplicates = {};

    data.forEach(entity => {
      if (!entity || !entity.nombre) return;
      const name = entity.nombre.trim();
      nameCount[name] = (nameCount[name] || 0) + 1;

      if (nameCount[name] > 1) {
        if (!duplicates[name]) {
          duplicates[name] = [];
        }
        duplicates[name].push(entity);
      }
    });

  };

  // Call checkDuplicates whenever entities changes
  React.useEffect(() => {
    checkDuplicates(entities);
  }, [entities]);

  // Create a truly unique identifier for each option
  const createUniqueId = (entity) => {
    if (!entity) return `empty_${Math.random()}`;
    
    // Combine multiple fields to ensure uniqueness
    const idParts = [
      entity.supplier_id || 'no-supplier',
      entity.clave || 'no-clave',
      entity.id || 'no-id',
      // Add a counter or random string as fallback
      Math.random().toString(36).substring(2, 7)
    ];
    
    return idParts.join('_');
  };

  // Process options for grouping
  const options = React.useMemo(() => {
    if (!entities || !Array.isArray(entities)) return [];
    
    return entities.map(entity => ({
      ...entity,
      groupBy: entity.supplier_id || 'Sin clasificar',
      uniqueId: createUniqueId(entity)
    }));
  }, [entities]);

  return (
    <Autocomplete
      freeSolo
      className={classes.autoComplete}
      options={options.sort((a, b) => -b.groupBy.localeCompare(a.groupBy))}
      groupBy={(option) => option.groupBy}
      getOptionLabel={(option) => {
        if (typeof option === 'string') return option;
        if (!option) return '';
        return option.nombre || '';
      }}
      value={null}
      onChange={(_, newValue) => {
        handleSetState('current_entity', { value: newValue });
      }}
      renderGroup={(params) => (
        <div key={`group_${params.group}_${params.key}`}>
          <Typography
            sx={{
              color: 'rgb(113, 57, 114)',
              fontWeight: 700,
              p: 1,
              borderBottom: '1px solid rgba(113, 57, 114, 0.11)',
              borderTop: '1px solid rgba(113, 57, 114, 0.11)',
              backgroundColor: 'rgba(113, 57, 114, 0.04)', 
              mb: 1 
            }}
          >
            {params.group}
          </Typography>
          {params.children}
        </div>
      )}
      renderOption={(props, option) => (
        <li {...props} key={option.uniqueId}>
          {option.nombre}
        </li>
      )}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Institución"
          variant="outlined"
          style={{ background: '#f2f0f2' }}
          margin="normal"
          slotProps={{
            ...params.slotProps,

            input: {
              ...params.slotProps.input
            },

            inputLabel: {
              shrink: undefined
            }
          }} />
      )}
      noOptionsText="No hay resultados"
      loadingText="Cargando..."
      isOptionEqualToValue={(option, value) => {
        if (!option || !value) return false;
        return option.clave === value.clave;
      }}
    />
  );
};

export default InstitutionAutocomplete;
