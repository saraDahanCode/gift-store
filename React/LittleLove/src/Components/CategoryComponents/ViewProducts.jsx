import React from 'react'
import ViewProduct from './ViewProduct.jsx'
import { Grid } from '@mui/material';


// קומפוננטה שמציגה כמה פעמים את הקומפוננטה שמציגה מוצר בודד
export default function ViewProducts({ list }) {
  return (
  <Grid container rowSpacing={3} columnSpacing={1}>


  {list.map(product => (
    <ViewProduct key={product._id} item={product} />
  ))}
</Grid>
  );
}
