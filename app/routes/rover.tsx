import React, { useState, useEffect, ChangeEvent } from 'react';

const API_URL: string = "https://rover-python.onrender.com"

export default function RoverControl(): JSX.Element {
  const [status, setStatus] = useState<string>('');
  const [youtubeLink, setYoutubeLink] = useState<string>('');
  const [embedUrl, setEmbedUrl] = useState<string>('');

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

  const handleKeyDown = (event: KeyboardEvent): void => {
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
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Rover Control</h1>
     
      <div className="mb-6 w-full max-w-md">
        <input
          type="text"
          value={youtubeLink}
          onChange={handleYoutubeLinkChange}
          placeholder="Enter YouTube URL"
          className="w-full px-3 py-2 border rounded-md"
        />
        <button
          onClick={embedYoutubeVideo}
          className="mt-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full"
        >
          Embed Video
        </button>
      </div>
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
      <div className="grid grid-cols-3 gap-4 mb-6">
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