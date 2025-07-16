import React from "react";
import { Container, Typography, Box } from "@mui/material";

const privacyPolicySections = [
    {
        title: "איסוף מידע אישי",
        content: `אנו אוספים מידע אישי שניתן מרצונך בלבד, כגון שם, כתובת, טלפון וכתובת מייל, במטרה לאפשר את ביצוע הרכישה, המשלוח ושיפור השירות.`,
    },
    {
        title: "שימוש במידע",
        content: `המידע שנאסף משמש אך ורק למטרות המפורטות, כגון עיבוד הזמנות, תקשורת איתך בנוגע להזמנה, ושיפור חוויית המשתמש באתר. לא נשתמש במידע לצרכים אחרים ללא הסכמתך המפורשת.`,
    },
    {
        title: "אבטחת מידע",
        content: `המידע האישי מאוחסן ומטופל בהתאם לסטנדרטים הגבוהים ביותר של אבטחת מידע. אנו משתמשים בטכנולוגיות הצפנה ועדכונים שוטפים למניעת גישה בלתי מורשית או דליפות מידע.`,
    },
    {
        title: "שיתוף מידע עם צדדים שלישיים",
        content: `פרטיך האישיים אינם מועברים או נמכרים לגורמים חיצוניים, למעט ספקי שירות נדרשים (כגון חברות שילוח או מערכות תשלום) הפועלים כחלק מתהליך הרכישה ומחויבים לשמירת סודיות.`,
    },
    {
        title: "זכויותיך",
        content: `יש לך את הזכות לעיין במידע האישי שלך, לעדכן או למחוק אותו בהתאם לחוקי הגנת הפרטיות. לקבלת בקשות ועדכונים ניתן לפנות אלינו דרך דף יצירת הקשר.`,
    },
    {
        title: "שינויים במדיניות הפרטיות",
        content: `אנו שומרים לעצמנו את הזכות לעדכן את מדיניות הפרטיות בהתאם לצורך, ונעדכן אותך במידה ויחולו שינויים מהותיים. מומלץ לעיין במדיניות מעת לעת.`,
    },
];

export default function PrivacyPolicy() {
    return (
        <Container maxWidth="md" sx={{ py: 6 }}>
            <Typography
                variant="h4"
                align="center"
                gutterBottom
                sx={{ fontWeight: 600, fontFamily: "Arial, sans-serif" }}
            >
                מדיניות פרטיות
            </Typography>
            <Box sx={{ mt: 4 }}>
                {privacyPolicySections.map((section, idx) => (
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
