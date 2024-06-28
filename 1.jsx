import React, { useState } from 'react';
import { Autocomplete, TextField, Checkbox, Box, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];

const CustomAutocomplete = () => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  return (
    <Autocomplete
      multiple
      options={options}
      value={selectedOptions}
      onChange={(event, newValue) => {
        setSelectedOptions(newValue);
      }}
      renderInput={(params) => <TextField {...params} label="Select Options" variant="outlined" />}
      renderOption={(props, option, { selected }) => (
        <ListItem {...props}>
          <ListItemText primary={option} />
          {selected ? (
            <ListItemIcon>
              <CheckIcon style={{ color: 'green' }} />
            </ListItemIcon>
          ) : null}
        </ListItem>
      )}
    />
  );
};

export default CustomAutocomplete;