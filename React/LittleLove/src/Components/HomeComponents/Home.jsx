import React from 'react';
import { NavLink } from 'react-router-dom';
import About from './About';
import BestSellers from './BestSellers';
import { useSelector } from 'react-redux';

export default function Home() {
  const categories = useSelector(state => state.category.categories);
  const products = useSelector(state => state.product.products);

  return (
    <>
    <BestSellers list={products} id="bestSellers" />
    <div style={{ padding: '2rem 2.5rem 2rem 2rem' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '2rem', fontSize: '2rem' }}>קטגוריות</h2>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '2rem',
          justifyItems: 'center',
          marginBottom: '4rem',
        }}
      >
        {categories.map((item) => (
          <NavLink
            key={item._id}
            to={`category/${item['_id']}`}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '400px',
              textDecoration: 'none',
              borderRadius: '12px',
              overflow: 'hidden',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            }}
          >
            <img
              src={item.image}
              alt={item.name}
              style={{
                width: '100%',
                height: '300px',
                objectFit: 'cover',
              }}
            />
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '1rem',
                background: 'rgba(255, 255, 255, 0.8)',
                color: '#333',
                fontSize: '1.5rem',
                textAlign: 'center',
                fontWeight: 'bold',
              }}
            >
              {item.name.trim()}
            </div>
          </NavLink>
        ))}
      </div>

    
      <About id="about" />
    </div>
    </>
  );
}
