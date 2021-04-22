import requests
import json

def getCurrentLocation():
	send_url = "http://api.ipstack.com/check?access_key=37f944ba70721afc17a73b23cff2f239"
	geo_req = requests.get(send_url)
	geo_json = json.loads(geo_req.text)
	latitude = geo_json['latitude']
	longitude = geo_json['longitude']
	city = geo_json['city']

	print("[INFO] Location : ", city)

	return city