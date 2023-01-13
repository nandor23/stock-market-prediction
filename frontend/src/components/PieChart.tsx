import { FunctionComponent } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import styles from '../assets/css/pie-chart.module.css';


ChartJS.register(ArcElement, Tooltip, Legend);


interface ChartProps {
  precision: number;
}


const PieChart: FunctionComponent<ChartProps> = ({precision}) => {

  const data = {
    labels: ['Successful prediction', 'Failed prediction'],
    datasets: [
    {
      label: 'Prediction',
      data: [precision, 100 - precision],
      backgroundColor: [
        'rgba(75, 192, 192, 0.3)',
        'rgba(255, 99, 132, 0.3)',
      ],
      borderColor: [
        'rgba(75, 192, 192, 1)',
        'rgba(255, 99, 132, 1)',
      ],
      borderWidth: 1,
    },
  ],
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          usePointStyle: true,
          pointStyle: 'circle',
        },
      },
    }
  }

  return (
    <div className={styles.container}>
      <Pie data={data} options={options}/>
    </div>
  );
}

export default PieChart;
