import json
import os

class Geometry:
    def __init__(self, type, coordinates):
        self.type = type
        self.coordinates = coordinates

class Pharmacy:
    def __init__(self, id, name, geometry):
        self.id = id
        self.name = name
        self.geometry = geometry.__dict__

def convert_to_new_pharmacy(old_pharmacy):
    properties = old_pharmacy['properties']
    geometry = old_pharmacy['geometry']
    return Pharmacy(
        id=properties["id_pharmac"],
        name=properties["nom_Pharma"],
        geometry=Geometry(geometry["type"], [geometry["coordinates"][1], geometry["coordinates"][0]])
    )

# Read the old data from the file
with open(os.path.join(os.path.dirname(__file__), 'Npharmacies.json'), 'r', encoding='utf-8') as file:
    old_data = json.load(file)

# Convert the data to the new format
new_data = [convert_to_new_pharmacy(old_pharmacy).__dict__ for old_pharmacy in old_data]

# Write the new data to a new file
with open(os.path.join(os.path.dirname(__file__), 'pharmacies.json'), 'w', encoding='utf-8') as file:
    json.dump(new_data, file, indent=2, ensure_ascii=False)

print('Data converted successfully!')
