import sqlite3
from flask import Flask, jsonify, abort, make_response, url_for
from flask.ext.httpauth import HTTPBasicAuth
from sqlobject import *
import simplejson
from createJSON import *

auth = HTTPBasicAuth()

app = Flask(__name__)

mdata = [
    {
        'id': 1,
        'title': u'Buy groceries',
        'description': u'Milk, Cheese, Pizza, Fruit, Tylenol',
        'done': False
    },
    {
        'id': 2,
        'title': u'Learn Python',
        'description': u'Need to find a good Python tutorial on the web',
        'done': False
    }
]


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


@app.route('/todo/api/v1.0/mdata', methods=['GET'])
@auth.login_required
def get_mdata():
    return jsonify({'mdata': [make_public_mdatum(mdatum) for mdatum in mdata]})

@app.route('/todo/api/v1.0/mdata/<int:mdatum_id>', methods=['GET'])
@auth.login_required
def get_mdatum(mdatum_id):
    mdatum = [mdatum for mdatum in mdata if mdatum['id'] == mdatum_id]
    if len(mdatum) == 0:
        abort(404)
    return jsonify({'mdata': [make_public_mdatum(mdatum[0])]})


if __name__ == '__main__':
    table="messwerte"
    col = "value"
    value="31.0"

    print queryDB(table, col, value)

    app.run(host='0.0.0.0', debug=True)