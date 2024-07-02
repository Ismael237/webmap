import json
import os

class Geometry:
    def __init__(self, type, coordinates):
        self.type = type
        self.coordinates = coordinates

class Road:
    def __init__(self, osmId, code, fclass, name, reference, oneWay, maxSpeed, layer, bridge, tunnel, geometry):
        self.osmId = osmId
        self.code = code
        self.class_ = fclass
        self.name = name
        self.reference = reference
        self.oneWay = oneWay
        self.maxSpeed = maxSpeed
        self.layer = layer
        self.bridge = bridge
        self.tunnel = tunnel
        self.geometry = geometry

class OldRoad:
    def __init__(self, properties, geometry):
        self.properties = properties
        self.geometry = geometry
        
def swap_first_two_elements_deep(array):
    # Helper function to swap the first two elements in a list if it has at least two elements
    def swap_first_two_elements(lst):
        if len(lst) >= 2:
            lst[0], lst[1] = lst[1], lst[0]
    
    # Recursive function to traverse the nested list
    def traverse_and_swap(arr):
        if isinstance(arr, list):
            if len(arr) > 0 and all(isinstance(i, (int, float)) for i in arr):
                # If it's the deepest level list of numbers, swap the first two elements
                swap_first_two_elements(arr)
            else:
                # Recursively traverse the list
                for sublist in arr:
                    traverse_and_swap(sublist)
    
    traverse_and_swap(array)
    return array

def convert_to_new_road(old_road, new_id):
    properties = old_road['properties']
    geometry = old_road['geometry']
    
    return Road(
        osmId=properties["osm_id"],
        code=properties["code"],
        fclass=properties["fclass"],
        name=properties["name"],
        reference=properties["ref"],
        oneWay=properties["oneway"],
        maxSpeed=properties["maxspeed"],
        layer=properties["layer"],
        bridge=properties["bridge"],
        tunnel=properties["tunnel"],
        geometry=Geometry(geometry["type"], swap_first_two_elements_deep(geometry["coordinates"]))
    )

# Read the old data from the file
with open(os.path.join(os.path.dirname(__file__), 'Nroads.json'), 'r', encoding='utf-8') as file:
    old_data = json.load(file)

# Convert the data to the new format
new_data = [convert_to_new_road(old_road, index+1).__dict__ for index, old_road in enumerate(old_data)]

# Write the new data to a new file
with open(os.path.join(os.path.dirname(__file__), 'roads.json'), 'w', encoding='utf-8') as file:
    json.dump(new_data, file, indent=2, ensure_ascii=False, default=lambda x: x.__dict__)

print('Data converted successfully!')