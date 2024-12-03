import React, { useState } from 'react';
import axios from 'axios';
import './TrainDetails.css'; // Optional: add your own styles

const TrainStatus = () => {
  const [query, setQuery] = useState('');
  const [trainData, setTrainData] = useState(null);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = async () => {
    const options = {
      method: 'POST',
      url: 'https://trains.p.rapidapi.com/v1/railways/trains/india',
      headers: {
        'x-rapidapi-key': '361b3e2dc3msh99cfc88eda8d3a7p141ee8jsncb816907c349',
        'x-rapidapi-host': 'trains.p.rapidapi.com',
        'Content-Type': 'application/json',
      },
      data: { search: query }, // Dynamically set the query from input
    };

    try {
      setError('');
      const response = await axios.request(options);

      if (response.data.length > 0) {
        setTrainData(response.data[0]); // Assuming the first match is returned
      } else {
        setTrainData(null);
        setError('No train found with this name or number.');
      }
    } catch (error) {
      console.error('Error fetching train data:', error);
      setError('Error fetching train data.');
    }
  };

  return (
    <div className="train-status">
      <h2>Search Train Status</h2>
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Enter Train Name or Number"
      />
      <button onClick={handleSearch}>Search</button>

      {/* Show Error */}
      {error && <p className="error">{error}</p>}

      {/* Show Train Data */}
      {trainData && (
        <div className="train-details">
          <h3>{trainData.name} ({trainData.train_num})</h3>
          <p><strong>From:</strong> {trainData.train_from} to {trainData.train_to}</p>
          <p><strong>Departure:</strong> {trainData.data.departTime}</p>
          <p><strong>Arrival:</strong> {trainData.data.arriveTime}</p>
          <p><strong>Available Classes:</strong> {trainData.data.classes.join(', ')}</p>
          <p><strong>Running Days:</strong> {Object.keys(trainData.data.days).filter(day => trainData.data.days[day] === 1).join(', ')}</p>
        </div>
      )}
    </div>
  );
};

export default TrainStatus;
