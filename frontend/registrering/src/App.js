import './App.css';
import React, { useState } from 'react';

function App() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [studentId, setStudentId] = useState('');

  const fetchData = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(`http://localhost:3000/Canvas/get_StudentResult?studentId=${studentId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error('Fetch error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <h1>Hämta Student Resultat från API</h1>
      <input
        type="text"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
        placeholder="Enter Student ID"
      />
      <button onClick={fetchData}>Fetch Student Results</button>

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
        </>
      )}
    </div>
  );
}

export default App;