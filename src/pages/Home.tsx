// src/pages/Home.tsx

import React from 'react';
import DepartmentComponent from '../components/DepartmentComponent';
import PostTable from '../components/PostTable';
import { Container, Box, Divider, Typography } from '@mui/material';

const Home: React.FC = () => {
    return (
        <Container maxWidth="md">
            <Box sx={{ padding: 4 }}>

                {/* PostTable Section */}
                <Box sx={{ marginBottom: 4 }}>
                    <Typography variant="h5" gutterBottom>
                        Posts Table
                    </Typography>
                    <PostTable />
                </Box>

                <Divider sx={{ marginY: 4 }} />

                <Box>
                    <DepartmentComponent />
                </Box>
            </Box>
        </Container>
    );
};

export default Home;
