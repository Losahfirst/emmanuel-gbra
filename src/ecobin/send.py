import time
import requests
import json

def send(a, b):
    url = "https://ecobin-cc9c1-default-rtdb.europe-west1.firebasedatabase.app/.json"

    now = time.localtime()
    timestamp = time.strftime("%Y-%m-%d %H:%M:%S", now)

    data = {"timestamp": timestamp}

    # Ajoute uniquement les clés avec valeurs non nulles (différentes de 0)
    if a != 0:
        data["plastique"] = a
    if b != 0:
        data["autre"] = b

    if len(data) == 1:  # Seul timestamp présent, rien à envoyer
        print("Aucune donnée à envoyer.")
        return

    
    response = requests.patch(url, data=json.dumps(data))
    if response.status_code == 200:
        print(f"Données envoyées : {data}")
    else:
        print(f"Erreur Firebase : {response.status_code} - {response.text}")
  