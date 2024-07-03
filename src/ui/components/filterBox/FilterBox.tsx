import { Accordion, AccordionItem, AccordionButton, Box, AccordionIcon, AccordionPanel, Flex, Text, useOutsideClick, useDisclosure } from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { useSchoolStore } from '../../../core/domain/usecases/schoolSlice';
import { FilterIcon } from '../icons/filterIcon/FilterIcon';

export function FilterBox() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const setFilteredSchools = useSchoolStore.use.setFilteredSchools();
    const [scheduleId, setScheduleId] = useState(0);
    const filterBoxRef = useRef<HTMLDivElement>(null);
    useOutsideClick({
        ref: filterBoxRef,
        handler: () => onClose(),
    });

    const activeFilterStyle = {
        bgColor: 'teal.500',
        color: 'white',
        _hover: {}
    }

    const handleScheduleClick = (id: number) => {
        setScheduleId(id);
        setFilteredSchools({ schedulesId: id });
    }
    const handleAccordionButtonClick = () => {
        if (isOpen) {
            onClose();
        } else {
            onOpen();
        }
    }
    return (
        <Accordion
            bgColor='white'
            mt={2} w='100%'
            borderRadius='base'
            ref={filterBoxRef}
            index={isOpen ? 0 : -1}
            border='1px solid' borderColor='gray.200'
        >
            <AccordionItem borderRadius='base'>
                <h2>
                    <AccordionButton pl='4px' onClick={handleAccordionButtonClick}>
                        <Flex alignItems='center' gap='14px' flex='1' textAlign='left'>
                            <Box
                                bgColor='transparent'
                                pointerEvents='none'
                                w='48px' px='10px'
                                color='blackAlpha.900'
                            ><FilterIcon /></Box>
                            <Text>
                                Filtrer par
                            </Text>
                        </Flex>
                        <AccordionIcon />
                    </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                    <Flex direction='column' gap={4}>
                        <Text>Heures</Text>
                        <Flex
                            gap={0} maxW='100%'
                            borderRadius='base'
                            border='1px solid'
                            overflow='hidden'
                            fontSize='14px'
                        >
                            {[
                                'Horaires Indifférents',
                                'Ouvert Maintenant',
                                'Ouvert 24h/24h ou de garde'
                            ].map((item, i) => (
                                <Flex
                                    overflow='hidden'
                                    alignItems='center'
                                    py='12px' px='14px'
                                    key={i} textAlign='center'
                                    cursor='pointer' maxW='100%'
                                    borderLeft={(i !== 0) ? '1px solid' : ''}
                                    _hover={{ bgColor: 'teal.50' }}
                                    onClick={() => handleScheduleClick(i)}
                                    {...(i === scheduleId && activeFilterStyle)}
                                >
                                    {item}
                                </Flex>
                            ))}
                        </Flex>
                    </Flex>
                </AccordionPanel>
            </AccordionItem>
        </Accordion>
    )
}