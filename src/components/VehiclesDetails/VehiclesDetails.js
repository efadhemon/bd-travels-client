
import React from 'react';
import './VehiclesDetails.css'
import peopleIcon from './../../images/peopleicon.png'

const VehiclesDetails = (props) => {
    const {vehicle_type, cost, sit, vehicle_icon } = props.vehicle;
    return (
        <div>
            <div className="vehicle">
                <img className="vehicle_icon" src={vehicle_icon} alt=""/>
                <h4 className="vehicle_type">{vehicle_type}</h4>
                <img className="peopleIcon" src={peopleIcon} alt="peopleIcon"/>
                <h4 className="sit">{sit}</h4>
                <h4 className="cost">{cost}</h4>
            </div>
        </div>
    );
};

export default VehiclesDetails;