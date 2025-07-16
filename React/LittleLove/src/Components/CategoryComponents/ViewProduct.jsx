
import { Card, CardMedia, CardContent, Typography, IconButton, Box, Grid } from '@mui/material';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { NavLink } from 'react-router-dom';
import { addToCart } from '../../functions/cartFunctions.js';
import { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { useDispatch, useSelector } from 'react-redux';


// קומפוננטה שמציגה מוצר בודד בכרטיסייה
export default function ViewProduct({ item }) {
  // mui
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const { _id, name, price, image } = item;
  // בשביל הפונקציה של הוספה לסל
  const dispatch = useDispatch();
  const productsInCart = useSelector(state => state.cart.products);
  const isLoggin = useSelector(state => state.user.loggedIn);
  // בעת הוספה 
  function handleAddToCart(item) {
  if (!isLoggin) {
    alert('יש להתחבר כדי להוסיף לסל');
    return;
  }
    addToCart(item, productsInCart, dispatch);
    setMessage(`${item.name} נוסף לסל`);
    setOpen(true);
  }
  return (
<Grid item xs={12} sm={6} md={4}>
  <Card
    sx={{
      position: 'relative',
      width: '250px',
      height: 250,
      borderRadius: 2,
      // boxShadow: 0.2,
      bgcolor: 'rgba(255, 253, 253, 0.03)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      '&:hover .cart-icon': { opacity: 1 },
    }}
  >
    <Box
      sx={{
        position: 'relative',
        height: '75%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2, // ריווח מצד ימין ושמאל
        pt: 1,
      }}
    >
      <CardMedia
        component="img"
        image={`/${image}`}
        alt={name}
        sx={{
          maxHeight: '200px',
          maxWidth: '200px',
          objectFit: 'contain',
        }}
      />
      <IconButton
        className="cart-icon"
        color="primary"
        onClick={() => handleAddToCart(item)}
        sx={{
          position: 'absolute',
          top: 5,
          right: 5,
          bgcolor: 'white',
          p: 0.5,
          opacity: 0,
          transition: 'opacity 0.3s',
          '&:hover': { bgcolor: 'grey.200' },
        }}
      >
        <ShoppingCartIcon sx={{ fontSize: 18 }} />
      </IconButton>
    </Box>

    <CardContent sx={{ p: 1, textAlign: 'center' }}>
      <Typography variant="subtitle2" noWrap>
        {name}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {price} ₪
      </Typography>
      <NavLink to={`/product/${_id}`} style={{ fontSize: '0.75rem' }}>
        לפרטים
      </NavLink>
    </CardContent>
  </Card>

  <Snackbar
    open={open}
    autoHideDuration={3000}
    onClose={() => setOpen(false)}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
  >
    <Alert onClose={() => setOpen(false)} severity="success" sx={{ width: '100%' }}>
      {message}
    </Alert>
  </Snackbar>
</Grid>


  );
}
