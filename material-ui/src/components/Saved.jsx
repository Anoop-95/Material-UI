import React from 'react';
import {
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Box,
} from '@mui/material';
import ShareIcon from '@mui/icons-material/Share';
import DeleteIcon from '@mui/icons-material/Delete';

import { useSelector, useDispatch } from 'react-redux';
import { removeBookmark } from '../Store/BookmarkSlice';

const Saved = () => {
  const dispatch = useDispatch();
  const bookmarks = useSelector((state) => state.bookmark);

  const handleDelete = (url) => {
    dispatch(removeBookmark(url)); // Using URL as unique ID
  };

  const openArticle = (url) => {
    window.open(url, '_blank');
  };

  return (
    <>
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" mb={3} sx={{ fontFamily: 'Bebas Neue' }}>
        Saved Articles
      </Typography>

      {bookmarks.length === 0 ? (
        <Typography  sx={{ fontFamily: 'Bebas Neue' }}>No saved articles yet.
         <Box
            sx={{
              height: '80vh', // Adjust as needed
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <img src="/ai_image.png" alt="Loading..." style={{ width: '50rem', height:"50rem" }} />
            
          </Box>
          </Typography>
      ) : (
        <Grid container spacing={4}>
          {bookmarks.map((item) => (
            
              <Card
                key={item.url}
                sx={{
                  maxWidth: '25rem',
                  borderRadius: 2,
                  boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
                  p: 1,
      
                }}
              >
                <CardContent sx={{ pb: 1 }}>
                  <Typography
                    variant="h5"
                    sx={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {item.source ? item.source : "Unkonw Source"}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      display: 'inline-block',
                      backgroundColor: '#ffea00',
                      px: 1,
                      fontWeight: 'bold',
                      mt: 0.5,
                      borderRadius: 2,
                      fontFamily: "'Bebas Neue', sans-serif",
                    }}
                  >
                    Category
                  </Typography>
                </CardContent>

                <CardMedia
                component="img"
                        
                image={item.image ? item.image : "./cover_image2.jpg"}
                        
                sx={{ borderRadius: 2, objectFit: 'cover', width: '100%', height:"18rem",  cursor: 'pointer', }}
                  onClick={openArticle}
                />

                <CardContent
                  sx={{ pt: 2, cursor: 'pointer' }}
                  onClick={() => openArticle(item.url)}
                >
                  <Typography
                    variant="h3"
                    fontSize="1.5rem"
                    fontWeight="500"
                    sx={{ mb: 2, fontFamily: 'Bebas Neue' }}
                  >
                    {item.title ? item.title.slice(0, 40) + '...' : 'No Title'}
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: '0.85rem',
                      mb: 2,
                      fontFamily: "'Bebas Neue', sans-serif",
                    }}
                  >
                    {item.description
                      ? item.description.slice(0, 70) + '...'
                      : 'No description available'}
                  </Typography>
                </CardContent>

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <IconButton>
                    <ShareIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(item.url)}>
                    <DeleteIcon sx={{ color: 'red' }} />
                  </IconButton>
                </Box>
              </Card>
            
          ))}
        </Grid>
      )}
    </Box>
    </>
  );
};

export default Saved;
