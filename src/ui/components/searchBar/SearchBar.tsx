import { useForm } from 'react-hook-form';
import {
    Flex,
    FormControl,
    IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    List,
    ListItem,
    Text,
    useDisclosure
} from '@chakra-ui/react';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useSchoolStore } from '../../../core/domain/usecases/schoolSlice';
import { usePharmacyStore } from '../../../core/domain/usecases/pharmacySlice';
import { useNeighborhoodStore } from '../../../core/domain/usecases/neighborhoodSlice';
import { useRoadStore } from '../../../core/domain/usecases/roadSlice';
import { School } from '../../../core/domain/entities/school';
import { Pharmacy } from '../../../core/domain/entities/pharmacy';
import { Neighborhood } from '../../../core/domain/entities/neighborhood';
import { Road } from '../../../core/domain/entities/road';
import { SearchIcon } from '../icons/searchIcon/SearchIcon';
import { CrossIcon } from '../icons/crossIcon/CrossIcon';
import { BasicMarkerIcon } from '../icons/basicMarkerIcon/BasicMarkerIcon';
import { capitalizeFirstLetter } from '../../../helpers/utils/string';
import { useMap } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import { FilterBox } from '../filterBox/FilterBox';

type Inputs = {
    searchQuery: string,
}

type CombinedDataItemType = School | Pharmacy | Neighborhood | Road;

type CombinedDataType = (CombinedDataItemType)[]

export function SearchBar() {
    const {
        register,
        setFocus,
        setValue,
        watch,
    } = useForm<Inputs>({ mode: 'onChange' });

    const visibleSchools = useSchoolStore.use.visibleSchools();
    const visiblePharmacies = usePharmacyStore.use.visiblePharmacies();
    const neighborhoods = useNeighborhoodStore.use.neighborhoods();
    const roads = useRoadStore.use.roads();

    const [results, setResults] = useState<CombinedDataType>([]);


    const { isOpen, onOpen, onClose } = useDisclosure();
    const suggestionRef = useRef<HTMLUListElement>(null);

    const map = useMap();

    const getItemName = (item: CombinedDataItemType) => {
        if ('schoolName' in item) {
            return item.schoolName;
        } else if ('neighborhoodName' in item) {
            return item.neighborhoodName
        } else if (item.name) {
            return item.name;
        }
        return '';
    }

    const filterData = (searchTerm: string) => {
        const combinedData: CombinedDataType = [...visibleSchools, ...visiblePharmacies, ...neighborhoods, ...roads];
        const filteredResults = combinedData.filter((item) => (
            getItemName(item).toLowerCase().includes(searchTerm.toLowerCase())
        ));
        setResults(filteredResults);
    }

    const handleSearchQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
        filterData(e.target.value)
    }

    const handleResetSearch = () => {
        setResults([]);
        setValue('searchQuery', '');
        setFocus('searchQuery');
    }

    const handleZoom = (zoomToCoordinates: LatLngExpression) => {
        const zoomLevel = 20;
        map.setView(zoomToCoordinates, zoomLevel, {
            animate: true,
            duration: 1,
        });
    };

    const HandleSuggestionClick = (item: CombinedDataItemType) => {
        const searchTerm = capitalizeFirstLetter(getItemName(item));
        setValue('searchQuery', searchTerm);
        filterData(searchTerm);
        if (item.geometry.type === 'Point') {
            handleZoom(item.geometry.coordinates)
        }
        onClose();
    }


    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (suggestionRef.current && !suggestionRef.current.contains(event.target as Node)) {
                onClose();
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    return (
        <Flex flexDirection='column' w='100%' minW='376px'>
            <form>
                <Flex>
                    <FormControl>
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents='none'
                                h='100%' w='56px'
                                alignItems='center'
                                justifyItems='center'
                            >
                                <Text w='25px'>
                                    <SearchIcon />
                                </Text>
                            </InputLeftElement>
                            <Input
                                {...register('searchQuery', {
                                    onChange: handleSearchQueryChange,
                                })}
                                onFocus={onOpen}
                                pl='64px' pr='48px' h='48px'
                                placeholder='Recherché...' bgColor='white'
                                fontSize='14px'
                            />
                            {(watch('searchQuery') && watch('searchQuery').length > 0) &&
                                (<InputRightElement
                                    h='100%' w='48px'
                                    alignItems='center'
                                    justifyItems='center'
                                >
                                    <IconButton
                                        onClick={handleResetSearch}
                                        bgColor='transparent'
                                        color='blackAlpha.500'
                                        _hover={{ bgColor: 'none', color: 'teal.400' }}
                                        _active={{ bgColor: 'none', color: 'teal.500' }}
                                        p='10px' w='24px'
                                        icon={<CrossIcon />}
                                        aria-label='Reset search'
                                    />
                                </InputRightElement>)}

                        </InputGroup>
                    </FormControl>
                </Flex>
            </form>
            {(results.length > 0 && isOpen) && (
                <List
                    py='12px'
                    bgColor='white' maxH='314px'
                    maxW='376px'
                    spacing={3} mt={2}
                    borderRadius='base'
                    overflowY='scroll'
                    border='1px solid'
                    borderColor='gray.200'
                    ref={suggestionRef}
                >
                    {results.map((result, index) => (
                        <ListItem
                            display='flex'
                            alignItems='center'
                            minH='48px'
                            cursor='pointer'
                            key={index}
                            _hover={{ bgColor: 'teal.100' }}
                            _active={{ bgColor: 'teal.200' }}
                            onClick={() => HandleSuggestionClick(result)}
                        >
                            <IconButton
                                bgColor='transparent'
                                pointerEvents='none' w='64px' px='16px'
                                icon={<BasicMarkerIcon />} aria-label={''}
                                color='blackAlpha.600'
                            />
                            <Text>
                                {capitalizeFirstLetter(getItemName(result))}
                            </Text>
                        </ListItem>
                    ))}
                </List>
            )}
            <FilterBox />
        </Flex>
    )
}