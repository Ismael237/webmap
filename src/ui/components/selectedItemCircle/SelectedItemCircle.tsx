import { Circle } from "react-leaflet";
import { useSelectedItemStore } from "../../../core/infrastructure/localSlice/selectedItemSlice";
import { getStandardAreaById } from "../../../core/infrastructure/localSlice/standardAreaSurfaceSlice";
import { calculateRadius } from "../../../helpers/utils/number";

export function SelectedItemCircle() {
    const selectedItem = useSelectedItemStore.use.selectedItem();
    let areaId = 0
    if(selectedItem){
        if('schoolName' in selectedItem.data){
            areaId = 2;
        }
    }
    const area = getStandardAreaById(areaId);
    return (
        <>
            {(selectedItem && (selectedItem.data.geometry.type === 'Point')) && (
            <Circle
                center={selectedItem.data.geometry.coordinates}
                radius={calculateRadius(area.surface)}
                color={area.color}
                key={area.id}
            />)}
        </>
    )
}