
import React  from 'react';
import ViewProducts from './ViewProducts';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import './category.css';

export default function Category() {


    const categories = useSelector(state => state.category.categories);
    const products = useSelector(state => state.product.products);
   

    const { id } = useParams();
    const category = categories.find((cat) => cat['_id'] == id);
    const productsByCategory = products.filter((product) => product.categoryId == id);

    return (
        <div className="category-box">


            <img src={`/${category.image}`} alt="תיאור קטגוריה" className="category-banner" />

            <div className="category-info">
                <h2>{category.name}</h2>
                <p>{category.description}</p>
            </div>

            <div className="category-display">
                <ViewProducts list={productsByCategory} />
            </div>
        </div>
    );
}

// // מה למדתי מעמוד זה?
// // הקריאה ל־useParams() מחזירה אובייקט של פרמטרים דינמיים מה-URL, שבו כל מפתח הוא שם של פרמטר שהוגדר בנתיב (route), והערך הוא מחרוזת שנשלפה מהכתובת בפועל.




















