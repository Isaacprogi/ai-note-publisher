import React from 'react';

interface Props {
  message: string;
  type: 'success' | 'error';
}

export const NotificationToast: React.FC<Props> = ({ message, type }) => (
  <div className={`fixed top-4 right-4 z-50 p-4 rounded-md shadow-lg text-white ${
    type === 'success' ? 'bg-green-500' : 'bg-red-500'
  }`}>
    {message}
  </div>
);
