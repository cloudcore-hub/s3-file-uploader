import React, { useState } from 'react';
import './App.css';
import AWS from 'aws-sdk';

require('dotenv').config();

const S3_BUCKET = process.env.AWS_S3_BUCKET;
const REGION = process.env.AWS_REGION;


AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});


AWS.config.update({
  accessKeyId: 'in the file ',
  secretAccessKey: 'intehsdf '
});

const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET},
  region: REGION,
})

function App() {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileInput = (e) => {
    setSelectedFile(e.target.files[0]);
    console.log("File selected:", e.target.files[0]);
  }

  const uploadFile = (file) => {
    console.log('Uploading file:', file);
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }
    const params = {
      // ACL: 'public-read',
      Body: file,
      Bucket: S3_BUCKET,
      Key: file.name
    };

    myBucket.putObject(params)
      .on('httpUploadProgress', (evt) => {
        console.log(Math.round((evt.loaded / evt.total) * 100) + '%');
      })
      .send((err) => {
        if (err) console.log(err)
        else alert("Successfully uploaded file!");
      })
  }

  return (
    <div className="App">
      <h1>Upload a File to S3</h1>
      <input type="file" onChange={handleFileInput}/>
      <button onClick={() => uploadFile(selectedFile)}> Upload to S3</button>
    </div>
  );
}

export default App;
