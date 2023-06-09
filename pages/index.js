import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
//require('dotenv').config();
import dotenv from 'dotenv'; 
import { useEffect,useState } from 'react';
dotenv.config();

//const apiKey=process.env.API_KEY;
const apiKey="AIzaSyABi8-qwYxFA0t-KeTuuKegUMI5qbLlc6k"
console.log(process.env.API_KEY);

console.log(apiKey);
import { GoogleMap, Marker, withGoogleMap, withScriptjs } from 'react-google-maps';

const MapContainer = withScriptjs(withGoogleMap(() => {
  const data=require('../data.json')
  /* const [data, setData] = useState(null); // State to store the fetched data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://mocki.io/v1/c6fe74c0-b795-4eb2-b940-ce66fdc8f64e');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []); */
  return (
    <>
    <div className='card-container'>
    <div className='ride_status-container'>
      <h2 name="ride_status">{data.ride_status}</h2>
    </div>
    <div className='route_details-container'>
      <div className='origin-container'>{data.originAdd}</div>
      <div className='spacer'></div>
      < div className='destination-container'>{data.destinationAdd}</div>
     
    </div>
    <div className='divider' id="divider-below-route_details-conainer"></div>
    < div className='driverAndVehicle_details-container'>
      <div className='left-container'>
        <div className='driver_image'>
           <img src="data:image/png;base64,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" alt="Driver" />
        </div>
        <div className='rating'>
          <div className='rating_value'>{data.rating_value}</div>
            <div className='rating_icon'><i class="fa fa-star" aria-hidden="true"></i></div>
         </div>
          </div>
          <div className='right-container'>
            <div className='driver_name'>{data.driver_name}</div>
            <div className='vehicle_info'>
              
              <div className='vehicle_number'>{data.vehicle_number}</div>
              <div className='vehicle_model'>{data.vehicle_model}</div>
            </div>
          
        </div>
    </div>
    <div className='divider'></div>
    <div className='call_action-container'>
    <div className='call_text'> call driver</div>
      <div className='call_Icon'><i class="fa fa-phone" aria-hidden="true"></i></div>
     
    </div>
    </div>
  
      <div className="map-container">
      
        <GoogleMap
          defaultZoom={14}
          defaultCenter={{ lat: 37.7749, lng: -122.4194 }}
          options={{ styles: [{ featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'off' }] }] }}
        >
        
          <Marker position={{ lat: 37.7749, lng: -122.4194 }} />
        </GoogleMap>
      </div>
      </>
    
  );
}));



export default function Home() {
  return (
    
      <MapContainer
        googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`}
        loadingElement={<div style={{ height: '100%' }} />}
        containerElement={<div style={{ height: '100vh' }} />}
        mapElement={<div style={{ height: '100%' }} />}
      />
   
  );
}
