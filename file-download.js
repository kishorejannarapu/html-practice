import React from 'react';

const FileDownloadButton = () => {
  const handleDownload = async () => {
    try {
      // Data to be sent in the POST request
      const postData = {
        // Your POST data goes here
      };

      // Send a POST request to the server
      const response = await fetch('https://example.com/api/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Additional headers as needed
        },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Extract the filename from the response headers (adjust as needed)
      const contentDisposition = response.headers.get('Content-Disposition');
      const filenameMatch = contentDisposition && contentDisposition.match(/filename="(.+)"/);
      const filename = filenameMatch ? filenameMatch[1] : 'downloaded-file.txt';

      // Convert the response to a Blob
      const fileBlob = await response.blob();

      // Create a link element
      const link = document.createElement('a');

      // Set the href attribute with the Blob URL
      link.href = URL.createObjectURL(fileBlob);

      // Set the download attribute with the filename
      link.download = filename;

      // Append the link to the document
      document.body.appendChild(link);

      // Trigger a click on the link to start the download
      link.click();

      // Remove the link from the document
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <div>
      <button onClick={handleDownload}>Download File</button>
    </div>
  );
};

export default FileDownloadButton;
