

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Paper, Typography, Divider, List, ListItem, ListItemText, Box, Button } from '@mui/material';

export default function OrderConfirmation() {
  const orderData = useLocation().state;
  const navigate = useNavigate();

  if (!orderData) return <Typography>לא נמצאה הזמנה</Typography>;

  const { customerDetails, products, totalPrice, status, Orderdate } = orderData;

  return (
    <Box sx={{ maxWidth: 500, margin: '2rem auto', p: 2 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>אישור הזמנה</Typography>
        <Divider sx={{ mb: 2 }} />

        <Typography variant="subtitle1" gutterBottom>פרטי הלקוח</Typography>
        <Typography>{customerDetails.Fname} {customerDetails.Lname}</Typography>
        <Typography>{customerDetails.email}</Typography>
        <Typography>{customerDetails.phone}</Typography>
        <Typography>{customerDetails.address.city}, {customerDetails.address.street} {customerDetails.address.ApartmentNumber}</Typography>

        <Divider sx={{ my: 2 }} />
        <Typography variant="subtitle1" gutterBottom>מוצרים בהזמנה</Typography>
        <List dense>
          {products.map((product, index) => (
            <ListItem key={index} disableGutters>
              <ListItemText primary={`מזהה מוצר: ${product.productId}`} secondary={`כמות: ${product.quantity}`} />
            </ListItem>
          ))}
        </List>

        <Divider sx={{ my: 2 }} />
        <Typography>מחיר כולל: ₪{totalPrice}</Typography>
        <Typography>סטטוס הזמנה: {status}</Typography>
        <Typography>תאריך: {new Date(Orderdate).toLocaleString()}</Typography>

        <Button
          variant="contained"
          color="primary"
          sx={{ mt: 3 }}
          onClick={() => navigate('/')}
          fullWidth
        >
          חזרה לדף הבית
        </Button>
      </Paper>
    </Box>
  );
}
