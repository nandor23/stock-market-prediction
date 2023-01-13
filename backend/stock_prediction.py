import os
import pandas as pd
from sklearn.ensemble import RandomForestClassifier


class StockPrediction:
    def __init__(self, train_data):
        self.train_data = self.get_data(train_data)
        self.test_data = []
        self.add_extra_columns(self.train_data)
        self.train_data = self.train_data.iloc[:-1, :]

    @staticmethod
    def get_data(raw_data):
        temp_file = 'temp.csv'
        f = open(temp_file, 'w')
        f.write(raw_data)
        f.close()
        data = pd.read_csv(temp_file, index_col=0)
        os.remove(temp_file)
        return data

    # Két új oszlop hozzáadása. "Tomorrow" oszlop a következő nap "Close" ára.
    # "Increases" oszlop értéke 1, ha a következő nap nőtt az ár, különben 0
    @staticmethod
    def add_extra_columns(data):
        data['Tomorrow'] = data['Close'][1:]
        data['Tomorrow'] = data['Tomorrow'].shift(-1)

        new_column = []
        for close, tomorrow in zip(data['Close'], data['Tomorrow']):
            if tomorrow > close:
                new_column.append(1)
            else:
                new_column.append(0)
        data['Increases'] = new_column

    def predict(self, test_data):
        self.test_data = self.get_data(test_data)
        self.add_extra_columns(self.test_data)
        self.test_data = self.test_data.iloc[:-1, :]

        model = RandomForestClassifier()
        model.n_estimators = 100
        model.min_samples_split = 100
        model.random_state = 1

        predictors = ['Open', 'Close', 'Volume', 'Low', 'High']
        model.fit(self.train_data[predictors], self.train_data['Increases'])

        pred = model.predict(self.test_data[predictors])
        correct_predictions = []
        false_predictions = []
        i = 0
        for index, row in self.test_data.iterrows():
            if int(row['Increases']) == pred[i]:
                correct_predictions.append({'date': index, 'open': row['Open'], 'high': row['High'], 'low': row['Low'],
                                            'close': row['Close'], 'volume': row['Volume']})
            else:
                false_predictions.append({'date': index, 'open': row['Open'], 'high': row['High'], 'low': row['Low'],
                                          'close': row['Close'], 'volume': row['Volume']})
            i += 1
        return len(correct_predictions) * 100 / len(pred), correct_predictions, false_predictions
