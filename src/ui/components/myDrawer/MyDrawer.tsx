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
        <AnimatePresence>
            {isOpen &&
                (<Flex
                    maxH='40svh'
                    as={motion.div}
                    variants={framerVariant}
                    initial='hidden'
                    animate='visible'
                    exit='hidden'
                    zIndex='1000'
                    pos='absolute'
                    left='0'
                    bottom='0' pb='16px'
                    w='100%' mx={['12px', null, '50px']}
                    maxW={['calc(100vw - 24px)', null, 'calc(100vw - 100px)']}
                    justifyContent='center'
                >
                    <Flex
                        pos='relative'
                        p={4} bgColor='white'
                        borderRadius='base'
                        w='mzx-content'
                        border='1px solid'
                        borderColor='gray.200'
                    >
                        <Flex overflowY='scroll' minW='100px' pr={12}>
                            <Box>{children}</Box>
                        </Flex>
                        <IconButton
                            pos='absolute'
                            top='4px'
                            right='4px'
                            size='sm' p='8px'
                            colorScheme='teal'
                            variant='ghost'
                            icon={<CrossIcon />}
                            aria-label='Close the information card'
                            onClick={onClose}
                        />
                    </Flex>
                </Flex>
                )}
        </AnimatePresence>
    )
}
