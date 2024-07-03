import { Badge, Box, Flex, IconButton, Text } from '@chakra-ui/react';
import { useSelectedItemStore } from '../../../core/infrastructure/localSlice/selectedItemSlice';
import { CrossIcon } from '../icons/crossIcon/CrossIcon';
import { AddIcon } from '../icons/addIcon/AddIcon';
import { capitalizeFirstLetter } from '../../../helpers/utils/string';

export function StateIndicator({ state }: { state: boolean }) {
    return (<IconButton
        size='xs' p='2px'
        pointerEvents='none'
        bgColor='transparent'
        icon={state ? <AddIcon /> : <CrossIcon />}
        color={state ? 'green.500' : 'red.500'}
        aria-label='State Indicator'
    />)
}

export function SchoolInfo() {
    const school = useSelectedItemStore.use.selectedItem();
    return (
        <>
            {(school &&
                ('schoolName' in school.data)) &&
                (<Box maxW='600px' pt={2} pb={4}>
                    <Text fontWeight='600' mb={4}>
                        {capitalizeFirstLetter(school.data.schoolName)}
                    </Text>
                    <Flex gap={2} flexWrap='wrap' mb={4}>
                        <Badge colorScheme='purple'>{school.data.category}</Badge>
                        <Badge colorScheme='blue'>{school.data.type}</Badge>
                        <Badge colorScheme='green'>{school.data.section}</Badge>
                    </Flex>
                    <Flex flexWrap='wrap' mt={2}>
                        <Text mr={2}>Quartier: {capitalizeFirstLetter(school.data.neighborhood)},</Text>
                        <Text mr={2}>Nombre d'élèves: {school.data.studentCount},</Text>
                        <Text mr={2}>Nombre d'enseignants: {school.data.teacherCount},</Text>
                        <Text mr={2}>Nombre de salles de classe: {school.data.classroomCount},</Text>
                        <Text mr={2}>Nombre de latrines: {school.data.latrineCount}</Text>
                    </Flex>

                    <Flex flexWrap='wrap' mt={4} gap={4}>
                        <Flex align='center'>
                            <Text mr={2}>Eau potable:</Text>
                            <StateIndicator state={school.data.water} />
                        </Flex>
                        <Flex align='center'>
                            <Text mr={2}>Électricité:</Text>
                            <StateIndicator state={school.data.electricity} />
                        </Flex>
                        <Flex align='center'>
                            <Text mr={2}>Salle informatique:</Text>
                            <StateIndicator state={school.data.computerRoom} />
                        </Flex>
                    </Flex>
                </Box>)}</>
    )
}