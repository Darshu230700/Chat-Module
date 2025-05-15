import { Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Typography } from '@mui/material'
import { Stack } from '@mui/system'
import React, { useState } from 'react'

const ChatbotColorPicker = ({ handleNext, selectedTheme, setSelectedTheme, selectedColor, setSelectedColor }) => {

    const handleChange = (event) => {
        setSelectedTheme(event.target.value);
    };

    return (
        <>
            <Stack sx={{ py: 3, display: "flex", flexDirection: "column", gap: 1.5 }}>
                <Typography variant='h5'>Start by picking your bot’s colors</Typography>
                <Typography variant='body1'>Choose from existing themes or create your own</Typography>
                <FormControl>
                    <RadioGroup
                        aria-labelledby="theme-radio-buttons-group"
                        name="theme-radio-buttons-group"
                        value={selectedTheme}
                        onChange={handleChange}
                        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
                    >
                        <Stack sx={{ display: "flex", flexDirection: "row", gap: 5 }}>
                            {[
                                { value: "Theme1", color: "#4a6fd9" },
                                { value: "Theme2", color: "#4ad970" },
                                { value: "Theme3", color: "#474f49" },
                            ].map((theme) => (
                                <Stack key={theme.value} sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 1 }}>
                                    <Stack sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                                        <Stack width={100} height={50} sx={{ borderRadius: "5px 5px 0px 0px", backgroundColor: theme.color }} />
                                        <Stack width={100} height={50} sx={{ borderRadius: "0px 0px 5px 5px", backgroundColor: theme.color }} />
                                    </Stack>
                                    <FormControlLabel value={theme.value} sx={{ width: "100%", justifyContent: "center", margin: 0 }} control={<Radio />} />
                                </Stack>
                            ))}
                        </Stack>
                        <Stack sx={{ gap: 2, flexDirection: "row", alignItems: "center" }}>
                            <Stack sx={{ display: "flex", flexDirection: "column", gap: 1, width: "fit-content" }}>
                                <Typography variant="subtitle2">Custom theme</Typography>
                                <Stack sx={{ display: "flex", flexDirection: "column", gap: 0.5 }}>
                                    <Stack width={100} height={50} sx={{ borderRadius: "5px 5px 0px 0px", backgroundColor: selectedColor?.HeaderColor }} />
                                    <Stack width={100} height={50} sx={{ borderRadius: "0px 0px 5px 5px", backgroundColor: selectedColor?.MainColor }} />
                                </Stack>
                                <FormControlLabel value="custom" sx={{ width: "100%", justifyContent: "center", margin: 0 }} control={<Radio />} />
                            </Stack>
                            {selectedTheme === "custom" && (

                                <Stack sx={{ gap: 1, flexDirection: "column" }}>
                                    <Stack sx={{ flexDirection: "row", gap: 2, width: "180px", border: "1px solid grey", borderRadius: "5px", px: 1, py: 0.5, justifyContent: "space-between", alignItems: "center" }}>
                                        <Typography variant='body2'>Header Color</Typography>
                                        <input
                                            type="color"
                                            name="primarycolor"
                                            value={selectedColor?.HeaderColor}
                                            onChange={(e) => setSelectedColor({ ...selectedColor, HeaderColor: e.target.value })}
                                        />
                                    </Stack>
                                    <Stack sx={{ flexDirection: "row", gap: 2, width: "180px", border: "1px solid grey", borderRadius: "5px", px: 1, py: 0.5, justifyContent: "space-between", alignItems: "center" }}>
                                        <Typography variant='body2'>Main Color</Typography>
                                        <input
                                            type="color"
                                            name="primarycolor"
                                            value={selectedColor?.MainColor}
                                            onChange={(e) => setSelectedColor({ ...selectedColor, MainColor: e.target.value })}
                                        />
                                    </Stack>
                                </Stack>
                            )}
                        </Stack>
                    </RadioGroup>
                </FormControl>
            </Stack>
            <Button
                color="inherit"
                variant="contained"
                onClick={() => handleNext()}
                sx={{ width: "120px" }}
            >
                Continue
            </Button>
        </>
    )
}

export default ChatbotColorPicker
