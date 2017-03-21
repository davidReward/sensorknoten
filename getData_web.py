from flask import Flask, jsonify, abort, make_response, url_for, request
from flask.ext.httpauth import HTTPBasicAuth
from createJSON import *
from flask_cors import CORS, cross_origin
from config import *

auth = HTTPBasicAuth()

app = Flask(__name__)
CORS(app,supports_credentials=True)

#TODO: Delete
def make_public_mdatum_old(mdatum):
    new_ressource = {}
    for field in mdatum:
        if field == 'id':
            new_ressource['uri'] = url_for('get_mdatum', mdatum_id=mdatum['id'], _external=True)
        else:
            new_ressource[field] = mdatum[field]
    return new_ressource

def make_public_mdatum(mdatum_id):
    new_ressource = {}
    new_ressource['uri'] = url_for('get_mdatum', mdatum_id=mdatum_id)
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
    #print url_for('get_mdatum', mdatum_id=mdatum_id)
    print make_public_mdatum(mdatum_id)
    return jsonify({'Messdaten': query_result})

#TODO: Parameteruebergabe
@app.route('/mdata/station/<int:station>', methods=['GET'])
@auth.login_required
def get_mdataall(station):
    query_result = queryDBLimit('originAddr', station, 2)
    return jsonify({'Messdaten': query_result})

@app.route('/mdata/station', methods=['GET'])
@auth.login_required
def get_mStationAll():
    query_result = queryDBallStation()
    return jsonify({'Stationen': query_result})


if __name__ == '__main__':
    #print queryDB_id('e39a977d6bce4395cad34b00dfbf545d')
    app.run(host='0.0.0.0', debug=True)

