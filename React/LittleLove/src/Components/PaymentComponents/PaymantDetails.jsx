
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  OutlinedInput,
  InputAdornment,
  IconButton,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import { useState } from 'react';
import { Change, validatePayment } from '../../functions/validation.js';
import { useSaveOrder } from '../../functions/cartFunctions.js';
import { NavLink, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { setPaymentErrors, setPaymentFormData } from '../../Persist-redux/paymentDetailsSlice';

export default function PaymantDetails() {
  const navigate = useNavigate();
 

  const formData = useSelector((state) => state.paymentDetails.formData);
  const errors = useSelector((state) => state.paymentDetails.errors);

  const dispatch = useDispatch();
  const saveOrder = useSaveOrder();

  const [agreed, setAgreed] = useState(false);

  const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);

  const requiredFields = ['visa', 'month', 'year', 'CSV'];
  const disabled = requiredFields.some((field) => !formData[field]) || !agreed;

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', mt: 5 }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const newErrors = validatePayment(formData);
          dispatch(setPaymentErrors(newErrors));


          if (Object.values(newErrors).every(error => !error)) {

            saveOrder(navigate, dispatch);
          }
        }}
      >
        <Card sx={{ p: 3, borderRadius: 4 }}>
          <CardContent>
            <Typography variant="h5" mb={2}>פרטי אשראי</Typography>

            <TextField
              name="visa"
              label="מספר כרטיס אשראי"
              value={formData.visa}
              onChange={(e) => Change(e, dispatch, formData, errors, {
                setFormData: setPaymentFormData,
                setErrors: setPaymentErrors,
              })}
              error={!!errors.visa}
              helperText={errors.visa && 'הקש מספר כרטיס אשראי תקין'}
              fullWidth
              variant="outlined"
              margin="normal"
              sx={{ borderRadius: 2 }}
            />
            <Box display="flex" gap={2} mt={2}>
              <FormControl fullWidth error={!!errors.date}>
                <InputLabel>חודש</InputLabel>
                <Select
                  name="month"
                  value={formData.month || ''}
                  label="חודש"
                  onChange={(e) =>
                    Change(e, dispatch, formData, errors, {
                      setFormData: setPaymentFormData,
                      setErrors: setPaymentErrors,
                    })
                  }
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 200,
                        overflowY: 'auto',
                      },
                    },
                    anchorOrigin: {
                      vertical: 'bottom',
                      horizontal: 'left',
                    },
                    transformOrigin: {
                      vertical: 'top',
                      horizontal: 'left',
                    },
                  }}
                >
                  {months.map((m) => (
                    <MenuItem key={m} value={m}>
                      {m}
                    </MenuItem>
                  ))}
                </Select>
                {errors.date && <FormHelperText>בחר חודש</FormHelperText>}
              </FormControl>

              <FormControl fullWidth error={!!errors.date}>
                <InputLabel>שנה</InputLabel>
                <Select
                  name="year"
                  value={formData.year || ''}
                  label="שנה"
                  onChange={(e) =>
                    Change(e, dispatch, formData, errors, {
                      setFormData: setPaymentFormData,
                      setErrors: setPaymentErrors,
                    })
                  }
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 200,
                        overflowY: 'auto',
                      },
                    },
                    anchorOrigin: {
                      vertical: 'bottom',
                      horizontal: 'left',
                    },
                    transformOrigin: {
                      vertical: 'top',
                      horizontal: 'left',
                    },
                  }}
                >
                  {years.map((y) => (
                    <MenuItem key={y} value={y}>
                      {y}
                    </MenuItem>
                  ))}
                </Select>
                {errors.date && <FormHelperText>בחר שנה</FormHelperText>}
              </FormControl>
            </Box>

            <FormControl fullWidth variant="outlined" margin="normal" error={!!errors.CSV}>
              <InputLabel>CSV/CVV</InputLabel>
              <OutlinedInput
                name="CSV"
                type={'text'}
                value={formData.CSV}
                onChange={(e) => Change(e, dispatch, formData, errors, {
                  setFormData: setPaymentFormData,
                  setErrors: setPaymentErrors,
                })}
               
                label="CSV/CVV"
              />
              {errors.CSV && <FormHelperText>הקש קוד אבטחה תקין</FormHelperText>}
            </FormControl>

            <FormControlLabel
              control={
                <Checkbox
                  checked={agreed}
                  onChange={(e) => setAgreed(e.target.checked)}
                />
              }
              label={<Typography variant="body2">קראתי את <NavLink to="/termsOfUse">התקנון</NavLink> ואני מאשר</Typography>}
              sx={{ mt: 2 }}
            />

            <Box display="flex" justifyContent="space-between" mt={4}>
              <Button variant="outlined" onClick={() => navigate('/shippingDetails')}>חזור</Button>
              <Button
                type="submit"
                variant="contained"
                disabled={disabled}
              >
                אישור הזמנה
              </Button>
            </Box>
          </CardContent>
        </Card>
      </form>
    </Box>
  );
}



