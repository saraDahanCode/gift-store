
import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  Paper,
  Alert
} from "@mui/material";

export default function ContactPage() {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [formErrors, setFormErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prev => ({
      ...prev,
      [name]: value
    }));

    setFormErrors(prev => {
      const newErrors = { ...prev };
      if (name === "email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) newErrors.email = "שדה חובה";
        else if (!emailRegex.test(value)) newErrors.email = "כתובת מייל לא תקינה";
        else delete newErrors.email;
      } else {
        if (!value.trim()) newErrors[name] = "שדה חובה";
        else delete newErrors[name];
      }
      return newErrors;
    });

    setSubmitted(false);
  };

  const validate = () => {
    const errors = {};
    if (!formValues.name.trim()) errors.name = "שדה חובה";
    if (!formValues.subject.trim()) errors.subject = "שדה חובה";
    if (!formValues.message.trim()) errors.message = "שדה חובה";

    if (!formValues.email.trim()) {
      errors.email = "שדה חובה";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formValues.email)) errors.email = "כתובת מייל לא תקינה";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
      setFormValues({ name: "", email: "", subject: "", message: "" });
      setFormErrors({});
    }
  };

  const isFormValid =
    formValues.name.trim() &&
    formValues.email.trim() &&
    formValues.subject.trim() &&
    formValues.message.trim() &&
    Object.keys(formErrors).length === 0;

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 4 }}>
        <Typography variant="h4" gutterBottom textAlign="center">
          יצירת קשר
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, textAlign: "center", color: 'text.secondary' }}>
          נשמח לשמוע ממך! אנא מלאי את הפרטים ונחזור אלייך בהקדם האפשרי.
        </Typography>

        {submitted && (
          <Alert severity="success" sx={{ mb: 3 }}>
            תודה על הפנייה! נחזור אלייך בהקדם.
          </Alert>
        )}

        <Box component="form" noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="שם מלא"
                variant="outlined"
                name="name"
                value={formValues.name}
                onChange={handleChange}
                error={!!formErrors.name}
                helperText={formErrors.name}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="כתובת מייל"
                type="email"
                variant="outlined"
                name="email"
                value={formValues.email}
                onChange={handleChange}
                error={!!formErrors.email}
                helperText={formErrors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="נושא הפנייה"
                variant="outlined"
                name="subject"
                value={formValues.subject}
                onChange={handleChange}
                error={!!formErrors.subject}
                helperText={formErrors.subject}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="הודעה"
                multiline
                rows={4}
                variant="outlined"
                name="message"
                value={formValues.message}
                onChange={handleChange}
                error={!!formErrors.message}
                helperText={formErrors.message}
              />
            </Grid>
            <Grid item xs={12} textAlign="center">
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                sx={{ px: 6, py: 1.5, borderRadius: 8 }}
                disabled={!isFormValid}
              >
                שליחה
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
}
