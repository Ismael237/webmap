import json
import os

class Geometry:
    def __init__(self, type, coordinates):
        self.type = type
        self.coordinates = coordinates

class SpontaneousHousing:
    id_counter = 1  # Counter for generating IDs
    
    def __init__(self, geometry):
        self.id = SpontaneousHousing.id_counter
        SpontaneousHousing.id_counter += 1
        self.geometry = geometry.__dict__

def swap_first_two_elements(array):
    if len(array) >= 2:
        array[0], array[1] = array[1], array[0]
    return array

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

def convert_to_new_spontaneous_housing(old_spontaneous_housing):
    geometry = old_spontaneous_housing['geometry']
    return SpontaneousHousing(
        geometry=Geometry(geometry["type"], swap_first_two_elements_deep(geometry["coordinates"]))
    )
    
# Read the old data from the file
with open(os.path.join(os.path.dirname(__file__), 'NspontaneousHousings.json'), 'r', encoding='utf-8') as file:
    old_data = json.load(file)

# Convert the data to the new format
new_data = [convert_to_new_spontaneous_housing(old_spontaneous_housing).__dict__ for old_spontaneous_housing in old_data]

# Write the new data to a new file
with open(os.path.join(os.path.dirname(__file__), 'spontaneousHousings.json'), 'w', encoding='utf-8') as file:
    json.dump(new_data, file, indent=2, ensure_ascii=False)

print('Data converted successfully!')
