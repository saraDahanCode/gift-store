
import React from 'react';
import {
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useLocation } from 'react-router-dom';

export default function ViewData({ title = 'נתונים', color = '#bfa14f' }) {
  const data = useLocation().state;

  if (!data || data.length === 0) {
    return (
      <Box display="flex" justifyContent="center" mt={5}>
        <Typography variant="h6" color="text.secondary">
          אין נתונים להצגה
        </Typography>
      </Box>
    );
  }

  const columns = Object.keys(data[0]);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mt={5} width="100%">
      <Typography variant="h4" gutterBottom sx={{ color, fontWeight: 'bold' }}>
        {title}
      </Typography>

      <TableContainer
        component={Paper}
        sx={{
          width: '100%',
          mt: 3,
        }}
      >
        <Table sx={{ width: '100%' }}>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell
                  key={col}
                  align="right"
                  sx={{
                    fontWeight: 'bold',
                    borderBottom: '2px solid rgba(0,0,0,0.2)',
                    padding: '12px',
                    wordBreak: 'break-word', 
                    whiteSpace: 'normal', 
                  }}
                >
                  {col}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, i) => (
              <TableRow key={i}>
                {columns.map((col) => (
                  <TableCell
                    key={col}
                    align="right"
                    sx={{
                      borderBottom: '1px solid rgba(0,0,0,0.1)',
                      padding: '12px',
                      wordBreak: 'break-word',
                      whiteSpace: 'normal',
                    }}
                  >
                    {typeof row[col] === 'object' ? JSON.stringify(row[col]) : row[col]}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
