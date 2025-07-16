
import { Card, CardContent, Typography, Grid, Box, Divider, Button } from "@mui/material";
import { useSelector } from "react-redux";
import { useLoaderData } from "react-router-dom";

export default function OrdersPage() {
  const  {orders}= useLoaderData();
  const loggedIn = useSelector((state) => state.user.loggedIn);
  const products = useSelector((state) => state.product.products);

  return (
    <Box sx={{ p: 4 }}>
      <Box sx={{ textAlign: "center", mb: 4 }}>
        <Typography variant="h4">ההזמנות שלי</Typography>
      </Box>

      {!loggedIn ? (
        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Typography variant="h6" color="error">
            אינך מחובר
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 1 }}>
            התחבר כדי לצפות בהזמנות שלך
          </Typography>
        </Box>
      ) : orders && orders.length > 0 ? (
        <Grid container spacing={3}>
          {orders.map((order) => (
            <Grid item xs={12} md={6} key={order._id}>
              <Card sx={{ height: "100%" }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    הזמנה #{order._id}
                  </Typography>
                  <Typography color="text.secondary">
                    תאריך: {new Date(order.Orderdate).toLocaleDateString()}
                  </Typography>
                  <Typography color="text.secondary">סטטוס: {order.status}</Typography>

                  <Divider sx={{ my: 2 }} />

                  <Typography variant="subtitle1" gutterBottom>פרטי המוצרים:</Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {order.products.map((item, index) => {
                        // נחפש את פרטי המוצר השלם 
                      const fullProduct = products.find((p) => p._id === item.productId);
                      console.log('product',fullProduct)

                      return (
                        <Box
                          key={index}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                            border: "1px solid #ddd",
                            borderRadius: 2,
                            p: 1,
                          }}
                        >
                          {fullProduct ? (
                            <>
                              <img
                                src={fullProduct.image}
                                alt={fullProduct.name}
                                style={{ width: 60, height: 60, objectFit: "cover", borderRadius: 4 }}
                              />
                              <Box>
                                <Typography variant="subtitle2">{fullProduct.name}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                  כמות: {item.quantity} | מחיר ליחידה: ₪{fullProduct.price}
                                </Typography>
                                <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                                  ₪{fullProduct.price * item.quantity}
                                </Typography>
                              </Box>
                            </>
                          ) : (
                            <Typography variant="body2" color="error">
                              מוצר לא נמצא
                            </Typography>
                          )}
                        </Box>
                      );
                    })}
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
                    סכום כולל להזמנה: ₪{order.totalPrice}
                  </Typography>

                 
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Typography variant="h6" color="text.secondary">
            אין הזמנות להצגה
          </Typography>
        </Box>
      )}
    </Box>
  );
}
