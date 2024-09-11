'use client'

import { SignIn } from "@clerk/nextjs";
import getStripe from "@/utils/get-stripe";
import { Container, Box, Typography } from "@mui/material";
import Head from "next/head";
import ResponsiveAppBar from "@/app/components/ResponsiveAppBar";

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
            Welcome Back
        </Typography>
        <Typography variant="h6" color="white" sx={{ mb: 3, color: '#94DD26' }} >
            We're happy you're back! Sign in to access your Flashcards.
        </Typography>
        <SignIn />
    </Box>
    </>
    );
}
