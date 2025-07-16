
import React, { useState, useEffect, useRef } from 'react';
import {
  AppBar,
  Toolbar,
  Box,
  Typography,
  Button,
  InputBase,
  IconButton,
  Container,
  ClickAwayListener,
  Menu,
  MenuItem
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../Persist-redux/userSlice';
export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loggedIn, userDetails } = useSelector(state => state.user);
  const categories = useSelector(state => state.category.categories);
  const isAllowed = userDetails && userDetails.role === 'admin';

  const [showSearch, setShowSearch] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);
  const timeoutRef = useRef(null);
  const [scrolledPastInk, setScrolledPastInk] = useState(false);

  const transparentPages = ['/', '/bestSellers'];
  const isTransparentPage = transparentPages.includes(location.pathname);

  useEffect(() => {
    if (!isTransparentPage) {
      setScrolledPastInk(true);
      return;
    }

    const handleScroll = () => {
      const ink = document.getElementById('ink-zone');
      if (!ink) {
        setScrolledPastInk(true);
        return;
      }

      const rect = ink.getBoundingClientRect();
      const headerHeight = 80;
      const progress = Math.min(Math.max((headerHeight - rect.top) / rect.height, 0), 1);

      setScrolledPastInk(progress >= 1);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  const handleMouseEnter = (event) => {
    clearTimeout(timeoutRef.current);
    setAnchorEl(event.currentTarget);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setAnchorEl(null), 200);
  };

  const handleMenuMouseEnter = () => clearTimeout(timeoutRef.current);
  const handleMenuMouseLeave = () => {
    timeoutRef.current = setTimeout(() => setAnchorEl(null), 200);
  };

  const handleNavigate = (path) => {
    navigate(`/category/${path}`);
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const handleUserMenuOpen = (event) => setUserMenuAnchor(event.currentTarget);
  const handleUserMenuClose = () => setUserMenuAnchor(null);

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: scrolledPastInk ? 'white' : 'rgba(255,255,255,0.3)',
        color: 'black',
        boxShadow: scrolledPastInk ? '0 2px 6px rgba(0,0,0,0.12)' : 'none',
        borderBottom: '2px solid  #b3c3b9',
        transition: 'background-color 0.5s ease, box-shadow 0.5s ease',
        py: 1.2,
        direction: 'rtl',
        zIndex: 1300,
      }}
    >
      <Container maxWidth="xl" disableGutters>
        <Toolbar
          sx={{
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '80px',
            position: 'relative',
          }}
        >
          {/* צד ימין */}
          <Box
            sx={{
              position: 'absolute',
              right: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              display: 'flex',
              alignItems: 'center',
              gap: 1.5,
              pr: 0,
            }}
          >
            <ClickAwayListener onClickAway={() => setShowSearch(false)}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    bgcolor: '#f0f0f0',
                    borderRadius: '30px',
                    px: showSearch ? 2 : 0,
                    transition: 'all 0.4s ease',
                    width: showSearch ? '200px' : '0px',
                    overflow: 'hidden',
                  }}
                >
                  <SearchIcon sx={{ mr: 1, color: '#999', fontSize: 30 }} />
                  <InputBase
                    placeholder="מה תרצי שאחפש לך?"
                    fullWidth
                    sx={{ fontSize: '0.95rem' }}
                    autoFocus
                  />
                </Box>
                {!showSearch && (
                  <IconButton onClick={() => setShowSearch(true)} sx={{ fontSize: 30 }}>
                    <SearchIcon sx={{ fontSize: 20 }} />
                  </IconButton>
                )}
              </Box>
            </ClickAwayListener>

            <NavLink to="/userOrders">
              <IconButton sx={{ fontSize: 20 }}>
                <Inventory2Icon sx={{ fontSize: 20 }} />
              </IconButton>
            </NavLink>
            <NavLink to="/shopeCart">
              <IconButton sx={{ fontSize: 20 }}>
                <ShoppingCartIcon sx={{ fontSize: 20 }} />
              </IconButton>
            </NavLink>
            <IconButton onClick={handleUserMenuOpen} sx={{ fontSize: 20 }}>
              <PersonIcon sx={{ fontSize: 20 }} />
            </IconButton>
            <Menu
              anchorEl={userMenuAnchor}
              open={Boolean(userMenuAnchor)}
              onClose={handleUserMenuClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
              {!loggedIn ? (
                [
                  <MenuItem key="login" onClick={() => { navigate('/login'); handleUserMenuClose(); }}>התחברות</MenuItem>,
                  <MenuItem key="register" onClick={() => { navigate('/signUp'); handleUserMenuClose(); }}>הרשמה</MenuItem>,
                ]
              ) : (
                [
                  <MenuItem key="/userProfile" onClick={() => { navigate('/userProfile'); handleUserMenuClose(); }}>{userDetails.name}</MenuItem>,
                  <MenuItem key="logout" onClick={() => { dispatch(logoutUser()); handleUserMenuClose(); }}>התנתקות</MenuItem>,
                ]
              )}
            </Menu>
          </Box>

          {/* ניווט מרכזי */}
          <Box
            sx={{
              display: 'flex',
              gap: 3,
              justifyContent: 'flex-start',
              ml: 2,
              alignItems: 'flex-end',
              fontFamily: 'Arial, sans-serif',
              fontWeight: 400,
              fontSize: '1.05rem',
            }}
          >
            <NavLink to="/contact" className="link" style={{ textDecoration: 'none', color: 'black' }}>
              צור קשר
            </NavLink>

            <Box onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} sx={{ display: 'inline-block' }}>
              <Button
                sx={{
                  color: 'black',
                  padding: '8px 16px',
                  minWidth: 'auto',
                  fontFamily: 'Arial, sans-serif',
                  fontWeight: 400,
                  fontSize: '1.4rem',
                  '&:hover': { backgroundColor: '#e0e0e0' },
                }}
                aria-controls={open ? 'category-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
              >
                קטגוריות
              </Button>
              <Menu
                id="category-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={() => setAnchorEl(null)}
                MenuListProps={{
                  onMouseEnter: handleMenuMouseEnter,
                  onMouseLeave: handleMenuMouseLeave,
                }}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                disableAutoFocusItem
              >
                {categories.map((item) => (
                  <MenuItem key={item._id} onClick={() => handleNavigate(item['_id'])}>
                    {item.name}
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <NavLink to="/#about" className="link" style={{ textDecoration: 'none', color: 'black' }}>
              הסיפור שלנו
            </NavLink>
            <NavLink to="/#bestSellers" className="link" style={{ textDecoration: 'none', color: 'black' }}>
              מוצרים מובילים
            </NavLink>
            {isAllowed && (
              <NavLink
                to="/adminPage"
                onClick={(e) => {
                  if (!isAllowed) {
                    e.preventDefault();
                    alert("אין לך הרשאה");
                  }
                }}
                style={{ textDecoration: 'none', color: 'black' }}
              >
                ניהול
              </NavLink>
            )}
          </Box>

          <Box
            sx={{
              position: 'absolute',
              left: 0,
              top: '50%',
              transform: 'translateY(-50%)',
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'left',
              pl: 2,
            }}
          >
            <NavLink to="/" style={{ textDecoration: 'none' }}>
              <Typography variant="h2" sx={{ fontWeight: 600, color: '#c6892e', fontFamily: 'serif', lineHeight: 1 }}>
                Aluma.
              </Typography>
            </NavLink>
            <Typography variant="body1" sx={{ fontSize: '1rem', color: '#999' }}></Typography>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
