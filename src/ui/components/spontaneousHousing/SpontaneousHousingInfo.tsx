import { Text } from "@chakra-ui/react";
import { useSelectedItemStore } from "../../../core/infrastructure/localSlice/selectedItemSlice";

export function SpontaneousHousingInfo() {
    const selectedItem = useSelectedItemStore.use.selectedItem();
    return (
        <>{(selectedItem && ('id' in selectedItem.data) && (selectedItem.data.geometry.type !== 'Point')) &&
            (<Text>
                {`Zones d'habitations spontanées #${selectedItem.data.id}`}
            </Text>)
        }</>
    )
}
