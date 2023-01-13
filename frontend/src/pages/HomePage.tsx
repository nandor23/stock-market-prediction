import { FunctionComponent, useEffect, useState } from "react";
import styles from '../assets/css/home.module.css';
import UploadButton from "../components/UploadButton";
import { Card } from "@mui/material";
import Button from '@mui/material/Button';
import Lottie from "lottie-react";
import predictionApi from "../api/prediction-api";
import PieChart from "../components/PieChart";
import loadingAnimation from "../assets/images/loading.json";
import DataTable from "../components/DataTable";
import uuid from 'react-uuid';


const HomePage: FunctionComponent = () => {
  const [trainFile, setTrainFile] = useState<any>();
  const [testFile, setTestFile] = useState<any>();
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [precision, setPrecision] = useState<number>();
  const [successfulPredictions, setSuccessfulPredictions] = useState<[]>();
  const [isButtonPressed, setIsButtonPressed] = useState<boolean>(false);
  const [heads, setHeads] = useState<[]>();
  const [data, setData] = useState<[]>();

  useEffect(() => {
    if (testFile !== undefined) {
      const splitData = testFile.split(/\r?\n/);
      setHeads(splitData.shift().split(','));
      splitData.pop();
      for (let i = 0; i < splitData.length; i++) {
        splitData[i] =  splitData[i].split(',')
        splitData[i] =  {
          id: uuid(),
          date: splitData[i][0],
          open: splitData[i][1],
          high: splitData[i][2],
          low: splitData[i][3],
          close: splitData[i][4],
          volume: splitData[i][5],
        }
      }
      setData(splitData);
    }
  }, [testFile])

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
        }
      })

  }

  return (
    <div className={styles.container}>
      <div className={styles["inner-container"]} style={{marginTop: testFile === undefined ?  0 : 880}}>
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
      <div style={{marginTop: 150}}>
      {data !== undefined &&
        <DataTable heads={heads} data={data} successful={successfulPredictions}/>
      }
      </div>
    </div>
  );
}

export default HomePage;
