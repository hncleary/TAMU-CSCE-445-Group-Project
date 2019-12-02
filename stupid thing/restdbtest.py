import requests, json, math

url = "https://bettereating-efb9.restdb.io/rest/plants"

headers = {
    'content-type': "application/json",
    'x-apikey': "6ce326aadbd8a2fa57ead3238d9203f9cdd12",
    'cache-control': "no-cache"
    }

response = requests.request("GET", url, headers=headers)

#print(response.json)
plants_list = json.loads(response.text)

for i in plants_list:
    print(i['name'] + "\n")

close_plants_list = []

currX = 0.0
currY = 0.0

for i in plants_list:
    plantX, plantY = i['xCord'], i['yCord']
    if math.sqrt( (plantX - currX)*(plantX - currX)  + (plantY - currY)*(plantY - currY) ) < 50:
        close_plants_list.append(i)

print(close_plants_list)
