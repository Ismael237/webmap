import { Text } from "@chakra-ui/react";
import { useSelectedItemStore } from "../../../core/infrastructure/localSlice/selectedItemSlice";
import { capitalizeFirstLetter } from "../../../helpers/utils/string";

export function PharmacyInfo() {
    const selectedItem = useSelectedItemStore.use.selectedItem();
    return (
        <>{(selectedItem && ('name' in selectedItem.data) && (selectedItem.data.geometry.type === 'Point')) &&
            (<Text>
               {capitalizeFirstLetter(selectedItem.data.name)}
            </Text>)
        }</>
    )
}
