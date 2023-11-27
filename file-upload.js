import React, { useState } from 'react';

const FileUpload = () => {
  const [formData, setFormData] = useState({
    // Your other form data fields go here
    fieldName: '',
  });
  const [file, setFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    if (!file) {
      console.error('No file selected');
      return;
    }

    try {
      const formDataObj = new FormData();

      // Append your form data fields
      formDataObj.append('fieldName', formData.fieldName);

      // Append the file
      formDataObj.append('file', file);

      const response = await fetch('https://example.com/api/upload', {
        method: 'POST',
        body: formDataObj,
      });

      if (response.ok) {
        console.log('File uploaded successfully');
        // Handle any additional logic on success
      } else {
        console.error('File upload failed');
        // Handle errors
      }
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div>
      {/* Your other form fields */}
      <input
        type="text"
        name="fieldName"
        value={formData.fieldName}
        onChange={handleInputChange}
      />

      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default FileUpload;
