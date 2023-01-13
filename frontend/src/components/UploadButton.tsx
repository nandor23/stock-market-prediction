import { FunctionComponent, useState } from "react";
import styles from '../assets/css/upload-button.module.css';


interface UploadButtonProps {
  title: string;
  onUpload: (file: any) => void;
}

const UploadButton: FunctionComponent<UploadButtonProps> = ({title, ...props}) => {
  const [name, setName] = useState<string>('');
  return (
    <div className={styles.container}>
      <div className={styles["upload-button"]}>
        <label>
          <input type="file" style={{display: 'none'}} accept=".csv"
            onChange={(e) => {
              if (e.target.files != null) {
                setName(e.target.files[0].name);
                const reader = new FileReader();
                reader.onload = () => {
                    props.onUpload(reader.result)
                }
                reader.readAsText(e.target.files[0]);
              }
            }}
          />
          <div style={{cursor: 'pointer'}}>
            {title}
          </div>
        </label>
      </div>
      <div style={{alignSelf: 'center'}}>
        {name}
      </div>
    </div>
  );
}

export default UploadButton;
