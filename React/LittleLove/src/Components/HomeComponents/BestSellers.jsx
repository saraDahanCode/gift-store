import React, { useRef, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

export default function BestSellers({ list }) {
  const BestSellers = list.filter((product) => product.isBestSeller);
  const [itemWidth, setItemWidth] = useState(0);
  const itemRef = useRef(null);

  // מחשב את הרוחב של פריט אחד כדי לחשב את אורך האנימציה
  useEffect(() => {
    if (itemRef.current) {
      setItemWidth(itemRef.current.offsetWidth);
    }
  }, [BestSellers.length]);

  // מחשב את משך האנימציה לפי כמות המוצרים
  const duration = BestSellers.length > 0 ? (BestSellers.length * 3) : 18; // 3 שניות לכל מוצר

  // משכפל את הרשימה עד שהרוחב הכולל מכסה לפחות פעמיים את הרוחב של ה-container
  const [repeatCount, setRepeatCount] = useState(2);
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current && itemWidth && BestSellers.length > 0) {
      const containerWidth = containerRef.current.offsetWidth;
      const totalItemsWidth = itemWidth * BestSellers.length;
      // צריך לפחות פי 2 כדי שלא יהיה ריק
      const needed = Math.ceil((containerWidth * 2) / totalItemsWidth);
      setRepeatCount(needed > 2 ? needed : 2);
    }
  }, [itemWidth, BestSellers.length]);

  return (
    <>
      <Typography variant="h4" align="center" mb={4}>
        חמים באתר
      </Typography>

      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Box
          ref={containerRef}
          sx={{
            overflow: 'hidden',
            width: '100%',
            maxWidth: 950,
            px: 2,
            mx: 'auto',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              width: BestSellers.length > 0 ? `${itemWidth * BestSellers.length * repeatCount}px` : 'auto',
              animation: `marquee ${duration}s linear infinite`,
              '@keyframes marquee': {
                '0%': {
                  transform: 'translateX(0)',
                },
                '100%': {
                  transform: BestSellers.length > 0
                    ? `translateX(-${itemWidth * BestSellers.length}px)`
                    : 'translateX(-50%)',
                },
              },
            }}
          >
            {Array.from({ length: repeatCount }).flatMap((_, repIdx) =>
              BestSellers.map((item, index) => (
                <Box
                  key={`${item._id}-${repIdx}-${index}`}
                  ref={repIdx === 0 && index === 0 ? itemRef : null}
                  sx={{
                    minWidth: 160,
                    textAlign: 'center',
                    backgroundColor: '#fff',
                    padding: 2,
                    borderRadius: 2,
                    mx: 0,
                  }}
                >
                  {item.image && (
                    <NavLink to={`/product/${item._id}`}>
                      <Box
                        component="img"
                        src={item.image}
                        alt={item.name}
                        sx={{
                          width: 150,
                          height: 150,
                          objectFit: 'cover',
                          borderRadius: '50%',
                          mt: 1,
                        }}
                      />
                    </NavLink>
                  )}
                  <Typography variant="subtitle2" mt={1}>
                    {item.name}
                  </Typography>
                </Box>
              ))
            )}
          </Box>
        </Box>
      </Box>
    </>
  );
}
