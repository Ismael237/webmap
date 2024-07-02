import { Circle } from "react-leaflet";
import { useSelectedItemStore } from "../../../core/infrastructure/localSlice/selectedItemSlice";
import { useStandardAreaSurfaceStore } from "../../../core/infrastructure/localSlice/standardAreaSurface";
import { calculateRadius } from "../../../helpers/utils/number";
import { calculatePolygonCentroid } from "../../../helpers/utils/geometry";

export function CircleAreaGroup() {
    const selectedItem = useSelectedItemStore.use.selectedItem();
    const standardAreaSurfaces = useStandardAreaSurfaceStore.use.standardAreaSurfaces();
    return (
        <>
            {selectedItem && (standardAreaSurfaces.map((area) =>
            (<Circle
                center={calculatePolygonCentroid(selectedItem.geometry.coordinates as number[][][])}
                radius={calculateRadius(area.surface)}
                color={area.color}
                key={area.id}
            />))

            )}
        </>
    )
}
