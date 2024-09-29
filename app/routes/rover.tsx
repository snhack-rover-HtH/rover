import React, { useState, useEffect, ChangeEvent } from 'react';

const API_URL: string = "https://rover-python.onrender.com";

export default function RoverControl(): JSX.Element {
  const [status, setStatus] = useState<string>('');
  const [youtubeLink, setYoutubeLink] = useState<string>('');
  const [embedUrl, setEmbedUrl] = useState<string>('');
  const [movementState, setMovementState] = useState<'stopped' | 'forward' | 'backward'>('stopped');
  const [activeButton, setActiveButton] = useState<string | null>(null); // Track active button for animation

  const sendCommand = async (action: string): Promise<void> => {
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

  // Map the WASD and Arrow keys to corresponding commands and buttons
  const keyToCommand = {
    'w': 'forward',
    'arrowup': 'forward',
    's': 'backward',
    'arrowdown': 'backward',
    'a': 'left',
    'arrowleft': 'left',
    'd': 'right',
    'arrowright': 'right'
  };

  // Handle key down for continuous sending of commands
  const handleKeyDown = (event: KeyboardEvent): void => {
    const key = event.key.toLowerCase();
    if (activeButton === key) return; // Prevent repeating when the key is already held down

    setActiveButton(key);

    if (key in keyToCommand) {
      const command = keyToCommand[key];
      if (command === 'forward') {
        if (movementState === 'backward') {
          sendCommand('stop');
          setMovementState('stopped');
        } else {
          sendCommand('forward');
          setMovementState('forward');
        }
      } else if (command === 'backward') {
        if (movementState === 'stopped') {
          sendCommand('backward');
          setMovementState('backward');
        } else {
          sendCommand('stop');
          setMovementState('stopped');
        }
      } else {
        sendCommand(command);
      }
    }
  };

  // Handle key up to stop the rover when button is released
  const handleKeyUp = (event: KeyboardEvent): void => {
    const key = event.key.toLowerCase();
    setActiveButton(null); // Clear active button for animation

    if (key in keyToCommand) {
      sendCommand('stop');
      if (key === 'w' || key === 's' || key === 'arrowup' || key === 'arrowdown') {
        setMovementState('stopped');
      }
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, [movementState]);

  const handleYoutubeLinkChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setYoutubeLink(e.target.value);
  };

  const embedYoutubeVideo = (): void => {
    const videoId = extractVideoId(youtubeLink);
    if (videoId) {
      setEmbedUrl(`https://www.youtube.com/embed/${videoId}`);
    } else {
      setStatus('Invalid YouTube URL');
    }
  };

  const extractVideoId = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|live\/)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black p-4">
      <h1 className="text-3xl font-bold mb-6 text-white">Rover Control</h1>

      {/* YouTube Link Input */}
      <div className="space-x-2 mb-6 flex w-full max-w-md">
        <input
          type="text"
          value={youtubeLink}
          onChange={handleYoutubeLinkChange}
          placeholder="Enter YouTube URL"
          className="w-full px-3 py-2 border rounded-md"
        />
        <button
          onClick={embedYoutubeVideo}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded w-2/5"
        >
          Embed Video
        </button>
      </div>

      {/* Embedded YouTube Video */}
      {embedUrl && (
        <div className="mb-6 w-full max-w-xl">
          <iframe
            width="100%"
            height="315"
            src={embedUrl}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Rover Live Stream"
          ></iframe>
        </div>
      )}

      {/* Rover Control Buttons */}
      <div className="text-center">
        {/* Forward (W key and Arrow Up) */}
        <div className="mb-4">
          <button
            onClick={() => sendCommand('forward')}
            className={`bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded ${
              activeButton === 'w' || activeButton === 'arrowup' ? 'animate-press' : ''
            }`}
          >
            W <br />
            <i className="fas fa-arrow-up"></i>
          </button>
        </div>

        {/* Left (A / ArrowLeft), Backward (S / ArrowDown), Right (D / ArrowRight) */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => sendCommand('left')}
            className={`bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-4 px-6 rounded ${
              activeButton === 'a' || activeButton === 'arrowleft' ? 'animate-press' : ''
            }`}
          >
            A <br />
            <i className="fas fa-arrow-left"></i>
          </button>

          <button
            onClick={() => sendCommand('backward')}
            className={`bg-red-500 hover:bg-red-600 text-white font-bold py-4 px-6 rounded ${
              activeButton === 's' || activeButton === 'arrowdown' ? 'animate-press' : ''
            }`}
          >
            S <br />
            <i className="fas fa-arrow-down"></i>
          </button>

          <button
            onClick={() => sendCommand('right')}
            className={`bg-blue-500 hover:bg-blue-600 text-white font-bold py-4 px-6 rounded ${
              activeButton === 'd' || activeButton === 'arrowright' ? 'animate-press' : ''
            }`}
          >
            D <br />
            <i className="fas fa-arrow-right"></i>
          </button>
        </div>
      </div>

      {/* Status Display */}
      {status && (
        <div className="mt-4 p-2 bg-gray-200 rounded">
          <p>{status}</p>
        </div>
      )}
    </div>
  );
}
