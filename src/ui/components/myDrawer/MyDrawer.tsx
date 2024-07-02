import {
    Box,
    Flex,
    IconButton,
} from '@chakra-ui/react';
import {
    PropsWithChildren,
} from 'react';
import { CrossIcon } from '../icons/crossIcon/CrossIcon';
import { AnimatePresence, motion } from 'framer-motion';

type MyDrawerType = {
    isOpen: boolean,
    onClose: () => void,
}

export function MyDrawer({ children, isOpen, onClose }: PropsWithChildren<MyDrawerType>) {
    const framerVariant = {
        hidden: { y: '100%', },
        visible: { y: 0, },
    };
    return (
        <AnimatePresence>{isOpen &&
            (<Flex
                as={motion.div}
                initial='hidden'
                animate='visible'
                exit='hidden'
                variants={framerVariant}
                zIndex='1000'
                pos='absolute'
                bottom='0' pb='16px'
                w='100vw'
                justifyContent='center'
            >
                <Flex
                    p={4} bgColor='white'
                    borderRadius='base'
                    w='mzx-content'
                    border='1px solid'
                    borderColor='gray.200'
                >
                    <Flex minW='100px' gap={12} justifyContent='space-between'>
                        <Box>{children}</Box>
                        <IconButton
                            transform='auto'
                            translateY='-10px'
                            translateX='10px'
                            size='sm' p='8px'
                            colorScheme='teal'
                            variant='ghost'
                            icon={<CrossIcon />}
                            aria-label='Close the information card'
                            onClick={onClose}
                        />
                    </Flex>
                </Flex>
            </Flex>
            )}
        </AnimatePresence>
    )
}
