import { Box, Checkbox, Flex, IconButton, Text } from '@chakra-ui/react';
import { useLayersStore } from '../../../core/infrastructure/localSlice/layerSlice';
import { BasicMarkerIcon } from '../icons/basicMarkerIcon/BasicMarkerIcon';
import { RoadIcon } from '../icons/roadIcon/RoadIcon';
import { CrossIcon } from '../icons/crossIcon/CrossIcon';
import { AnimatePresence, motion, Variants } from 'framer-motion';

type LayerSelectorProps = {
    isOpen: boolean,
    onClose: () => void,
}

export function LayerSelector({ isOpen, onClose }: LayerSelectorProps) {
    const layers = useLayersStore.use.layers();
    const toggleLayer = useLayersStore.use.toggleLayer();

    const framerVariant: Variants = {
        hidden: {
            x: '100%',
            transition: {
                ease: 'linear',
                duration: '0.2'
            }
        },
        visible: {
            x: 0,
            transition: {
                ease: 'linear',
                duration: '0.2'
            }
        },
    };

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
        <AnimatePresence>
            {isOpen && (
                <Box
                    pt={['0', null, '12px']}
                    pr={['0', null, '16px']}
                    w={['100vw', null, 'auto']}
                    as={motion.div}
                    variants={framerVariant}
                    initial='hidden'
                    animate='visible'
                    exit='hidden'
                >
                    <Flex
                        pos='relative'
                        flexDirection='column'
                        gap={4} p={4} bg='white'
                        border='1px solid'
                        borderColor='gray.200'
                        borderRadius={['0', null, 'base']}
                    >
                        <Box
                            pos='absolute'
                            top='10px'
                            right='10px'
                        >
                            <IconButton
                                size='sm' p='8px'
                                colorScheme='teal'
                                variant='ghost'
                                icon={<CrossIcon />}
                                aria-label='Close/Open the legend card'
                                onClick={onClose}
                            />
                        </Box>
                        <Text fontWeight='600' py='16px'>Légende</Text>
                        <Flex flexDirection='column' gap={3} onChange={(e) => { e.stopPropagation() }}>
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
                </Box>
            )}
        </AnimatePresence>
    )
}