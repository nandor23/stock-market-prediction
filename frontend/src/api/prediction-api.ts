import axios, { AxiosResponse } from 'axios';

interface PredictionApi {
  getPrediction(data: FormData): Promise<AxiosResponse>;
}

const predictionApi: PredictionApi = {
  
  async getPrediction(data: FormData): Promise<AxiosResponse> {
    return await axios.post('/api/prediction', data);
  },

}

export default predictionApi;
