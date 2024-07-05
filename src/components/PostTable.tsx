import React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import axios from 'axios';
import { Post } from '../types/index';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 100 },
    { field: 'userId', headerName: 'User ID', width: 150 },
    { field: 'title', headerName: 'Title', width: 300 },
    { field: 'body', headerName: 'Body', width: 600 },
];

const PostTable: React.FC = () => {
    const [posts, setPosts] = React.useState<Post[]>([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState<string | null>(null);

    React.useEffect(() => {
        const fetchPosts = async () => {
            try {
                const storedPosts = sessionStorage.getItem('posts');
                if (storedPosts) {
                    setPosts(JSON.parse(storedPosts));
                } else {
                    const response = await axios.get<Post[]>('https://jsonplaceholder.typicode.com/posts');
                    setPosts(response.data);
                    sessionStorage.setItem('posts', JSON.stringify(response.data));
                }
            } catch (error) {
                setError('Error fetching posts');
                console.error('Error fetching posts:', error);
            }
            finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    return (
        <Box sx={{ height: 600, width: '100%' }}>
            {error ? (
                <div>{error}</div>
            ) : (
                <DataGrid
                    rows={posts}
                    columns={columns}
                    disableRowSelectionOnClick
                    autoPageSize={true}
                    loading={loading}
                />
            )}
        </Box>
    );
};

export default PostTable;
