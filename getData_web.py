from flask import Flask, jsonify, abort, make_response, url_for, request
from flask.ext.httpauth import HTTPBasicAuth
from createJSON import *
from flask_cors import CORS, cross_origin
from config import *
from sss_config import *
import sys
import json


auth = HTTPBasicAuth()

app = Flask(__name__)
CORS(app,supports_credentials=True)


def make_public_mdatum(mdata):
    new_ressource = {}
    for field in mdata:
        if field == 'id':
            new_ressource['uri'] = url_for('get_mdatum', mdatum_id=mdata['id'], _external=True)
        else:
            new_ressource[field]= mdata[field]
    return new_ressource
	
def minimizeData(query_result):
    query_result_New = query_result
    
    return query_result_New


@auth.get_password
def get_password(username):
    if username == USERNAME:
        return PASSWORD
    return None

@auth.error_handler
def unauthorized():
    return make_response(jsonify({'error': 'Unauthorized access'}), 401)

@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Keine Messung in dem angegebenen Zeitraum gefunden'}), 404)


@app.route('/mdata/<string:mdatum_id>', methods=['GET'])
@auth.login_required
def get_mdatum(mdatum_id):
    query_result = queryDB_id(mdatum_id)
    if len(query_result) != 0:
        return jsonify({'Messdaten': [make_public_mdatum(data) for data in query_result]  })
    abort(404)


@app.route('/mdata/station/<int:station>', methods=['GET'])
@auth.login_required
def get_mdataall(station):
    query_result = queryDB_station(station)
    if len(query_result) != 0:
        return jsonify({'Messdaten': [make_public_mdatum(data) for data in query_result]})

    abort(404)

@app.route('/mdata/station/<int:station>/<int:unit>', methods=['GET'])
@auth.login_required
def get_mdataUnit(station, unit):
    begin = request.args.get('begin')
    end = request.args.get('end')
    anzahlDatenpunkte =  request.args.get('anzahl')

    if begin is not None and end is not None:
        query_result = queryDB_station_interval(station, unit, begin, end)
        query_result =  minimizeData(query_result)
        if len(query_result) != 0:
            return jsonify({'Messdaten':  [make_public_mdatum(data) for data in query_result]})

    abort(404)



@app.route('/mdata/station', methods=['GET'])
@auth.login_required
def get_mStationAll():
    query_result = queryDBallStation()
    if len(query_result) != 0:
        return jsonify({'Stationen': query_result})
    abort(404)

@app.route('/api/signer', methods=['GET', 'POST'])
#@auth.login_required
def json_in_db():
    # force erzwingt interpretation als JSON
    content = request.get_json(force=True)

    # TODO: Daten loeschen mit where 1 cond.

    for item in range(0,len(content)):
        writeDB(content[item]['Name'], 'no position', 'no description', content[item]['Timespan'] , content[item]['URL'])

    #writeDB(content[0]['Name'], 'keine Position', 'keine Beschreibung', content[0]['Timespan'])


    resp = jsonify()
    resp.status_code = 201
    return resp


@app.route('/api/signer/<string:name>', methods=['GET'])
#@auth.login_required
def json_from_db(name):
    query_result = readDB(name)
    if len(query_result) != 0:
        return jsonify({'signers': query_result})


    abort(404)

@app.route('/api/signers', methods=['GET'])
#@auth.login_required
def json_from_db_all():
    query_result = readDB_all()
    if len(query_result) != 0:
        return jsonify({'signers': query_result})
    abort(404)

if __name__ == '__main__':
    app.run(host='0.0.0.0',port=8080, debug=True)
