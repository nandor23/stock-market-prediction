from flask import Flask

app = Flask(__name__)


@app.route("api/prediction")
def index():
    return "hello"


# @staticmethod
# def read_data(file, data):
#     with open(file) as csv_file:
#         csv_reader = csv.reader(csv_file)
#         next(csv_reader)
#         for row in csv_reader:
#             data.append(Data(row[0], float(row[1]), float(row[2]), float(row[3]), float(row[4]), int(row[5])))

if __name__ == "__main__":
    app.run(debug=True)
