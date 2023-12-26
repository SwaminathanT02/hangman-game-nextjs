import React, { useState, useEffect } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import Typography from '@mui/material/Typography';
import { Box, Button } from '@mui/material';
import Avatar from '@mui/material/Avatar';
import MenuIcon from '@mui/icons-material/Menu';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { useSession, signOut } from "next-auth/react"

const boxSx = {
    fontFamily: 'fantasy',
    color: 'black',
    fontSize: '1rem'
}

const Navbar = () => {
    const [user, setUser] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const { data: session } = useSession();
    const settings = [];
    const handleOpenSettingsMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseSettingsMenu = () => {
        setAnchorElUser(null);
    };

    if (session) {
        settings.push({ name: 'Instructions', Url: '/instructions' });
        settings.push({ name: 'Leaderboard', Url: '/leaderboard' });
        settings.push({ name: 'Logout', Url: '' });
    }

    useEffect(() => {
        if (session) {
            setUser(session?.user?.name?.split(' ')[0]?.trim()?.toUpperCase());
        }
        else {
            setUser(null);
        }
    }, [session]);

    return (
        <AppBar
            position="static"
            style={{ background: 'white' }}>
            <Toolbar sx={{ borderRadius: '10px', overflow: 'hidden', justifyContent: 'space-between' }}>
                <Box style={{ display: 'flex', alignItems: 'center' }}>
                    <SentimentSatisfiedAltIcon sx={{ color: 'black' }}></SentimentSatisfiedAltIcon>
                    <Typography
                        variant="h5"
                        noWrap
                        component="a"
                        href="/"
                        sx={{
                            mx: 2,
                            mt: 1,
                            fontWeight: 900,
                            fontFamily: 'fantasy',
                            color: 'black',
                            letterSpacing: '.1rem',
                            textDecoration: 'none',
                            textAlign: 'center',
                            width: '100%',
                        }}
                    >
                        HANGMAN
                    </Typography>
                </Box>
                <><h1></h1></>
                <Box sx={{ display: "flex" }}>
                    {session
                        ? (<>
                            <Tooltip title="Settings">
                                <IconButton onClick={handleOpenSettingsMenu} sx={{ p: 0 }}>
                                    {session?.user?.image
                                        ? <Avatar alt="User Icon" src={session?.user?.image} />
                                        : <MenuIcon></MenuIcon>}
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{ mt: '55px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseSettingsMenu}
                            >
                                {user &&
                                    (
                                        <MenuItem key={user} sx={{ justifyContent: "center" }}>
                                            <Typography
                                                sx={{
                                                    color: "black",
                                                    fontWeight: "900",
                                                    fontSize: "0.9em"
                                                }}>
                                                {user}
                                            </Typography>
                                        </MenuItem>
                                    )}
                                {settings.map((setting) => (
                                    <MenuItem key={setting.name} onClick={handleCloseSettingsMenu} sx={{ justifyContent: "center", fontFamily: "fantasy" }}>
                                        {setting.name === 'Logout'
                                            ? <Button sx={boxSx} onClick={() => { signOut({ callbackUrl: '/' }) }}>{setting.name}</Button>
                                            : <Button sx={boxSx} href={setting.Url}>{setting.name}</Button>}
                                    </MenuItem>
                                ))}
                            </Menu>
                        </>)
                        : (<Button sx={boxSx} href='/login'>Sign-in</Button>)}
                </Box>
            </Toolbar>
        </AppBar>
    );
}
export default Navbar;