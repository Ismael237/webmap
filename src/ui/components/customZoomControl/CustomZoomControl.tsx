import { BoxProps, Divider, Flex, forwardRef, IconButton } from '@chakra-ui/react';
import { useMap } from 'react-leaflet';
import { RemoveIcon } from '../icons/removeIcon/RemoveIcon';
import { AddIcon } from '../icons/addIcon/AddIcon';

export const CustomZoomControl = forwardRef<BoxProps, 'div'>((props, ref) => {
    const map = useMap();

    const zoomIn = () => {
        map.setZoom(map.getZoom() + 1);
    };
    
    const zoomOut = () => {
        map.setZoom(map.getZoom() - 1);
    };

    return (
        <Flex
            flexDirection='column' gap='0'
            ref={ref} {...props}
        >
            <IconButton
                size='sm'
                borderRight='none'
                onClick={zoomIn}
                aria-label='Zoom In'
                icon={<AddIcon />}
                borderBottomRadius='0'
                colorScheme='teal'
                p='8px'
            />
            <Divider />
            <IconButton
                size='sm' p='8px'
                colorScheme='teal'
                borderTopRadius='0'
                onClick={zoomOut}
                aria-label='Zoom Out'
                icon={<RemoveIcon />}
            />
        </Flex>
    )
})
