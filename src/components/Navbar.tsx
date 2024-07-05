import { useLocation, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Navbar: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const handleLogOut = () => {
        localStorage.removeItem('user');
        navigate('/login')
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Logo
                </Typography>
                {location.pathname === '/login' ? (
                    <Button
                        color="inherit"
                        variant='outlined'
                        onClick={() => navigate('/')}
                    >
                        Home
                    </Button>
                ) : (<Button
                    color="inherit"
                    variant='outlined'
                    onClick={handleLogOut}
                >
                    Logout
                </Button>)}
            </Toolbar>
        </AppBar>
    );
}

export default Navbar;