import {
  Container,
  Typography,
  Box,
  Divider,
  Paper,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Grid,
  IconButton
} from "@mui/material";
import React from 'react';
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from '../../functions/cartFunctions.js';

export default function ShoppingCart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { products, totalPrice } = useSelector(state => state.cart);
  const isLoggedIn = useSelector(state => state.user.loggedIn);

  // מקרה: המשתמש לא מחובר
  if (!isLoggedIn) {
    return (
      <Typography variant="h6" textAlign="center" mt={5}>
        עליך להתחבר כדי לראות את סל הקניות
      </Typography>
    );
  }

  // מקרה: הסל ריק
  if (products.length === 0) {
    return (
      <Typography variant="h6" textAlign="center" mt={5}>
        הסל קניות ריק
      </Typography>
    );
  }

  // מקרה: משתמש מחובר ויש מוצרים בסל
  return (
    <Container maxWidth="sm" sx={{ py: 5 }}>
      <Box sx={{ height: 40 }} />

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          mb: 2,
        }}
      >
        <Box
          sx={{
            bgcolor: ' #9fc8ac',
            borderRadius: '50px / 30px',
            px: 4,
            py: 1,
            minWidth: 120,
            maxWidth: 320,
            width: 'fit-content',
            textAlign: 'center',
            boxShadow: '0 2px 8px rgb(255, 255, 255)',
            display: 'inline-block',
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              fontWeight: "bold",
              color: '#fff',
              fontFamily: 'inherit',
              fontSize: { xs: '1.3rem', sm: '2rem' },
              m: 0,
            }}
          >
            סל הקניות שלך
          </Typography>
        </Box>
      </Box>
      {/* רווח קטן בין הכותרת לכרטיסייה */}
      <Box sx={{ height: 16 }} />

      <Paper elevation={3} sx={{ borderRadius: 4, overflow: "hidden", px: 2 }}>
        <List>
          {products.map((item) => (
            <React.Fragment key={item.productId}>
              <ListItem
                sx={{ py: 2 }}
                secondaryAction={
                  <IconButton edge="end" aria-label="delete" size="medium">
                    <DeleteIcon fontSize="medium" />
                  </IconButton>
                }
                onClick={() => removeFromCart(item.productId, products, dispatch)}
              >
                <ListItemAvatar>
                  <Avatar
                    variant="square"
                    src={`/${item.image}`}
                    alt={item.name}
                    sx={{ width: 76, height: 76, borderRadius: 2 }}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: "1.35rem",
                        textAlign: "center",
                        fontWeight: "normal", // לא bold
                        width: "100%",
                      }}
                    >
                      {item.name}
                    </Typography>
                  }
                  secondary={
                    <Typography variant="body1" sx={{ fontSize: "1rem", textAlign: "center" }}>
                      {item.technicalDescription}
                    </Typography>
                  }
                  sx={{ ml: 2, mr: 2 }}
                />
                <Typography variant="h6" sx={{ fontSize: "1.2rem", minWidth: 60, textAlign: "center" }}>
                  ₪{item.price}
                </Typography>
              </ListItem>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
        </List>

        <Box sx={{ p: 2 }}>
          <Grid container justifyContent="space-between" alignItems="center">
            <Typography variant="h6" sx={{ fontSize: "1.2rem" }}>סך הכל:</Typography>
            <Typography variant="h6" fontWeight="bold" sx={{ fontSize: "1.2rem" }}>₪{totalPrice}</Typography>
          </Grid>

          <Box textAlign="center" mt={3}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              sx={{ px: 5, py: 1.5, borderRadius: 5, fontSize: "1.15rem" }}
              onClick={() => navigate("/personalDetails")}
            >
              מעבר לתשלום
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}
