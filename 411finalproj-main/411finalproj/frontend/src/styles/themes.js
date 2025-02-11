import { extendTheme } from '@chakra-ui/react';
const theme = extendTheme({
    fonts: {
        heading: 'Poppins',
        body: 'Inter',
        text: 'Inter',
    },
    fontWeights: {
        normal: 400,
        medium: 500,
        bold: 600,
        black: 700,
    },
    components: {
        Progress: {
            baseStyle: {
                track: {
                    bgColor: 'gray.200',
                },
                filledTrack: {
                    bgColor: 'red.600',
                },
            },
        },
    },
});

export default theme;