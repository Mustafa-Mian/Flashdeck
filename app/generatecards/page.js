'use client'

import { useState } from 'react'
import {
  Stack,
  Alert,
  TextField,
  Button,
  Typography,
  Box,
  Card,
  CardContent,
  LinearProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from '@mui/material'
import { useUser } from '@clerk/nextjs'
import db from "@/firebase";
import { doc, getDoc, setDocRef, setDoc, collection, writeBatch } from 'firebase/firestore'
import Grid from '@mui/material/Grid2';
import ResponsiveAppBar from '../components/ResponsiveAppBar';

export default function Generate() {
  const [text, setText] = useState('')
  const [flashcards, setFlashcards] = useState([])
  const [loading, setLoading] = useState(false);
  const [setName, setSetName] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const { isLoaded, isSignedIn, user } = useUser()

  const handleSubmit = async () => {
    if (!text.trim()) {
      alert('Please enter some text to generate flashcards.')
      return
    }

    const message = { prompt: text }

    try {
      setLoading(true);
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(message),
      })

      if (!response.ok) {
        throw new Error('Failed to generate flashcards')
      }

      const data = await response.json()
      setFlashcards(data.flashcards)
    } catch (error) {
      console.error('Error generating flashcards:', error)
      alert('An error occurred while generating flashcards. Please try again.')
    } finally {
      setLoading(false); // Hide the loading bar after the request completes
      console.log(flashcards)
    }
  }

  const handleOpenDialog = () => setDialogOpen(true)
  const handleCloseDialog = () => setDialogOpen(false)

  const submitDialog = () => {
    saveFlashcards()
    handleCloseDialog()
  }

  const saveFlashcards = async () => {
    if (!setName.trim()) {
      alert('Please enter a name for your flashcard set.')
      return
    }
  
    try {
      const userDocRef = doc(collection(db, 'users'), user.id)
      const userDocSnap = await getDoc(userDocRef)
  
      const batch = writeBatch(db)
  
      if (userDocSnap.exists()) {
        const userData = userDocSnap.data()
        const updatedSets = [...(userData.flashcardSets || []), { name: setName }]
        batch.update(userDocRef, { flashcardSets: updatedSets })
      } else {
        batch.set(userDocRef, { flashcardSets: [{ name: setName }] })
      }
  
      const setDocRef = doc(collection(userDocRef, 'flashcardSets'), setName)
      batch.set(setDocRef, { flashcards })
  
      await batch.commit()
  
      alert('Flashcards saved successfully!')
      handleCloseDialog()
      setSetName('')
    } catch (error) {
      console.error('Error saving flashcards:', error)
      alert('An error occurred while saving flashcards. Please try again.')
    }
  }

  return (
    <Box
      bgcolor="#121212"
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <ResponsiveAppBar />
      <Stack spacing={2} sx={{ width: '100%', alignItems: 'center' }}>
      <Box
        sx={{
          mt: 4,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '80%',
          maxWidth: '800px',
          margin: '0 auto',
          padding: '30px',
          bgcolor: '#6A1B9A',
          borderRadius: '8px',
          boxShadow: 3,
        }}
      >
        <Typography variant="h4" component="h1" color="white" gutterBottom>
          Create Your Flashcards
        </Typography>
        <Typography variant="h6" color="#B2FF59" gutterBottom>
          Enter a prompt. It could be a course name, topic, or general idea you’d like to learn about!
        </Typography>
        <TextField
          value={text}
          onChange={(e) => setText(e.target.value)}
          label="Enter text"
          fullWidth
          multiline
          rows={4}
          variant="outlined"
          InputProps={{
            style: { color: 'white' }, // This sets the text color to white
          }}
          InputLabelProps={{
            style: { color: 'white' }, // This sets the label color to white
          }}
          sx={{
            my: 2,
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'white', // Set the border color to white
              },
              '&:hover fieldset': {
                borderColor: 'lightgray', // Set border color on hover
              },
              '&.Mui-focused fieldset': {
                borderColor: 'white', // Set border color when focused
              },
            },
          }}
        />
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#B2FF59',
            color: '#121212',
            '&:hover': {
              backgroundColor: '#94DD26',
            },
          }}
          onClick={handleSubmit}
          fullWidth
        >
          Generate Flashcards
        </Button>
      </Box>
      <div></div>
      <div></div>
      {flashcards.length == 0 && (
          <Alert severity="info">Your flashcards will appear here when generated.</Alert>
      )}
      {loading && (
        <Box sx={{ width: '80%' }}>
          <LinearProgress />
        </Box>
      )}
      {flashcards.length > 0 && (
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          <Button variant="outlined" color="primary" onClick={handleOpenDialog}>
            Save Cardset
          </Button>
        </Box>
      )}
      {flashcards.length > 0 && (
        <Box
          sx={{
            mt: 8,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%', // Full width
            margin: '0 auto',
            padding: '30px',
            bgcolor: '#212121',
            borderRadius: '8px',
            boxShadow: 3,
          }}
        >
          <Typography variant="h5" component="h2" color="white" gutterBottom>
            Your Flashcards:
          </Typography>
          <Grid container spacing={4} justifyContent="center">
            {flashcards.map((flashcard, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  variant="outlined"
                  sx={{
                    width: 400, // Set a fixed width for all cards
                    height: 300, // Set a fixed height for all cards
                    backgroundColor: '#333',
                    color: 'white',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center', // Center content vertically
                  }}
                >
                  <CardContent>
                    <Typography variant="h6">Front:</Typography>
                    <Typography>{flashcard.front}</Typography>
                    <Typography variant="h6" sx={{ mt: 2 }}>
                      Back:
                    </Typography>
                    <Typography>{flashcard.back}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Stack>

    <Dialog open={dialogOpen} onClose={handleCloseDialog}>
      <DialogTitle>Save Flashcard Set</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Please enter a name for your flashcard set.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="Set Name"
          type="text"
          fullWidth
          value={setName}
          onChange={(e) => setSetName(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog}>Cancel</Button>
        <Button onClick={submitDialog} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>

    </Box>
  )
}
