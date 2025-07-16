







import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography, Button, Paper, Snackbar, Alert } from '@mui/material';
import { addToCart } from '../../functions/cartFunctions.js'
import { useState } from 'react';

export default function ProductDetails() {
  const { id } = useParams();
  const products = useSelector(state => state.product.products);
  const isLoggin = useSelector(state => state.user.loggedIn);
  const product = products.find((prod) => prod['_id'] == id);
  if (!product) return <div>לא נמצא מוצר</div>;

  const productsCart = useSelector(state => state.cart.products);
  const dispatch = useDispatch();

  // מצב לטוסט
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // success או error

  const handleAddToCart = () => {
    if (!isLoggin) {
      setSnackbarMessage('יש להתחבר כדי להוסיף לסל');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return;
    }
    addToCart(product, productsCart, dispatch);
    setSnackbarMessage(`${product.name} נוסף לסל`);
    setSnackbarSeverity('success');
    setSnackbarOpen(true);
  };

  return (
    <Box
      sx={{
        minHeight: '80vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        mt: 19,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
          gap: 4,
          transform: 'scale(1)', // הגדלה - גודל רגיל
        }}
      >
        <Paper
          elevation={3}
          sx={{
            width: 340,
            height: 340,
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            ml: 0,
          }}
        >
          <Box
            component="img"
            src={`/${product.image}`}
            alt={product.name}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              borderRadius: 2,
            }}
          />
        </Paper>

        <Paper
          elevation={3}
          sx={{
            width: 370,
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            p: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end',
          }}
        >
          <Typography variant="h4" gutterBottom textAlign="right">
            {product.name}
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom textAlign="right">
            {product.description}
          </Typography>
          <Typography variant="body1" color="text.secondary" gutterBottom textAlign="right">
            {product.technicalDescription}
          </Typography>
          <Typography variant="h5" color="primary" gutterBottom textAlign="right">
            {product.price} ₪
          </Typography>

          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ mt: 2 }}
            onClick={handleAddToCart}
          >
            הוסף לסל
          </Button>
        </Paper>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setSnackbarOpen(false)}
          severity={snackbarSeverity}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
