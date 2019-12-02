import flask, json, requests, random
from flask import Flask, request, jsonify, current_app
from flask_cors import CORS, cross_origin
from math import *

#import json, requests
app = Flask(__name__)
cors = CORS(app)

@app.route("/")                 
def landing():
    print("New user on the site\n")  
    return current_app.send_static_file('overview.html')


@app.route("/submit", methods=['POST'])
def submitPlant():
    print("Submitting plant to database")
    tmp = request.json
    print(tmp)
    #print(request.json)

    print( tmp["name"] )

    data2send = {}
    data2send['name'] = "yuuuuup"
    data2send['succulent'] = 0
    data2send['leafy'] = 0
    data2send['flower'] = 0
    data2send['tree'] = 0
    data2send['flower'] = 0
    data2send['thorns'] = 0
    data2send['spines'] = 0
    data2send['red'] = 0
    data2send['green'] = 0
    data2send['blue'] = 0
    data2send['orange'] = 0
    data2send['yellow'] = 0
    data2send['violet'] = 0
    data2send['pink'] = 0
    data2send['black'] = 0
    data2send['white'] = 0
    data2send['xCord'] = 0.0
    data2send['yCord'] = 0.0
    data2send['imageFile'] = ""
    data2send['location_description'] = ""
    data2send['plant_review'] = ""
    data2send['bark'] = 0
    data2send['shrub'] = 0
    
    data2send['name'] = tmp['name']
    for i in tmp['features']:
        if i != 'none':
            data2send[i] = 1
    for i in tmp['colors']:
        if i != 'none':
            data2send[i] = 1
    for i in tmp['types']:
        if i != 'none':
            data2send[i] = 1
    data2send['location_description'] = tmp['location_description']
    data2send['plant_review'] = tmp['plant_review']
    data2send['xCord'] = tmp['xCord']
    data2send['yCord'] = tmp['yCord']
    data2send['imageFile'] = tmp['imageFile']

    print(data2send)


    plant_data = json.dumps({"name" : "tesdfasdasdsadsadsadsdssdfdst2", "tree" : 0})

    db_url = "https://bettereating-efb9.restdb.io/rest/plants"
    db_headers = {'content-type': "application/json",'x-apikey': "6ce326aadbd8a2fa57ead3238d9203f9cdd12",'cache-control': "no-cache"}
    plant_response = requests.request("POST", db_url, data=json.dumps(data2send), headers=db_headers)
    '''
    plants_list = json.loads(plant_response.text)

    resp = flask.make_response(random_plant_json)
    #resp = flask.make_response(json.loads(recipeResponse.text))
    #resp = flask.make_response(json.loads("{\"hello\": \"hello\"}"))
    print(request.get_json())
    resp.headers['Access-Control-Allow-Origin'] = '*'
    '''
    return "OK!"

@app.route("/bee-mode", methods=['POST'])
def beeMode():
    print("Recieved bee mode request")
    #print(request.data)
    #print(request.json)
    data = request.json

    
    db_url = "https://bettereating-efb9.restdb.io/rest/plants"
    db_headers = {'content-type': "application/json",'x-apikey': "6ce326aadbd8a2fa57ead3238d9203f9cdd12",'cache-control': "no-cache"}

    plant_response = requests.request("GET", db_url, headers=db_headers)

    plants_list = json.loads(plant_response.text)

    print(plants_list)

    close_plants_list = []

    currX = data['currX']
    currY = data['currY']

    for i in plants_list:
        if 'xCord' in i:
            plantX, plantY = i['xCord'], i['yCord']
            if sqrt( (plantX - currX)*(plantX - currX)  + (plantY - currY)*(plantY - currY) ) < 1000:
                close_plants_list.append(i)

    print(close_plants_list)
    
    
    random_plant_json = random.choice(close_plants_list)

    features = []
    if random_plant_json['thorns'] == 1:
        features.append('Thorns')
    if random_plant_json['spines'] == 1:
        features.append('Spines')
    if random_plant_json['succulent'] == 1:
        features.append('Succulent')
    if random_plant_json['leafy'] == 1:
        features.append('Leafy')
    if random_plant_json['bark'] == 1:
        features.append('Bark')

    colors = []
    if random_plant_json['red'] == 1:
        colors.append('Red')
    if random_plant_json['orange'] == 1:
        colors.append('Orange')
    if random_plant_json['yellow'] == 1:
        colors.append('Yellow')
    if random_plant_json['green'] == 1:
        colors.append('Green')
    if random_plant_json['violet'] == 1:
        colors.append('Violet')
    if random_plant_json['pink'] == 1:
        colors.append('Pink')
    if random_plant_json['white'] == 1:
        colors.append('White')
    if random_plant_json['black'] == 1:
        colors.append('Black')

    types = []
    if random_plant_json['flower'] == 1:
        types.append('Flower')
    if random_plant_json['tree'] == 1:
        types.append('Tree')
    if random_plant_json['shrub'] == 1:
        types.append('Shrub')


    random_plant_json['features'] = features
    random_plant_json['colors'] = colors
    random_plant_json['types'] = types


    resp = flask.make_response(random_plant_json)
    #resp = flask.make_response(json.loads(recipeResponse.text))
    #resp = flask.make_response(json.loads("{\"hello\": \"hello\"}"))
    print(request.get_json())

    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp

@app.route("/get-plants", methods=['POST'])
def getPlants():
    print("Recieved get plant request")
    #print(request.data)
    print(request.json)
    data = request.json

    db_url = "https://bettereating-efb9.restdb.io/rest/plants"
    db_headers = {'content-type': "application/json",'x-apikey': "6ce326aadbd8a2fa57ead3238d9203f9cdd12",'cache-control': "no-cache"}

    plant_response = requests.request("GET", db_url, headers=db_headers)

    plants_list = json.loads(plant_response.text)

    filtered_plant_list = []

    type_list = data['types']
    features_list = data['features']
    color_list = data['colors']

    for i in plants_list:
        valid_plant = False
        for j in type_list:
            if i[j] == 1:
                valid_plant = True
        for j in features_list:
            if i[j] == 1:
                valid_plant = True
        for j in color_list:
            if i[j] == 1:
                valid_plant = True
        if valid_plant == True:
            filtered_plant_list.append(i)
        
    for random_plant_json in filtered_plant_list:
        features = []
        if random_plant_json['thorns'] == 1:
            features.append('Thorns')
        if random_plant_json['spines'] == 1:
            features.append('Spines')
        if random_plant_json['succulent'] == 1:
            features.append('Succulent')
        if random_plant_json['leafy'] == 1:
            features.append('Leafy')
        if random_plant_json['bark'] == 1:
            features.append('Bark')

        colors = []
        if random_plant_json['red'] == 1:
            colors.append('Red')
        if random_plant_json['orange'] == 1:
            colors.append('Orange')
        if random_plant_json['yellow'] == 1:
            colors.append('Yellow')
        if random_plant_json['green'] == 1:
            colors.append('Green')
        if random_plant_json['violet'] == 1:
            colors.append('Violet')
        if random_plant_json['pink'] == 1:
            colors.append('Pink')
        if random_plant_json['white'] == 1:
            colors.append('White')
        if random_plant_json['black'] == 1:
            colors.append('Black')

        types = []
        if random_plant_json['flower'] == 1:
            types.append('Flower')
        if random_plant_json['tree'] == 1:
            types.append('Tree')
        if random_plant_json['shrub'] == 1:
            types.append('Shrub')

        random_plant_json['features'] = features
        random_plant_json['colors'] = colors
        random_plant_json['types'] = types


    json2send = {}
    json2send['plants'] = filtered_plant_list

    resp = flask.make_response(json2send)
    #resp = flask.make_response(json.loads(recipeResponse.text))
    #resp = flask.make_response(json.loads("{\"hello\": \"hello\"}"))
    print(request.get_json())

    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp

@app.route('/<path:path>')
def send_js(path):
    return current_app.send_static_file(path)



if __name__ == "__main__":       
    app.run(host = '0.0.0.0',port=5000)  