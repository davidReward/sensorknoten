from flask import Flask, jsonify, abort, make_response, url_for, request
from flask.ext.httpauth import HTTPBasicAuth
from createJSON import *
from flask_cors import CORS, cross_origin
from config import *

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
    return make_response(jsonify({'error': 'Not found'}), 404)


@app.route('/mdata/<string:mdatum_id>', methods=['GET'])
@auth.login_required
def get_mdatum(mdatum_id):
    query_result = queryDB_id(mdatum_id)
    return jsonify({'Messdaten': [make_public_mdatum(data) for data in query_result]  })

@app.route('/mdata/station/<int:station>', methods=['GET'])
@auth.login_required
def get_mdataall(station):
    begin = request.args.get('begin')
    end = request.args.get('end')
    if begin is None and end is None:
        query_result = queryDB_station(station)
        return jsonify({'Messdaten': [make_public_mdatum(data) for data in query_result]})

    if begin is not None and end is not None:
        query_result = queryDB_station_interval(station, begin, end)
        return jsonify({'Messdaten':  [make_public_mdatum(data) for data in query_result]})

    abort(404)



@app.route('/mdata/station', methods=['GET'])
@auth.login_required
def get_mStationAll():
    query_result = queryDBallStation()
    return jsonify({'Stationen': query_result})

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)

