from flask import Flask, request
from flask_cors import CORS
from stock_prediction import *

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route("/")
def index():
    return ''


@app.route("/api/prediction", methods=['POST'])
def prediction():
    train_data = request.form.get('train_data')
    test_data = request.form.get('test_data')
    predictor = StockPrediction(train_data)
    precision, success, fail = predictor.predict(test_data)
    return [precision, success, fail]


if __name__ == "__main__":
    app.run(debug=True)
