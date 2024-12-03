import React, { useState,useRef,useEffect } from 'react';
import { trains } from '../data/trains'; // Ensure correct path
import TrainList from './TrainList';


import './SearchTrains.css';

import swap from '../assets/swap_white.svg';
import stationsData from '../data/station.json';
const SearchTrain = () => {
  const [source, setSource] = useState('');
  const [TravelDate,setTravelDate]=useState('');
  const [destination, setDestination] = useState('');
  const [filteredTrains, setFilteredTrains] = useState([]);
  const [sourceSuggestions, setSourceSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [noTrainsFound, setNoTrainsFound] = useState(false);


  // Add references for source and destination input fields
  const sourceRef = useRef(null); // NEW: Reference for source input
  const destinationRef = useRef(null); // NEW: Reference for destination input

  // Add useEffect to handle clicks outside the suggestions panel
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        sourceRef.current && !sourceRef.current.contains(event.target) && // Check for clicks outside source input
        destinationRef.current && !destinationRef.current.contains(event.target) // Check for clicks outside destination input
      ) {
        // Close both suggestions if clicking outside
        setSourceSuggestions([]); // NEW: Clear source suggestions
        setDestinationSuggestions([]); // NEW: Clear destination suggestions
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside); // NEW: Event listener for outside clicks
    return () => {
      document.removeEventListener('mousedown', handleClickOutside); // Cleanup on unmount
    };
  }, []);



  
  // Get unique station names from the trains data
  const stations = [...new Set(trains.map((train) => train.source).concat(trains.map((train) => train.destination)))];

  const handleDateChange = (e) => {
    setTravelDate(e.target.value);
  };

  // Handle source input and suggestions
  const handleSourceChange = (e) => {
    const value = e.target.value;
    setSource(value);
    if (value) {
      const filteredSuggestions = stations.filter((station) =>
        station.toLowerCase().startsWith(value.toLowerCase())
      );
      setSourceSuggestions(filteredSuggestions);
    } else {
      setSourceSuggestions([]);
    }
  };

  // Handle destination input and suggestions
  const handleDestinationChange = (e) => {
    const value = e.target.value;
    setDestination(value);
    if (value) {
      const filteredSuggestions = stations.filter((station) =>
        station.toLowerCase().startsWith(value.toLowerCase())
      );
      setDestinationSuggestions(filteredSuggestions);
    } else {
      setDestinationSuggestions([]);
    }
  };

  // Handle source suggestion selection
  const handleSourceSelect = (suggestion) => {
    setSource(suggestion);
    setSourceSuggestions([]); // Clear the source suggestions after selection
  };

  // Handle destination suggestion selection
  const handleDestinationSelect = (suggestion) => {
    setDestination(suggestion);
    setDestinationSuggestions([]); // Clear the destination suggestions after selection
  };

  // Handle the train search based on source and destination
  const handleSearch = () => {
    const results = trains.filter(
      (train) =>
        train.source.toLowerCase().trim() === source.toLowerCase().trim() &&
        train.destination.toLowerCase().trim() === destination.toLowerCase().trim()
    );
    setFilteredTrains(results);
    setNoTrainsFound(results.length === 0);
  };

  // Handle swapping of source and destination
  const handleSwap = () => {
    const temp = source;
    setSource(destination);
    setDestination(temp);
  };











  return (
    <div className='hero'>
    <section className="Station">
      <div className='container'>
        
        <h2>Search<span> Trains</span></h2>
        <div style={{ position: 'relative' }} ref={sourceRef}>
        <div className="input-wrap">
          {/* <img className='place-icon' src="https://www.ixigo.com/rt-train/pc/img/originPrimary.svg" alt="" /> */}
        <input className="input-box" type="text" placeholder="Source" value={source} onChange={handleSourceChange}/>
        </div>
        {/* Suggestions for Source */}
        {sourceSuggestions.length > 0 && (
          <ul className="suggestions">
            {sourceSuggestions.map((suggestion, index) => (
              <li key={index} onClick={() => handleSourceSelect(suggestion)}>
              <svg className='station-icon' width="30" height="30" fontSize="1.5rem" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-testid="CityIcon" ><path d="M6.8761 12.8983c-.663 0-.663-.9994 0-.9994s.663.9994 0 .9994Zm0 1.9676c.663 0 .663-.9994 0-.9994s-.663.9994 0 .9994Zm0 2.0502c-.663 0-.663-.9995 0-.9995s.663.9995 0 .9995Zm0 2.0747c.663 0 .663-.9994 0-.9994s-.663.9994 0 .9994Z"></path><path fillRule="evenodd" d="M14.1316 2.725v1.0175c1.2285.0899 1.7413 1.1136 1.7413 2.1692.6057.1099 1.0641.6247 1.0641 1.2433v5.0608h2.2895c1.1398 0 2.0638.8949 2.0638 1.9989v5.8132c0 .1629-.0202.3213-.0581.4729 1.0026 0 1.0752 1.4992.0581 1.4992H2.7485c-1.017 0-.9445-1.4992.0582-1.4992a1.9434 1.9434 0 0 1-.0582-.473V10.862c0-1.104.924-1.999 2.0638-1.999h4.6435V7.1863c0-.6468.4891-1.1829 1.1286-1.2803 0-1.1665.6674-2.1686 1.9993-2.1686V2.7251c0-.9668 1.5479-.9668 1.5479 0Zm.1934 3.3993c0 .6186.4584 1.1334 1.0642 1.2433v4.8482c-1.2148 0-2.3424.7039-2.3424 1.9989v5.8132c0 .7848-2.0432.9323-2.0432-.0001V7.3734c.6396-.0974 1.1287-.6336 1.1287-1.2803 0-1.2543 2.1927-1.3465 2.1927.0312ZM9.4558 10.862c0-.276-.231-.4998-.516-.4998H4.8124c-.285 0-.516.2238-.516.4998v9.1658c0 .2195.1461.4059.3492.473h4.4612c.203-.0671.3491-.2535.3491-.473V10.862Zm9.6095 9.6388c.33 0 .6771-.061.6771-.4729v-5.8132c0-.276-.231-.4997-.5159-.4997h-4.116c-.2849 0-.5159.2237-.5159.4997v5.8132c0 .4733.4375.4729.7946.4729V16.155c0-.9667 1.5478-.9667 1.5478 0v4.3458h.5804V16.155c0-.9667 1.5479-.9667 1.5479 0v4.3458Z" clipRule="evenodd"></path></svg>
                {suggestion}
              </li>
            ))}
          </ul>
        )}
        </div>
        <button className='button-swap' onClick={handleSwap}>
          <img className='swap-img' src={swap} alt="swap" />
          
        </button>
        <div style={{ position: 'relative' }} ref={destinationRef}>
        <input
          className="input-box"
          type="text"
          placeholder="Destination"
          value={destination}
          onChange={handleDestinationChange}
        />
        
        {/* Suggestions for Destination */}
        {destinationSuggestions.length > 0 && (
          <ul className="suggestions">
            {destinationSuggestions.map((suggestion, index) => (
              <li key={index} onClick={() => handleDestinationSelect(suggestion)}>
                 <svg className='station-icon' width="30" height="30" fontSize="1.5rem" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-testid="CityIcon" ><path d="M6.8761 12.8983c-.663 0-.663-.9994 0-.9994s.663.9994 0 .9994Zm0 1.9676c.663 0 .663-.9994 0-.9994s-.663.9994 0 .9994Zm0 2.0502c-.663 0-.663-.9995 0-.9995s.663.9995 0 .9995Zm0 2.0747c.663 0 .663-.9994 0-.9994s-.663.9994 0 .9994Z"></path><path fillRule="evenodd" d="M14.1316 2.725v1.0175c1.2285.0899 1.7413 1.1136 1.7413 2.1692.6057.1099 1.0641.6247 1.0641 1.2433v5.0608h2.2895c1.1398 0 2.0638.8949 2.0638 1.9989v5.8132c0 .1629-.0202.3213-.0581.4729 1.0026 0 1.0752 1.4992.0581 1.4992H2.7485c-1.017 0-.9445-1.4992.0582-1.4992a1.9434 1.9434 0 0 1-.0582-.473V10.862c0-1.104.924-1.999 2.0638-1.999h4.6435V7.1863c0-.6468.4891-1.1829 1.1286-1.2803 0-1.1665.6674-2.1686 1.9993-2.1686V2.7251c0-.9668 1.5479-.9668 1.5479 0Zm.1934 3.3993c0 .6186.4584 1.1334 1.0642 1.2433v4.8482c-1.2148 0-2.3424.7039-2.3424 1.9989v5.8132c0 .7848-2.0432.9323-2.0432-.0001V7.3734c.6396-.0974 1.1287-.6336 1.1287-1.2803 0-1.2543 2.1927-1.3465 2.1927.0312ZM9.4558 10.862c0-.276-.231-.4998-.516-.4998H4.8124c-.285 0-.516.2238-.516.4998v9.1658c0 .2195.1461.4059.3492.473h4.4612c.203-.0671.3491-.2535.3491-.473V10.862Zm9.6095 9.6388c.33 0 .6771-.061.6771-.4729v-5.8132c0-.276-.231-.4997-.5159-.4997h-4.116c-.2849 0-.5159.2237-.5159.4997v5.8132c0 .4733.4375.4729.7946.4729V16.155c0-.9667 1.5478-.9667 1.5478 0v4.3458h.5804V16.155c0-.9667 1.5479-.9667 1.5479 0v4.3458Z" clipRule="evenodd"></path></svg>
                {suggestion}
              </li>
            ))}
          </ul>
        )}
        </div>
        <input
          className="input-box"
          type="date"
          placeholder="Date"
          value={TravelDate}
          onChange={handleDateChange} 
        />
        <button className='button-search' onClick={handleSearch}>Search Trains</button>

       
      </div>
    </section>
    <div className='results'>
       {/* Show "No Trains Found" message if no trains match */}
       {noTrainsFound && <p>No trains found between the selected stations.</p>}

{/* Render filtered trains if any */}
      {filteredTrains.length > 0 && <TrainList trains={filteredTrains} date={TravelDate} />}
    </div>

    </div>
  );
};

export default SearchTrain;








