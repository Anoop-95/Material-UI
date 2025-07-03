import * as React from 'react';
import { Button, Checkbox } from '@mui/material';
import {Card, CardContent, CardMedia, Typography, IconButton, Box,} from '@mui/material';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ShareIcon from '@mui/icons-material/Share';


import { useDispatch } from "react-redux";
import { addBookmark } from "../Store/BookmarkSlice"
import toast from 'react-hot-toast';


export default function NewsItem(props) {
  const dispatch = useDispatch();

  const openArticle = () => {
    window.open(props.url, '_blank');
  };
  
 
  const handleDispatch = () => {
    dispatch(addBookmark({
      title: props.title,
      description: props.description,
      image: props.image,
      url: props.url,
      source: props.source,
    }));
    toast('Article Saved. You can view it in By clicking Bookmark icon', {icon: '🥳'});
  }


  const handleShare = async () => {
  if (navigator.share) {
    try {
      await navigator.share({
        title: props.title,
        text: props.description,
        url: props.url,
      });
    } catch (error) {
      console.error('Share failed:', error);
    }
  } else {
    toast.error("Sharing is not supported in your browser.");
  }
};


  return (
    
    <Card
    sx={{
      maxWidth: '25rem',
      borderRadius: 2,
      boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
      p: 1,
      
    }}
    >
      <CardContent sx={{ pb: 1 }}>
        <Typography variant="h5"  sx={{fontFamily: "'Bebas Neue', sans-serif",}}>
          {props.source}
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
          {props.category}
        </Typography>
      </CardContent>

      <CardMedia
        component="img"
        
        image={props.image ? props.image : "./cover_image2.jpg"}
        
        sx={{ borderRadius: 2, objectFit: 'cover', width: '100%', height:"18rem",  cursor: 'pointer', }}
         onClick={openArticle}
        />

      <CardContent sx={{ pt: 2,  cursor: 'pointer', }}  onClick={openArticle}>
        <Typography variant="h3" fontSize={'1.5rem'} fontWeight= {'500'}  sx={{ mb: 2, fontFamily:"Bebas Neue"} }>
          {props.title ? props.title.slice(0, 40)+"...": "No Title Available"}
        </Typography>
        <Typography variant="h6" sx={{fontSize:"0.85rem",  mb: 2, fontFamily: "'Bebas Neue', sans-serif",}} >
         {props.description ? props.description.slice(0, 70)+"..." : "no description available"}
        </Typography>
        
      </CardContent>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', pb: 0 }}>
        <IconButton onClick={handleShare}>
          <Checkbox icon={<ShareIcon id="link-btn" />} checkedIcon={<ShareIcon sx={{ color: 'blue' }} />}/>
        </IconButton>
        <IconButton>
          <Checkbox  icon={<BookmarkBorderIcon id="save-btn"/>} onClick={handleDispatch} checkedIcon={<BookmarkIcon sx={{color:'brown'}}/>} />
        </IconButton>
      </Box>
    </Card>

  );
}

