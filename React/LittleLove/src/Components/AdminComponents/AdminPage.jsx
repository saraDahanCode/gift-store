
import { useState } from 'react';
import {
  Box, Typography, Grid, Card, CardActionArea, CardContent, Dialog, DialogTitle, DialogContent,
  TextField, DialogActions, Button, MenuItem, Select, InputLabel, FormControl, Alert, Container
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { getAllUsers } from '../../APIs/Users';
import { getAllShoppingCarts } from '../../APIs/ShoppingCarts';
import { getAllOrders } from '../../APIs/Orders';
import { getAllProducts } from '../../APIs/Products';
import { useSelector, useDispatch } from 'react-redux';
import { addProduct } from '../../Persist-redux/productsSlice.js';
import { addCategory } from '../../Persist-redux/categoriesSlice.js';

export default function AdminPage() {
  const user = useSelector(state => state.user.userDetails);

  if (!user || user.role !== 'admin') {
    return (
      <Container maxWidth="sm" sx={{ mt: 8 }}>
        <Alert severity="error" variant="filled">
          אין לך הרשאה לבצע פעולות מנהל
        </Alert>
      </Container>
    );
  }

  const [openProduct, setOpenProduct] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);

  // product state
  const [name, setProductName] = useState('');
  const [description, setProductDescription] = useState('');
  const [technicalDescription, setProductTechnicalDescription] = useState('');
  const [price, setProductPrice] = useState('');
  const [image, setProductImage] = useState('');
  const [categoryId, setProductCategoryName] = useState('')
  // category state
  const [categoryImage, setCategoryImage] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  const [categoryBackground, setCategoryBackground] = useState('');

  // Redux state
  const categories = useSelector(state => state.category.categories) || [];
 
  // Form validation
  const isPriceValid = /^\d+(\.\d{1,2})?$/.test(price);
  const isFormCompletelyValid = name && description && price && image && categoryId && isPriceValid;

  // Hooks
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handlers
  // Save product
  const handleSaveProduct = async () => {
    try {
      await dispatch(addProduct({
        name,
        categoryId,
        price,
        description,
        image,
        technicalDescription
      })).unwrap();

      // אם הצליח – לאפס טופס
      setOpenProduct(false);
      setProductName('');
      setProductDescription('');
      setProductPrice('');
      setProductImage('');
      setProductCategoryName('');
      setProductTechnicalDescription('');
    } catch (error) {
      console.error('Error adding product:', error);
     
    }
  }

  // Save category
  const handleSaveCategory = async () => {

    try {
      await dispatch(addCategory({
        name: categoryName,
        image: categoryImage,
        description: categoryDescription,
        background: categoryBackground
      })).unwrap();
      setOpenCategory(false);
      setCategoryName('');
      setCategoryImage('');
      setCategoryDescription('');
      setCategoryBackground('');
    } catch (error) {
      console.error('Error saving category:', error);
    }

  };

  // Open section handler
  const handleOpenSection = async (action) => {
    const data = await action();
    navigate('/viewData', { state: data });
  };

  return (
    <Box p={4}>
      <Typography variant="h3" align="center" gutterBottom>
        עמוד מנהל
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {[
          { title: 'הוספת מוצר', action: () => setOpenProduct(true) },
          { title: 'הוספת קטגוריה', action: () => setOpenCategory(true) },
          { title: 'קבלת כל המוצרים', action: () => handleOpenSection(getAllProducts) },
          { title: 'קבלת כל ההזמנות', action: () => handleOpenSection(getAllOrders) },
          { title: 'קבלת כל הסלי קניות', action: () => handleOpenSection(getAllShoppingCarts) },
          { title: 'קבלת כל המשתמשים', action: () => handleOpenSection(getAllUsers) },
        ].map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <Card sx={{ bgcolor: '#e0f7fa', borderRadius: 2, boxShadow: 1, height: 180 }}>
              <CardActionArea sx={{ height: '100%' }} onClick={item.action}>
                <CardContent sx={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Typography variant="h5" align="center">{item.title}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* דיאלוג הוספת מוצר */}
      <Dialog open={openProduct} onClose={() => setOpenProduct(false)} fullWidth maxWidth="sm">
        <DialogTitle>הוספת מוצר</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="שם המוצר"
            value={name}
            onChange={(e) => setProductName(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="תיאור המוצר"
            multiline
            rows={3}
            value={description}
            onChange={(e) => setProductDescription(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="מפרט טכני "
            multiline
            rows={3}
            value={technicalDescription}
            onChange={(e) => setProductTechnicalDescription(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="מחיר"
            type="text"
            value={price}
            onChange={(e) => setProductPrice(e.target.value)}
            error={!!price && !isPriceValid}
            helperText={!!price && !isPriceValid ? 'נא להזין מחיר מספרי תקין' : ''}
          />
          <TextField
            fullWidth
            margin="normal"
            label="תמונה (URL)"
            value={image}
            onChange={(e) => setProductImage(e.target.value)}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>קטגוריה</InputLabel>
            <Select
              value={categoryId}
              label="קטגוריה"
              onChange={(e) => setProductCategoryName(e.target.value)}
            >
              {categories.map((category) => (
                <MenuItem key={category._id} value={category._id}>
                  {category.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenProduct(false)}>ביטול</Button>
          <Button
            variant="contained"
            color="primary"
            disabled={!isFormCompletelyValid}
            onClick={handleSaveProduct}
          >
            שמור
          </Button>
        </DialogActions>
      </Dialog>

      {/* דיאלוג הוספת קטגוריה */}
      <Dialog open={openCategory} onClose={() => setOpenCategory(false)} fullWidth maxWidth="sm">
        <DialogTitle>הוספת קטגוריה</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="שם הקטגוריה"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="תמונה (URL)"
            value={categoryImage}
            onChange={(e) => setCategoryImage(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="תאור הקטגוריה"
            value={categoryDescription}
            onChange={(e) => setCategoryDescription(e.target.value)}
          />
          <TextField
            fullWidth
            margin="normal"
            label="רקע"
            value={categoryBackground}
            onChange={(e) => setCategoryBackground(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenCategory(false)}>ביטול</Button>
          <Button
            variant="contained"
            color="primary"
            disabled={!categoryName.trim() || !categoryImage.trim() || !categoryDescription.trim() || !categoryBackground.trim()}
            onClick={handleSaveCategory}
          >
            שמור
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
