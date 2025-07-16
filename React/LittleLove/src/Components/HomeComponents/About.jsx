import React from 'react';
import { Box, Typography, Paper } from '@mui/material';
export default function About() {
  return (
    <Box
      id="about"
      sx={{
        display: 'flex',
        justifyContent: 'center',
        padding: { xs: 2, md: 4 },
        backgroundColor: '#fefefe',
        scrollMarginTop: '110px',  // <-- הוספה כאן
      }}
    >
      <Paper
        elevation={2}
        sx={{
          maxWidth: 800,
          padding: { xs: 3, md: 5 },
          backgroundColor: '#fcfcfc',
          borderRadius: 4,
        }}
      >
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 500 }}>
          קצת עלינו
        </Typography>

        <Typography paragraph>
          יש רגעים שפשוט מתחשק לעצור.
          לנשום עמוק, להניח את היומיום בצד, ולבחור משהו קטן שמעלה חיוך.
        </Typography>

        <Typography paragraph>
          המקום הזה נולד מתוך אהבה לפרטים הקטנים – לדברים שמשדרים חמימות, רוך, ושמחה שקטה.
          הכל כאן נאסף לאט-לאט, מתוך תחושה, מתוך טעם.
        </Typography>

        <Typography paragraph>
          אנחנו אוהבות את הפשטות הזו שיש בה פינוק. לא משהו מצועצע, לא משהו יקר מדי – פשוט דברים יפים, כאלה שמרגישים נכון.
          כמו מארז מתנה שבחרת באהבה. כמו פינה בבית שמאירה לך את היום.
        </Typography>

        <Typography>
          אם את (או אתה) אוהבים רגעים קטנים של תשומת לב, רוך, וצבע שמלטף את הלב – נשמח שתהיו חלק מהמרחב הזה.
        </Typography>
      </Paper>
    </Box>
  );
}
