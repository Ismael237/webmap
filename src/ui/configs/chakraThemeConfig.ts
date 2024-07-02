import { extendTheme } from '@chakra-ui/react';
import { defineStyleConfig } from '@chakra-ui/react';
import '@fontsource/poppins';

const Button = defineStyleConfig({
    baseStyle: {
        fontWeight: '600',
        textTransform: 'capitalize',
        borderRadius: 'base',
        fontFamily: 'Poppins',
    },
    sizes: {
        sm: {
            fontSize: 'sm',
            px: 4,
            h: '32px',
        },
        md: {
            fontSize: 'md',
            px: 4,
            h: '48px',
        },
        lg: {
            fontSize: 'md',
            px: '24px',
            h: '56px',
        },
    },
    variants: {
        solid: {},
        ghost: {},
        disable: {},
    },
    defaultProps: {
        variant: 'solid',
        colorScheme: 'teal'
    },
});

const theme = extendTheme({
    fonts: {
        heading: 'Poppins, sans-serif',
        body: 'Poppins, sans-serif',
    },
    components: {
        Button,
    },
});


export default theme;