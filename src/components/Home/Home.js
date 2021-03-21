
import React from 'react';
import './Home.css'
import Bike from '../../images/bike.png';
import Car from '../../images/car.png';
import Bus from '../../images/bus.png';
import Train from '../../images/train.png';
import { useContext } from 'react';
import { vehiclesContext } from '../../App';
import { Link } from 'react-router-dom';

const Home = () => {

    const [vehicles, setVehicles] = useContext(vehiclesContext);

    return (
        <div className="transport-container">
            <div className="transport-area container">
                <Link to='/destination' onClick={()=>setVehicles('bike')} className="transport-method">
                    <img src={Bike} alt="" />
                    <p>Bike</p>
                </Link>
                <Link to='/destination' onClick={()=>setVehicles('car')} className="transport-method">
                    <img src={Car} alt="" />
                    <p>Car</p>
                </Link>
                <Link to='/destination' onClick={()=>setVehicles('bus')}className="transport-method">
                    <img src={Bus} alt="" />
                    <p>Bus</p>
                </Link>
                <Link to='/destination' onClick={()=>setVehicles('train')} className="transport-method">
                    <img src={Train} alt="" />
                    <p>Train</p>
                </Link>
            </div>
        </div>
    );
};

export default Home;