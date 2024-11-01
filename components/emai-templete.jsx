import React from 'react';

const EmailTemplate = ({ message }) => {
  const emailStyles = {
    fontFamily: 'Arial, sans-serif',
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    color: '#333',
    borderRadius: '8px',
    border: '1px solid #ddd',
  };

  const headerStyles = {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#0073e6',
    textAlign: 'center',
    marginBottom: '20px',
  };

  const messageStyles = {
    fontSize: '16px',
    lineHeight: '1.6',
    whiteSpace: 'pre-wrap',
  };

  const footerStyles = {
    fontSize: '14px',
    color: '#888',
    textAlign: 'center',
    marginTop: '20px',
  };

  return (
    <div style={emailStyles}>
      <div style={headerStyles}>Company Name</div>
      <div style={messageStyles}>{message}</div>
      <div style={footerStyles}>© 2024 Company Name. All rights reserved.</div>
    </div>
  );
};

export default EmailTemplate;
