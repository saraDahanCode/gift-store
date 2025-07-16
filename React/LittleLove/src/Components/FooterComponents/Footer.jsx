

import { NavLink } from 'react-router-dom';
import {  useSelector } from 'react-redux';
import "./Footer.css";
import "../../styles/App.css";

export default function Footer() {
  const categories=useSelector(state=>state.category.categories)

  const columns = [ 
    [
      { path: '/termsOfUse', name: 'תקנון האתר' },
      { path: '/shippingPolicy', name: 'מדיניות משלוחים ' },
      { path: '/returnPolicy', name: 'מדיניות ביטולים החזרות' },
      { path: '/privacyPolicy', name: 'מדיניות פרטיות' },
      { path: '/accessibilityStatement', name: 'הצהרת נגישות' }
    ],
    [
      { path: '/contact', name: 'צור קשר' },
    
    ]
  ];

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* הקטגוריות הדינמיות */}
        <div className="footer-column">
          <ul className="footer-links">
            { categories.map(cat => (
              <li key={cat._id}>
                <NavLink to={`/category/${cat._id}`} className="footer-link">
                  {cat.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

       
        {columns.map((links, colIndex) => (
          <div key={colIndex} className="footer-column">
            <ul className="footer-links">
              {links.map((link, linkIndex) => (
                <li key={linkIndex}>
                  <NavLink to={link.path} className="footer-link">
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
}


