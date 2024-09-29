import React, { useState, useEffect } from 'react';

const API_URL = 'http://localhost:8000';

export default function RoverControl() {
  const [status, setStatus] = useState('');

  const sendCommand = async (action : any) => {
    try {
      const response = await fetch(`${API_URL}/send_command?action=${action}`, {
        method: 'POST',
      });
      await response.json();
      setStatus(`Command sent: ${action}`);
    } catch (error) {
      console.error('Error:', error);
      setStatus('Error sending command');
    }
  };

  const handleKeyDown = (event : any) => {
    switch(event.key.toLowerCase()) {
      case 'w': sendCommand('left'); break; // Forward
      case 'd': sendCommand('forward'); break; // Clockwise
      case 'q': sendCommand('stop'); break;
      case 'a': sendCommand('backward'); break; // Anti-clockwise
      case 's': sendCommand('right'); break; // Backward
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-6">Rover Control</h1>
      <div className="grid grid-cols-3 gap-4">
        <button onClick={() => sendCommand('stop')} className="bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-6 rounded">
          Q<br />(Stop)
        </button>
        <button onClick={() => sendCommand('left')} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded">
          W<br />(Forward)
        </button>
        <button onClick={() => sendCommand('forward')} className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded">
          D<br />(Clockwise)
        </button>
        <button onClick={() => sendCommand('backward')} className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-4 px-6 rounded">
          A<br />(Anti-clockwise)
        </button>
        <button onClick={() => sendCommand('right')} className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-4 px-6 rounded">
          S<br />(Backward)
        </button>
      </div>
      {status && (
        <div className="mt-4 p-2 bg-gray-200 rounded">
          <p>{status}</p>
        </div>
      )}
    </div>
  );
}