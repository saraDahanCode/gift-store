


import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Change, validateShipping } from '../../functions/validation.js';
import { setShippingErrors, setFormData } from '../../Persist-redux/shippingDetailsSlice.js';

export default function ShippingDetails() {
  const navigate = useNavigate();
  const nextPage = '/paymaentDetails';
  const formData = useSelector(state => state.shippingDetails.formData);
  const errors = useSelector(state => state.shippingDetails.errors);
  const dispatch = useDispatch();

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', mt: 5 }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const newErrors = validateShipping(e, formData);
          dispatch(setShippingErrors(newErrors));

          if (Object.values(newErrors).every(error => !error)) {
            navigate(nextPage);
          }
        }}
      >
        <Card sx={{ p: 3, borderRadius: 4 }}>
          <CardContent>
            <Typography variant="h5" mb={2}>פרטי משלוח</Typography>

            <FormControl fullWidth margin="normal">
              <InputLabel>עיר</InputLabel>
              <Select
                name="city"
                value={formData.city || ''}
                label="עיר"
                onChange={(e) =>
                  Change(e, dispatch, formData, errors, {
                    setFormData,
                    setErrors: setShippingErrors,
                  })
                }
              >
                <MenuItem value="">בחר עיר</MenuItem>
                <MenuItem value="Ashdod">אשדוד</MenuItem>
                <MenuItem value="Beit-shemesh">בית שמש</MenuItem>
                <MenuItem value="bni-brak">בני ברק</MenuItem>
                <MenuItem value="Haifa">חיפה</MenuItem>
                <MenuItem value="Jerusalem">ירושלים</MenuItem>
                <MenuItem value="Naria">נהריה</MenuItem>
                <MenuItem value="Netivot">נתיבות</MenuItem>
                <MenuItem value="Tel-Aviv">תל אביב</MenuItem>
              </Select>
            </FormControl>

            <TextField
              name="street"
              label="רחוב"
              value={formData.street}
              onChange={(e) => {
                if (errors.street && e.target.value === '') {
                  dispatch(setShippingErrors({ ...errors, street: '' }));
                }
                Change(e, dispatch, formData, errors, {
                  setFormData,
                  setErrors: setShippingErrors,
                });
              }}
              error={!!errors.street}
              helperText={errors.street && 'הקש שם רחוב תקין'}
              fullWidth
              variant="outlined"
              margin="normal"
            />

            <TextField
              name="ApartmentNumber"
              label="מספר בית"
              value={formData.ApartmentNumber}
              onChange={(e) => {
                if (errors.ApartmentNumber && e.target.value === '') {
                  dispatch(setShippingErrors({ ...errors, ApartmentNumber: '' }));
                }
                Change(e, dispatch, formData, errors, {
                  setFormData,
                  setErrors: setShippingErrors,
                });
              }}
              error={!!errors.ApartmentNumber}
              helperText={errors.ApartmentNumber && 'מספר דירה לא חוקי'}
              fullWidth
              variant="outlined"
              margin="normal"
            />

            <Typography variant="h6" mt={3}>סוג המשלוח</Typography>
            <RadioGroup
              name="deliveryType"
              value={formData.deliveryType || ''}
              onChange={(e) =>
                Change(e, dispatch, formData, errors, {
                  setFormData,
                  setErrors: setShippingErrors,
                })
              }
              row
            >
              <FormControlLabel value="standard" control={<Radio />} label="משלוח רגיל" />
              <FormControlLabel value="express" control={<Radio />} label="משלוח מהיר" />
            </RadioGroup>

            <Box display="flex" justifyContent="space-between" mt={4}>
              <Button variant="outlined" onClick={() => navigate('/personalDetails')}>חזור</Button>
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




















