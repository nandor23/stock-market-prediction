import { FunctionComponent, useState } from "react";
import styles from '../assets/css/home.module.css';
import UploadButton from "../components/UploadButton";
import { Card } from "@mui/material";
import predictionApi from "../api/prediction-api";
// import { Line } from 'react-chartjs-2';


const HomePage: FunctionComponent = () => {
  const [trainFile, setTrainFile] = useState<any>();
  const [testFile, setTestFile] = useState<any>();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [precision, setPrecision] = useState<number>();
  const [successfulPredictions, setSuccessfulPredictions] = useState<[]>();
  const [unsuccessfulPredictions, setUnsuccessfulPredictions] = useState<[]>();

  const handleSubmit = async () => {
    if (trainFile === undefined || testFile === undefined) {
      setErrorMessage('Please provide the 2 files');
      return;
    }
    setErrorMessage('');
    const formData = new FormData();
    formData.append('train_data', trainFile);
    formData.append('test_data', testFile);

    await predictionApi.getPrediction(formData)
      .then((res) => {
        if (res.status === 200) {
          setPrecision(res.data[0]);
          setSuccessfulPredictions(res.data[1]);
          setUnsuccessfulPredictions(res.data[2]);
        }
      })

  }

  return (
    <div className={styles.container}>
      <Card>
        <div className={styles["side-panel"]}>
          <UploadButton
            title="Upload train data"
            onUpload={setTrainFile}
          />
          <UploadButton
            title="Upload test data"
            onUpload={setTestFile}
          />
          <button className={styles["send-button"]}
            onClick={() => handleSubmit()}
          >
            Send
          </button>
          <div className={styles.error}>
            {errorMessage}
          </div>
        </div>
      </Card>
    </div>
  );
}

export default HomePage;
