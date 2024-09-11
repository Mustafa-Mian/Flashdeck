'use client'
import { SignUp } from '@clerk/nextjs'
import { Box, Typography } from '@mui/material'
import ResponsiveAppBar from '@/app/components/ResponsiveAppBar'

export default function Page() {
  return (
    <>
    <ResponsiveAppBar/>
    <Box
        bgcolor={'black'}
        sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            height: '100vh'
        }}
    >
      <Typography variant="h4" color="white" sx={{ mb: 3 }}>
            Welcome!
        </Typography>
        <Typography variant="h6" color="white" sx={{ mb: 3, color: '#94DD26' }} >
            We're happy you're here. Sign up to get started and create your Flashcards.
        </Typography>
        <SignUp />
    </Box>
    </>
  )
}
