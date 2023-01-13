import { FunctionComponent, useState } from "react";
import styles from '../assets/css/home.module.css';
import UploadButton from "../components/UploadButton";
import { Card } from "@mui/material";
import Button from '@mui/material/Button';
import Lottie from "lottie-react";
import predictionApi from "../api/prediction-api";
import PieChart from "../components/PieChart";
import loadingAnimation from "../assets/images/loading.json";


const HomePage: FunctionComponent = () => {
  const [trainFile, setTrainFile] = useState<any>();
  const [testFile, setTestFile] = useState<any>();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [precision, setPrecision] = useState<number>();
  const [successfulPredictions, setSuccessfulPredictions] = useState<[]>();
  const [unsuccessfulPredictions, setUnsuccessfulPredictions] = useState<[]>();
  const [isButtonPressed, setIsButtonPressed] = useState<boolean>(false);

  const handleSubmit = async () => {
    if (trainFile === undefined || testFile === undefined) {
      setErrorMessage('Please provide the 2 files');
      return;
    }
    setIsButtonPressed(true);
    setErrorMessage('');
    const formData = new FormData();
    formData.append('train_data', trainFile);
    formData.append('test_data', testFile);

    await predictionApi.getPrediction(formData)
      .then((res) => {
        if (res.status === 200) {
          setIsButtonPressed(false);
          setPrecision(res.data[0]);
          setSuccessfulPredictions(res.data[1]);
          setUnsuccessfulPredictions(res.data[2]);
        }
      })

  }

  return (
    <div className={styles.container}>
      <div className={styles["inner-container"]}>
        <Card style={{height: 550, width: 550, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
          {isButtonPressed ? (
            <Lottie animationData={loadingAnimation} loop={true} />
          ) : precision && (
            <PieChart 
              precision={precision}
            />
          )}
          
        </Card>
        <Card style={{height: 340, width: 400, marginLeft: 50}}>
          <div className={styles["side-panel"]}>
            <UploadButton
              title="Upload train data"
              onUpload={setTrainFile}
            />
            <UploadButton
              title="Upload test data"
              onUpload={setTestFile}
            />
            <Button variant="contained" className={styles["send-button"]} onClick={() => handleSubmit()}>
              Send
            </Button>
            <div className={styles.error}>
              {errorMessage}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default HomePage;
