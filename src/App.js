import React, { useState } from 'react';
import './App.css';
import AWS from 'aws-sdk';

// Removed dotenv.config() since it's not effective in client-side React builds

const S3_BUCKET = process.env.REACT_APP_AWS_S3_BUCKET;
const REGION = process.env.REACT_APP_AWS_REGION;

AWS.config.update({
  accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
});

const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION,
});

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
    setUploadProgress(0); // Reset progress on new file selection
    console.log("File selected:", e.target.files[0]);
  };

  const uploadFile = (file) => {
    console.log('Uploading file:', file);
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    const params = {
      Body: file,
      Bucket: S3_BUCKET,
      Key: file.name,
    };

    myBucket.putObject(params)
      .on('httpUploadProgress', (evt) => {
        setUploadProgress(Math.round((evt.loaded / evt.total) * 100));
      })
      .send((err) => {
        if (err) console.log(err);
        else alert("Successfully uploaded file!");
      });
  };

  return (
    <div className="App">
      <div className="upload-container">
        <h1>Upload a File to S3</h1>
        <input type="file" onChange={handleFileInput} />
        <button onClick={() => uploadFile(selectedFile)}>Upload to S3</button>
        <div className="progress-container">
          <div className="progress-bar" style={{width: `${uploadProgress}%`}}></div>
        </div>
      </div>
    </div>
  );
}

export default App;
