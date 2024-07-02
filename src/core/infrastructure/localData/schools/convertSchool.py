import json
import os

class Geometry:
    def __init__(self, type, coordinates):
        self.type = type
        self.coordinates = coordinates

class School:
    def __init__(self, schoolName, category, type, section, studentCount, teacherCount, classroomCount, latrineCount, water, electricity, computerRoom, neighborhood, geometry):
        self.schoolName = schoolName
        self.category = category
        self.type = type
        self.section = section
        self.studentCount = studentCount
        self.teacherCount = teacherCount
        self.classroomCount = classroomCount
        self.latrineCount = latrineCount
        self.water = water
        self.electricity = electricity
        self.computerRoom = computerRoom
        self.neighborhood = neighborhood
        self.geometry = geometry

class OldSchool:
    def __init__(self, type, properties, geometry):
        self.type = type
        self.properties = properties
        self.geometry = geometry

def convert_to_new_school(old_school):
    properties = old_school['properties']
    geometry = old_school['geometry']
    return School(
        schoolName=properties["Nom_ecole"],
        category=properties["Categorie"],
        type=properties["Type"],
        section=properties["Section"],
        studentCount=properties["nbre_eleve"],
        teacherCount=properties["nbre_ensei"],
        classroomCount=properties["Nombre_de_"],
        latrineCount=properties["Latrine"],
        water=properties["Eau"],
        electricity=properties["Electricit"],
        computerRoom=properties["Salle_d_in"],
        neighborhood=properties["Quartier e"],
        geometry=Geometry(geometry["type"], [geometry["coordinates"][1], geometry["coordinates"][0]])
    )

# Read the old data from the file
with open(os.path.join(os.path.dirname(__file__), 'Nschool.json'), 'r', encoding='utf-8') as file:
    old_data = json.load(file)

# Convert the data to the new format
new_data = [convert_to_new_school(old_school).__dict__ for old_school in old_data]

# Write the new data to a new file
with open(os.path.join(os.path.dirname(__file__), 'schools.json'), 'w', encoding='utf-8') as file:
    json.dump(new_data, file, indent=2, ensure_ascii=False, default=lambda x: x.__dict__)

print('Data converted successfully!')
