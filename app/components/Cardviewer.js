'use client'
import React, { useEffect, useState } from "react";
import { Card, Box, Button, Alert, CardContent, Typography, CardActionArea, Stack } from "@mui/material";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

export default function Cardviewer({ cards = [] }) {
    const [cardIndex, setCardIndex] = useState(0)
    const [viewFront, setViewFront] = useState(true)

    useEffect(() => {
        console.log(cards.length)
        console.log(viewFront)
    }, [])

    const flipCard = () => {
        setViewFront(!viewFront)
    }

    const shiftRight = () => {
        if ((cardIndex + 1) == cards.length) {
            setCardIndex(0)
            setViewFront(true)
        } else {
            setCardIndex(cardIndex + 1)
            setViewFront(true)
        }
    }

    const shiftLeft = () => {
        if ((cardIndex - 1) < 0) {
            setCardIndex(cards.length - 1)
            setViewFront(true)
        } else {
            setCardIndex(cardIndex - 1)
            setViewFront(true)
        }
    }

    return(
        <Box textAlign={'center'}>
            <Stack direction="row" spacing={2}>
                <Button onClick={shiftLeft} style={{ color: 'white' }}><NavigateBeforeIcon/></Button>
                <Card
                    variant="outlined"
                    sx={{
                        width: 400,
                        height: 300,
                        backgroundColor: '#333',
                        color: 'white',
                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.3)',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }}
                    >
                    <CardActionArea onClick={flipCard}>
                    <CardContent>
                        <Typography variant="h6">
                            {viewFront ? (cards[cardIndex]).front : (cards[cardIndex]).back}
                        </Typography>
                    </CardContent>
                    </CardActionArea>
                    </Card>
                <Button onClick={shiftRight}><NavigateNextIcon style={{ color: 'white' }}/></Button>
            </Stack>
            <Typography color="white" sx={{ mt: 2 }}>
                {cardIndex + 1} / {cards.length}
            </Typography>
        </Box>
    )
}