import React from 'react';
import './TrainList.css'; // New CSS file for styling

const TrainList = ({ trains, date }) => {
  return (
    <div className="train-list-container">
      {trains.map((train) => (
        <div className="train-card" key={train.id}>
          <div className="train-info">
            <div className="train-header">
              <h3 className="train-name">{train.name}</h3>
              <span className="train-date">Date: {date}</span>
            </div>
            
            <div className="train-details">
              <div className="train-route">
                <p className="station">From: <span>{train.source}</span></p>
                <p className="station">To: <span>{train.destination}</span></p>
              </div>
              <button className="book-button">Book</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrainList;
