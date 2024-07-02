import { Text } from "@chakra-ui/react";
import { useSelectedItemStore } from "../../../core/infrastructure/localSlice/selectedItemSlice";

export function SpontaneousHousingInfo() {
    const selectedItem = useSelectedItemStore.use.selectedItem();
    return (
        <Text>{selectedItem ? `Zones d'habitations spontanées #${selectedItem.id}` : 'No selection'}</Text>
    )
}
