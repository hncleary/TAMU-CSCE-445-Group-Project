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
    #print(request.data)
    #print(request.json)
    plant_data = request.json

    db_url = "https://bettereating-efb9.restdb.io/rest/plants"
    db_headers = {'content-type': "application/json",'x-apikey': "6ce326aadbd8a2fa57ead3238d9203f9cdd12",'cache-control': "no-cache"}
    plant_response = requests.request("POST", db_url, data=plant_data, headers=db_headers)
    '''
    plants_list = json.loads(plant_response.text)

    resp = flask.make_response(random_plant_json)
    #resp = flask.make_response(json.loads(recipeResponse.text))
    #resp = flask.make_response(json.loads("{\"hello\": \"hello\"}"))
    print(request.get_json())
    resp.headers['Access-Control-Allow-Origin'] = '*'
    '''
    return "OK!"

@app.route("/bee-mode", methods=['GET'])
def beeMode():
    print("Recieved bee mode request")
    #print(request.data)
    #print(request.json)
    data = request.json

    
    db_url = "https://bettereating-efb9.restdb.io/rest/plants"
    db_headers = {'content-type': "application/json",'x-apikey': "6ce326aadbd8a2fa57ead3238d9203f9cdd12",'cache-control': "no-cache"}

    plant_response = requests.request("GET", db_url, headers=db_headers)

    plants_list = json.loads(plant_response.text)

    close_plants_list = []

    currX = data['currX']
    currY = data['currY']

    for i in plants_list:
        plantX, plantY = i['xCord'], i['yCord']
        if sqrt( (plantX - currX)*(plantX - currX)  + (plantY - currY)*(plantY - currY) ) < 10:
            close_plants_list.add(i)

    print(close_plants_list)
    
    random_plant_json = random.choice(close_plants_list)

    resp = flask.make_response(random_plant_json)
    #resp = flask.make_response(json.loads(recipeResponse.text))
    #resp = flask.make_response(json.loads("{\"hello\": \"hello\"}"))
    print(request.get_json())

    resp.headers['Access-Control-Allow-Origin'] = '*'
    return resp

@app.route("/get-plants", methods=['GET'])
def getPlants():
    print("Recieved bee mode request")
    #print(request.data)
    #print(request.json)
    data = request.json

    db_url = "https://bettereating-efb9.restdb.io/rest/plants"
    db_headers = {'content-type': "application/json",'x-apikey': "6ce326aadbd8a2fa57ead3238d9203f9cdd12",'cache-control': "no-cache"}

    plant_response = requests.request("GET", db_url, headers=db_headers)

    plants_list = json.loads(plant_response.text)

    filtered_plant_list = []

    type_list = data['type']
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