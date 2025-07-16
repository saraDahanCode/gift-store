import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// קומפוננטה שברגע שהנתיב משתנה גוללת את העמוד לראשיתו
export default function ScrollToTop() {
  const { pathname } = useLocation();

  //useEffect -ברגע שיהיה שינוי בלוקשיין במיקום שאנו נמצאות בו אז נגלול את העמוד למעלה
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
