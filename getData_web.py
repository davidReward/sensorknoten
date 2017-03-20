from flask import Flask, jsonify, abort, make_response, url_for
from flask.ext.httpauth import HTTPBasicAuth
from createJSON import *

auth = HTTPBasicAuth()

app = Flask(__name__)



def make_public_mdatum(mdatum):
    new_ressource = {}
    for field in mdatum:
        if field == 'id':
            new_ressource['uri'] = url_for('get_mdatum', mdatum_id=mdatum['id'], _external=True)
        else:
            new_ressource[field] = mdatum[field]
    return new_ressource

@auth.get_password
def get_password(username):
    if username == 'tester':
        return 'python'
    return None

@auth.error_handler
def unauthorized():
    return make_response(jsonify({'error': 'Unauthorized access'}), 401)

@app.errorhandler(404)
def not_found(error):
    return make_response(jsonify({'error': 'Not found'}), 404)


@app.route('/mdata/station/<int:station>/<int:limit>', methods=['GET'])
@auth.login_required
def get_mdataall(station,limit):
    query_result = queryDB('originAddr',station,limit)
    return jsonify({'Messdaten': query_result})

@app.route('/mdata/station', methods=['GET'])
@auth.login_required
def get_mStationAll():
    query_result = queryDBallStation()
    return jsonify({'Stationen': [query_result]})


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
