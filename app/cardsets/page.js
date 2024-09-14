'use client'

import { useUser } from "@clerk/nextjs"
import { useEffect, useState } from "react"
import loadAllFlashcardSets from "@/utils/firebase-functions";
import { useRouter } from "next/navigation"
import { Card, CardContent, Typography, Button, Modal, Box, IconButton, Stack } from "@mui/material"
import ResponsiveAppBar from "../components/ResponsiveAppBar"
import Cardviewer from "../components/Cardviewer";
import CloseIcon from '@mui/icons-material/Close';

export default function Flashcards() {
    const { isLoaded, isSignedIn, user } = useUser()
    const [flashcardSets, setFlashcardSets] = useState([]);
    const router = useRouter()

    const [selectedSet, setSelectedSet] = useState(null);
    const [open, setOpen] = useState(false);
  
    const handleOpen = (set) => {
      setSelectedSet(set);
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
      setSelectedSet(null);
    };

    useEffect(() => {
      if (user) {
        const fetchData = async () => {
          const flashcardSetsData = await loadAllFlashcardSets(user.id);
          setFlashcardSets(flashcardSetsData);
        };
        
        fetchData();
      }
    }, [user]);

    if (!user) return <p>Loading...</p>;

    return (
      <Box
        bgcolor="#121212"
        width="100vw"
        minHeight="100vh"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <ResponsiveAppBar/>
        <Stack spacing={3} sx={{ mt: 4, mb: 1 }} alignItems="center" textAlign={'center'} >
        {flashcardSets.length > 0 ? (
          flashcardSets.map((set) => (
              <Card
                variant="outlined"
                sx={{
                    width: 300,
                    height: 200,
                    backgroundColor: '#333',
                    color: 'white',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    textAlign: 'center'
                }}>
                <CardContent>
                  <Typography variant="h4" sx={{ mb: 2 }}>{set.id}</Typography>
                  <Button variant="outlined" color="primary" onClick={() => handleOpen(set)}>
                    Study
                  </Button>
                </CardContent>
              </Card>
          ))
        ) : (
          <Typography variant="h6" color="white">No flashcard sets found. Get started by heading to the 'Create' tab!</Typography>
        )}
      </Stack>

      {selectedSet && (
        <Modal open={open} onClose={handleClose}>
          <Box sx={{ ...modalStyle, width: 600, height: 500 }} display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h4" sx={{ mb: 4 }} color="white">Let's Study {selectedSet.id}!</Typography>
                <Cardviewer cards={selectedSet.flashcards} />
            <IconButton onClick={handleClose} sx={{ mt: 1 }} >
              <CloseIcon style={{ color: 'white' }}/>
            </IconButton>
          </Box>
        </Modal>
      )}

      </Box>
    );
}

// Style for the modal
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: '#6A1B9A',
  border: "1px solid #000",
  borderRadius: '8px',
  boxShadow: 24,
  p: 4,
};