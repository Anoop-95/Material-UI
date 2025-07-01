import React, { useState } from 'react';
import { Box, IconButton, InputBase, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchPage = () => {
  const [showInput, setShowInput] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleIconClick = () => {
    setShowInput(prev => !prev); // Toggle input visibility
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Search query submitted:", searchQuery);
      // You can pass this to a fetch or lift to parent
    }
  };

  return (
    <Box
      sx={{
        mt: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 2
      }}
    >
      <IconButton onClick={handleIconClick} sx={{ color: 'black' }}>
        <SearchIcon fontSize="large" sx={{ color: '#C78A3B' }}/>
      </IconButton>

      {showInput && (
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.5rem' }}>
          <InputBase
            placeholder="Search news..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{
              border: '1px solid grey',
              px: 2,
              py: 0.5,
              borderRadius: '10px',
              fontFamily: 'Bebas Neue'
            }}
          />
          <Button variant="contained" type="submit" sx={{ fontFamily: 'Bebas Neue' }}>
            Search
          </Button>
        </form>
      )}
    </Box>
  );
};

export default SearchPage;
