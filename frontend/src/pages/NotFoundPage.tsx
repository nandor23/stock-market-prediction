import { FunctionComponent } from "react";
import styles from '../assets/css/not-found.module.css';


const NotFoundPage: FunctionComponent = () => {
  return (
    <div className={styles.container}>
       <img className={styles.image} src={require('../assets/images/not_found.png')} alt='Not Found'/>
       <text className={styles.title}>Oops!</text>
       <text className={styles.description}>We can't seem to find the page you are looking for</text>
    </div>
  );
}

export default NotFoundPage;
