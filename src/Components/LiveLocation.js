import React from 'react'
import Logo from '../Assets/Bhaskar.png'
import Location_icon from '../Assets/logo.png'
import './LiveLocation.css'

// This component is a placeholder for the Live Location feature
const LiveLocation = () => {

    const [lattitude, setLatitude] = React.useState('fetching.. ');
    const [longitude, setLongitude] = React.useState('fetching.. ');
    const [error, setError] = React.useState(null);

    const handleLocationError = (error) => {
        switch(error.code) {
            case error.PERMISSION_DENIED:
                setError("User denied the request for Geolocation.");
                break;
            case error.POSITION_UNAVAILABLE:
                setError("Location information is unavailable.");
                break;
            case error.TIMEOUT:
                setError("The request to get user location timed out.");
                break;
            case error.UNKNOWN_ERROR:
                setError("An unknown error occurred.");
                break;
            default:
                setError("An unexpected error occurred.");
        }
    };

    const getUserAddress = async() => {
  
        if (lattitude && longitude) {
            try {
                const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lattitude}&lon=${longitude}&format=json`);
                const data = await response.json();

                if (data && data.display_name) {

                   document.getElementById('addr').value = data.display_name;

                }

            } catch (error) {

                handleLocationError(error);

            }
        }

    };

    const getLocation = (position) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLatitude(position.coords.latitude);
                    setLongitude(position.coords.longitude);

                    // Optionally, you can also log the position to the console
                    setError(null);
                },
                (err) => {

                    const error = new Error("Geolocation error");
                    error.code = err.code;
                    handleLocationError(error);

                }
            );
        } else {

            setError("Geolocation is not supported by this browser.");
            
        }
    };

    React.useEffect(() => {
        getLocation();
    }, []);

  return (
    <div style={{ textAlign: 'center', marginTop: '2px', fontSize: '1rem', color: '#333', fontWeight: 'bold', backgroundColor: '#dae0aa', padding: '2px', borderRadius: '10px', 
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', width: '80%', maxWidth: '400px', margin: 'auto', border: '2px solid rgb(243, 158, 158)', zIndex: '10', alignItems: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center'
     }}>
      <img src={Logo} alt="Logo" style={{ width: '40px', height: '40px', marginBottom: '0px', borderRadius: '50px', border: '1px solid rgb(176, 212, 118)' }} />
      <h1 style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontWeight: '500', width: '100%', fontFamily: 'Arial, sans-serif', color: '#32501d', padding: '0px', textDecoration: 'underline' }}>
        Live Location</h1>
      {error ? (
        <p>Error: {error}</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontWeight: '600', width: '100%', fontFamily: 'Arial, sans-serif', color: '#975c5c', padding: '10px' }}>
            <br/>
            <p>Latitude: {lattitude}</p>
            <p>Longitude: {longitude}</p>
            <br/>
            <button onClick={getUserAddress}>Get Location</button>
            <p style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontWeight: '200', width: '70%', fontFamily: 'Arial, sans-serif', color: '#1f3f01ff', padding: '5px'}}>(Press the button after lattitude and longitude values are fetched)</p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', marginTop: '5px' }}>
              <img src={Location_icon} alt="Location Icon" style={{ width: '20px', height: '20px'}} />
              <input type="label" id="addr" placeholder="Address will appear here" readOnly style={{ width: '80%', border: '1px solid #fff', fontWeight: '600', borderRadius: '5px', height: '25%' }} />
            </div>
        </div>
      )}
    </div>
  )
} 

export default LiveLocation