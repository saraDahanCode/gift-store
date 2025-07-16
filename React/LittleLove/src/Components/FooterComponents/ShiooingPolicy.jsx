import React from "react";
import { Container, Typography, Box } from "@mui/material";

const shippingPolicySections = [
  {
    title: "זמני משלוח",
    content: `משלוחים מתבצעים תוך 3-7 ימי עסקים מרגע אישור ההזמנה. ייתכנו עיכובים בתקופות עומס או חגים.`,
  },
  {
    title: "עלויות משלוח",
    content: `עלות המשלוח משתנה בהתאם לאזור המשלוח ומשקל החבילה. במקרים מסוימים יתכן משלוח חינם בהתאם לקמפיינים או רכישות מעל סכום מסוים.`,
  },
  {
    title: "אזורי משלוח",
    content: `אנו מבצעים משלוחים בכל רחבי הארץ. משלוחים לאזורים מרוחקים עשויים להתארך ולכלול עלויות נוספות.`,
  },
  {
    title: "מעקב אחר משלוח",
    content: `לאחר שליחת ההזמנה תקבלי הודעת מעקב עם פרטי המשלוח והקישור למעקב בזמן אמת.`,
  },
  {
    title: "החזרות ותקלות במשלוח",
    content: `במקרה של מוצר פגום, חסר או שלא הגיע, אנא פנו אלינו תוך 7 ימים מיום קבלת המשלוח לטיפול מיידי.`,
  },
];

export default function ShippingPolicy() {
  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        sx={{ fontWeight: 600, fontFamily: "Arial, sans-serif" }}
      >
        מדיניות משלוחים
      </Typography>
      <Box sx={{ mt: 4 }}>
        {shippingPolicySections.map((section, idx) => (
          <Box key={idx} sx={{ mb: 4 }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                color: "#4a4a4a",
                fontFamily: "Arial, sans-serif",
                mb: 1,
              }}
            >
              {section.title}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                fontSize: "1.15rem",
                lineHeight: 1.8,
                color: "#666666",
                fontFamily: "Georgia, serif",
                whiteSpace: "pre-line",
              }}
            >
              {section.content}
            </Typography>
          </Box>
        ))}
      </Box>
    </Container>
  );
}
