
import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  TextField,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Change, validatePersonal } from '../../functions/validation.js';
import { setPersonalErrors, setPersonalFormData } from '../../Persist-redux/personalDetailsSlice.js';

export default function Personaldetails() {
  const navigate = useNavigate();
  const nextPage = '/shippingDetails';
  const formData = useSelector((state) => state.personalDetails.formData);
  const errors = useSelector((state) => state.personalDetails.errors);
  const dispatch = useDispatch();

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', mt: 5 }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const newErrors = validatePersonal(e, formData);
          dispatch(setPersonalErrors(newErrors));

          if (Object.values(newErrors).every((error) => !error)) {
            navigate(nextPage);
          }
        }}
      >
        <Card sx={{ p: 3, borderRadius: 4 }}>
          <CardContent>
            <Typography variant="h5" mb={2}>פרטים אישיים</Typography>

            <TextField
              name="Fname"
              label="שם פרטי"
              value={formData.Fname}
              onChange={(e) => {
                if (errors.fname && e.target.value === '') {
                  dispatch(setPersonalErrors({ ...errors, fname: '' }));
                }
                Change(e, dispatch, formData, errors, {
                  setFormData: setPersonalFormData,
                  setErrors: setPersonalErrors
                });
              }}
              error={!!errors.fname}
              helperText={errors.fname && 'הקש שם פרטי תקין'}
              fullWidth
              variant="outlined"
              margin="normal"
            />

            <TextField
              name="Lname"
              label="שם משפחה"
              value={formData.Lname}
              onChange={(e) => {
                if (errors.lname && e.target.value === '') {
                  dispatch(setPersonalErrors({ ...errors, lname: '' }));
                }
                Change(e, dispatch, formData, errors, {
                  setFormData: setPersonalFormData,
                  setErrors: setPersonalErrors
                });
              }}
              error={!!errors.lname}
              helperText={errors.lname && 'הקש שם משפחה תקין'}
              fullWidth
              variant="outlined"
              margin="normal"
            />

            <TextField
              name="phone"
              label="מספר פלאפון"
              value={formData.phone}
              onChange={(e) => {
                if (errors.phone && e.target.value === '') {
                  dispatch(setPersonalErrors({ ...errors, phone: '' }));
                }
                Change(e, dispatch, formData, errors, {
                  setFormData: setPersonalFormData,
                  setErrors: setPersonalErrors
                });
              }}
              error={!!errors.phone}
              helperText={errors.phone && 'הקש מספר פלאפון תקין'}
              fullWidth
              variant="outlined"
              margin="normal"
            />

            <TextField
              name="email"
              label="אימייל"
              value={formData.email}
              onChange={(e) => {
                if (errors.email && e.target.value === '') {
                  dispatch(setPersonalErrors({ ...errors, email: '' }));
                }
                Change(e, dispatch, formData, errors, {
                  setFormData: setPersonalFormData,
                  setErrors: setPersonalErrors
                });
              }}
              error={!!errors.email}
              helperText={errors.email && 'הקש אימייל תקין'}
              fullWidth
              variant="outlined"
              margin="normal"
            />

            <Box display="flex" justifyContent="flex-end" mt={4}>
              <Button
                type="submit"
                variant="contained"
                disabled={Object.values(formData).some(value => value === '')}
              >
                הבא
              </Button>
            </Box>
          </CardContent>
        </Card>
      </form>
    </Box>
  );
}
