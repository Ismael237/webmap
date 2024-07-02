import { Accordion, AccordionItem, AccordionButton, Box, AccordionIcon, AccordionPanel, Flex, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { useSchoolStore } from '../../../core/domain/usecases/schoolSlice';

export function FilterBox() {
    const setFilteredSchools = useSchoolStore.use.setFilteredSchools();
    const [scheduleId, setScheduleId] = useState(0);

    const activeFilterStyle = {
        bgColor: 'teal.500',
        color: 'white',
        _hover: {}
    }
    const handleScheduleClick = (id: number) => {
        setScheduleId(id);
        setFilteredSchools({ schedulesId: id })
    }
    return (
        <Accordion
            bgColor='white'
            maxW='376px' mt={2}
            borderRadius='base'
            allowMultiple
        >
            <AccordionItem borderRadius='base' border='1px solid' borderColor='gray.200'>
                <h2>
                    <AccordionButton>
                        <Box as='span' flex='1' textAlign='left'>
                            Filtrer par
                        </Box>
                        <AccordionIcon />
                    </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                    <Flex direction='column' gap={4}>
                        <Text>Heures</Text>
                        <Flex
                            gap={0}
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
                                    alignItems='center'
                                    py='12px' px='14px'
                                    key={i} textAlign='center'
                                    cursor='pointer'
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