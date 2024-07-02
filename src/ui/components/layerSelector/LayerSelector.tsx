import { Box, Checkbox, Flex, Text } from '@chakra-ui/react';
import { useLayersStore } from '../../../core/infrastructure/localSlice/layerSlice';
import { BasicMarkerIcon } from '../icons/basicMarkerIcon/BasicMarkerIcon';
import { RoadIcon } from '../icons/roadIcon/RoadIcon';

export function LayerSelector() {
    const layers = useLayersStore.use.layers();
    const toggleLayer = useLayersStore.use.toggleLayer();
    const LegendIcon = (color: string, type: 'Marker' | 'Polyline' | 'Polygone') => {
        switch (type) {
            case 'Marker':
                return (<Flex
                    alignItems='flex-end'
                    justifyContent='center'
                    w='28px' color={color}
                >
                    <BasicMarkerIcon />
                </Flex>)
            case 'Polygone':
                return (<Box
                    w='24px' h='24px'
                    border={`3px solid ${color}`}
                    bgColor={`${color}80`}
                />)
            case 'Polyline':
                return (<Flex
                    alignItems='flex-end'
                    justifyContent='center'
                    w='24px' color={color}
                >
                    <RoadIcon />
                </Flex>)

            default:
                break;
        }
    }

    return (
        <Flex flexDirection='column' gap={4} bg='white' mt='12px' mr='16px' p={4} border='1px solid' borderColor='gray.200' borderRadius='md'>
            <Text fontWeight='600'>Légende</Text>
            <Flex flexDirection='column' gap={3} onChange={(e) => {e.stopPropagation()}}>
                {layers.map(layer => (
                    <Box
                        color='gray.600'
                        border='1px solid'
                        borderColor='transparent'
                        _hover={{
                            borderColor: 'teal.200',
                        }}
                        borderRadius='base'
                        >
                        <Checkbox
                            flexDirection='row-reverse'
                            w='100%'
                            justifyContent='space-between'
                            colorScheme='teal' gap={8}
                            py='11px' pl='4px' pr='12px'
                            cursor='pointer'
                            key={layer.name}
                            isChecked={layer.active}
                            onChange={() => toggleLayer(layer.id)}
                        >
                            <Flex
                                gap={4}
                                alignItems='center'
                            >
                                {LegendIcon(layer.color, layer.type)}
                                <Text
                                    lineHeight='110%'
                                    fontSize='14px'
                                    fontWeight='600'
                                    maxWidth='120px'
                                >{layer.name}</Text>
                            </Flex>
                        </Checkbox>
                    </Box>
                ))}
            </Flex>
        </Flex>
    )
}