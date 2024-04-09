import json
import requests

for i in range(1, 4):
    filename = f"dataset-extra{i}.json"

    with open(filename, 'r') as file:
        data = json.load(file)
    
    people = data['pessoas']

    for person in people:
        response = requests.post('http://localhost:3000/pessoas', json=person)

