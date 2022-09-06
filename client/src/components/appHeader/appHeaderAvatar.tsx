import Avatar from '@mui/material/Avatar';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useAppDispatch, useAppSelector } from 'src/hooks/hooks';
import Button from '@mui/material/Button';
import { openSignUpModal, signOut } from 'src/store/slices/authorizationSlice';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import IconButton from '@mui/material/IconButton';
import { grey } from '@mui/material/colors';
import MenuItem from '@mui/material/MenuItem';
import styles from './appHeader.module.scss';

const AppHeaderAvatar = () => {
  const { registeredUserData } = useAppSelector((store) => store.Auth);
  const dispatch = useAppDispatch();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const Logout = () => {
    setAnchorEl(null);
    dispatch(signOut());
  };
  if (!registeredUserData) {
    return (
      <div className={styles.header__avatar}>
        <Button onClick={() => dispatch(openSignUpModal())} size="small">
          регистрация
        </Button>
      </div>
    );
  }
  return (
    <div className={styles.header__avatar}>
      <Avatar
        className={styles.header__avatar_img}
        alt="Avatar"
        src="src/assets/AvatarImg.png"
        sx={{ width: 28, height: 28 }}
      />
      <p className={styles.header__avatar_name}>{registeredUserData.userName}</p>
      <IconButton
        aria-label="delete"
        aria-controls={open ? 'demo-positioned-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        className={styles.header__avatar_more}
      >
        <ExpandMoreIcon
          sx={{ color: '#fff' }}
        />
      </IconButton>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <Link to="/userProfile">
          <MenuItem sx={{ color: grey[900] }} onClick={handleClose}>Профиль</MenuItem>
        </Link>
        <Link to="/">
          <MenuItem sx={{ color: grey[900] }} onClick={Logout}>Выйти</MenuItem>
        </Link>
      </Menu>
    </div>
  );
};
export default AppHeaderAvatar;
