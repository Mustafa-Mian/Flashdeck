'use client'
import getStripe from "@/utils/get-stripe";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Typography, Button, Box } from "@mui/material";
import Link from "next/link";
import Head from "next/head";
import Features from "./components/Features";
import Pricing from "./components/Pricing";
import ResponsiveAppBar from "./components/ResponsiveAppBar";

export default function Home() {

  return (
    <>
    <Box bgcolor={'black'}>
      <Head>
        <title>Flashdeck Card Generation</title>
        <meta name="description" content="Create Flashcards from your notes."/>
      </Head>

      <ResponsiveAppBar/>

      <Box sx={{textAlign: 'center', my: 4}}>
        <Typography variant="h2" component="h1" color="white" gutterBottom>
          Conquer Your Classes
        </Typography>
        <Typography variant="h5" component="h2" color="#94DD26" gutterBottom>
          Instantly create personalized Flashcard decks.
        </Typography>
        <SignedOut>
          <Link href="/sign-in">
            <Button variant="outlined" color="primary" sx={{mt: 2, mr: 2}}>
              Get Started
            </Button>
          </Link>
        </SignedOut>
        <SignedIn>
          <Link href="/generatecards">
            <Button variant="outlined" color="primary" sx={{mt: 2}}>
              Get Started
            </Button>
          </Link>
        </SignedIn>
      </Box>

      <Box
        sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
        }}
      >
        <img src="/assets/FlashdeckLogoOnly.png" />
      </Box>

      <Features/>

      <Pricing />
    </Box>
    </>
  );
}
