import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { TextField, Button } from '@mui/material';

// Define the validation schema
const schema = yup.object().shape({
  comments: yup.string().when('action', {
    is: 'reject',
    then: yup.string().required('Comments are required when rejecting'),
    otherwise: yup.string(),
  }),
});

function ConditionalValidationForm() {
  const [action, setAction] = useState(null);
  const { control, handleSubmit, setValue, trigger } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log('Form submitted with:', data);
  };

  const handleApprove = () => {
    setAction('approve');
    setValue('action', 'approve');
    handleSubmit(onSubmit)();
  };

  const handleReject = async () => {
    setAction('reject');
    setValue('action', 'reject');
    const isValid = await trigger('comments');
    if (isValid) {
      handleSubmit(onSubmit)();
    }
  };

  return (
    <form>
      <Controller
        name="comments"
        control={control}
        defaultValue=""
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            label="Comments"
            variant="outlined"
            error={!!error}
            helperText={error ? error.message : ''}
            fullWidth
            margin="normal"
          />
        )}
      />
      <input type="hidden" {...register('action')} />
      <Button
        variant="contained"
        color="primary"
        onClick={handleApprove}
        style={{ marginRight: '8px' }}
      >
        Approve
      </Button>
      <Button variant="contained" color="secondary" onClick={handleReject}>
        Reject
      </Button>
    </form>
  );
}

export default ConditionalValidationForm;