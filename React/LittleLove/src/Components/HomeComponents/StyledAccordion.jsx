
import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const SimpleAccordion = () => {
  return (
    <>
      {[1, 2, 3].map((item) => (
        <Accordion
          key={item}
          elevation={0}
          sx={{
            backgroundColor: 'transparent',
            boxShadow: 'none',
            border: 'none',
            '&::before': { display: 'none' },
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            sx={{
              padding: 0,
              minHeight: 'unset',
              '& .MuiAccordionSummary-content': {
                margin: 0,
              },
            }}
          >
            <Typography>לחצי כאן</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ padding: '8px 0' }}>
            <Typography>הטקסט נפתח</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </>
  );
};

export default SimpleAccordion;
