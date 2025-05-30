import React from 'react';
import { Box, Typography, List, ListItem } from '@mui/material';

function Deals() {
  const deals = [
    { id: 1, title: '20% off on all electronics!' },
    { id: 2, title: 'Buy one get one free on select items.' },
    { id: 3, title: 'Free shipping for orders over $50.' },
  ];

  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>Deals</Typography>
      <List>
        {deals.map(deal => (
          <ListItem key={deal.id}>
            <Typography>{deal.title}</Typography>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default Deals;
