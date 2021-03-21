
import './Destination.css'
import Map from './../../images/Map.png'
import fakeData from '../../FakeData/FakeData';
import { useEffect, useState } from 'react';
import VehiclesDetails from '../VehiclesDetails/VehiclesDetails';
import GoogleMap from '../GoogleMap/GoogleMap';
import { useHistory } from 'react-router';

const Destination = (props) => {

    const [transports, setTransports] = useState([]);
    const [destination, setDestination] = useState({});
    const { pickFrom, pickTo } = destination;

    let vehicles = props.vehicles;

    const history =  useHistory()

    if (!vehicles) {
        alert('please select a transport method')
        history.replace('/home')
    }

    useEffect(() => {
        setTransports(fakeData)
    }, [])
    const sameVehicle = transports.filter(transport => transport.vehicle_type.toLowerCase() === vehicles);

    const handleChange = (e) => {
        const newDestination = { ...destination }
        newDestination[e.target.name] = e.target.value;
        setDestination(newDestination)
        console.log(newDestination);
    }

    const handleSearch = (e) => {

        document.getElementById('search-from').style.display = 'none';
        document.getElementById('vehicles-details').style.display = 'block'

        e.preventDefault()
    }
    return (
        <div className="container destination">
            <div className="input-filed">
                <form onSubmit={handleSearch} id="search-from">
                    <div className="input-from">
                        <h6>Pick from</h6>
                        <input onBlur={handleChange} type="text" name="pickFrom" required />
                    </div>
                    <div className="input-from">
                        <h6>Pick to</h6>
                        <input onBlur={handleChange} type="text" name="pickTo" required />
                    </div>

                    <div className="input-from Search-vehicles">
                        <input className="search-btn" type="submit" value="Search" />
                    </div>
                </form>
                <div style={{ position: 'relative', display: 'none' }} id="vehicles-details">
                    <div className="view-destination">
                        <div className="where-to-go">
                            <div style={{ position: 'relative', marginBottom: '30px' }}>
                                <h4 className="circle-dot">{pickFrom}</h4>
                            </div>
                            <div style={{ position: 'relative' }}>
                                <h4 className="circle-dot">{pickTo}</h4>
                            </div>
                        </div>
                    </div>
                    {
                        sameVehicle.map(vehicle => <VehiclesDetails vehicle={vehicle} key={vehicle.id}></VehiclesDetails>)
                    }
                </div>
            </div>
            <div className="map-container">
                <GoogleMap></GoogleMap>
            </div>
        </div>
    );
};

export default Destination;