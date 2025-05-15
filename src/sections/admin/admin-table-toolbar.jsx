import FormControl from '@mui/material/FormControl';
import { useCallback } from 'react';
import { InputAdornment, TextField } from '@mui/material';
import Iconify from 'src/components/iconify';
import { Stack } from '@mui/system';

// ----------------------------------------------------------------------

export default function AdminTableToolbar({
    search,
    setSearch,
    setLoading,
    setPage,
}) {

    const handleSearch = useCallback(
        (event) => {
            setSearch(event.target.value);
            setTimeout(() => {
                setPage(0)
                setLoading(true)
            }, 1000);
        },
        [setSearch]
    );

    return (
        <>
            <Stack
                gap={2}
                alignItems={{ xs: 'flex-end', md: 'center' }}
                direction={{
                    xs: 'column',
                    md: 'row',
                }}
                m={2}
            >

                <FormControl sx={{ maxWidth: { md: 280 }, width: "100%" }}>
                    <Stack direction="row" alignItems="center">
                        <TextField
                            fullWidth
                            value={search}
                            onChange={handleSearch}
                            placeholder="Search..."
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                                    </InputAdornment>
                                ),
                            }}
                        />
                    </Stack>
                </FormControl>
            </Stack>
        </>
    );
}