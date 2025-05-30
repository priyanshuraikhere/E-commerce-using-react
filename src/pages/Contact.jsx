import React from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';

function Contact() {
  return (
    <Box p={2}>
      <Typography variant="h4" gutterBottom>Contact Us</Typography>
      <Box component="form" mt={2} display="flex" flexDirection="column" maxWidth={400}>
        <TextField label="Name" variant="outlined" margin="normal" />
        <TextField label="Email" variant="outlined" margin="normal" />
        <TextField label="Message" variant="outlined" margin="normal" multiline rows={4} />
        <Button variant="contained" color="primary" sx={{ mt: 2 }}>
          Submit
        </Button>
      </Box>
    </Box>
  );
}

export default Contact;
