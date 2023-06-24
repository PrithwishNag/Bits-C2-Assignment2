import React, { Component } from 'react';
import currentLocationIcon from '../images/currentLocationIcon.svg';
import '../css/dashboardPage.css'

class DashboardPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            pickUpLocation: {
                set: false,
                latitude: null,
                longitude: null,
            },
            dropOffLocation: {
                latitude: null,
                longitude: null,
            },
            showRideOptions: false,
            rideOptions: []
        }
    }

    myCurrentLocation = async () => {
        var pickUpLocationInput = document.querySelector("#pickUpLocation");
        pickUpLocationInput.value = "";
        navigator.geolocation.getCurrentPosition(
            position => this.setState({
                pickUpLocation: {
                    set: true,
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                }
            }, () => {
                console.log("Current Location: " + [this.state.pickUpLocation.longitude, this.state.pickUpLocation.latitude])
            }),
            err => console.log(err)
        );
    }

    getAddressFromCoordinates = (longitude, latitude) => {
        // Assumption: this method is a backend functionality, hardcoded
        // Conversion of address to coordinates is hardcoded but
        // longitude and latitude is fetched from the your curreent location
        return "21st Cross, 2nd Stage, Doddanna Industrial Area, Near Police Station, Bengaluru, Karnataka";
    }

    getCoordinatesFromAddress = (address) => {
        // Assumption: this method is a backeend functionality, hardcoded
        if (address.length === 0) {
            return {
                longitude: null,
                latitude: null
            }
        }
        return {
            longitude: 34.64666420059284,
            latitude: 23.005967580741434,
        }
    }

    getRideOptions = (pickUp, dropoff) => {
        // Assumption: this data will come from backend
        var data = require('../json/rideOptions.json')
        return data;
    }

    isEmpty = (x) => {
        if (x === null || x.length === 0) return true;
        return false;
    }

    render() {
        return <div class="container">
            <h1>RIDESHARE</h1>
            <div class="dashboard-search-block" style={{ marginBottom: '15px' }}>
                <div>Search for your ride</div>
                <div style={{ display: 'flex', marginLeft: '47px' }}>
                    <input id="pickUpLocation" style={{ width: '300px' }} placeholder={this.state.pickUpLocation.set ?
                        this.getAddressFromCoordinates(this.state.pickUpLocation.longitude, this.state.pickUpLocation.latitude) : 'Pickup location'}
                        onChange={(e) => {
                            var coords = this.getCoordinatesFromAddress(e.target.value);
                            this.setState({
                                pickUpLocation: coords
                            });
                        }
                        }>
                    </input>
                    <img style={{ marginLeft: '15px' }} src={currentLocationIcon} width="30px" onClick={this.myCurrentLocation}></img>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <div style={{ width: '20px', height: '20px', border: '1px solid black', borderRadius: '25%' }}></div>
                    <div style={{
                        width: '1px',
                        height: '70px',
                        backgroundColor: 'black'
                    }}></div>
                    <div style={{ width: '20px', height: '20px', border: '1px solid black', borderRadius: '50%' }}></div>
                </div>
                <input style={{ width: '300px' }} placeholder='Dropoff location' onChange={(e) => {
                    var coords = this.getCoordinatesFromAddress(e.target.value);
                    this.setState({
                        dropOffLocation: coords
                    });
                }}></input>
                <button onClick={() => {
                    if (this.isEmpty(this.state.pickUpLocation.longitude) || this.isEmpty(this.state.dropOffLocation.longitude)) {
                        alert("Enter both pickup and dropoff location before proceeding")
                        return;
                    }
                    console.log("Pick Up Coordinates: " + [this.state.pickUpLocation.longitude, this.state.pickUpLocation.latitude]);
                    console.log("Drop Off Coordinates: " + [this.state.dropOffLocation.longitude, this.state.dropOffLocation.latitude]);
                    this.setState({
                        showRideOptions: true,
                        rideOptions: this.getRideOptions(this.state.pickUpLocation, this.state.dropOffLocation)
                    });
                }}>Search</button>
            </div>
            {this.state.showRideOptions ?
                <div class="container">
                    <div class="horizontal-line" style={{ width: '200%' }}></div>
                    <div style={{ marginTop: '30px', marginBottom: '10px' }} >Choose from the below ride options</div>
                    {this.state.rideOptions.map((option) => {
                        return <div class='dashboard-ride-options'>
                            <div class="dashboard-ride-option">{option.eta}<div style={{ fontSize: '12px' }}>mins</div></div>
                            <div class="dashboard-ride-option"><div style={{ fontSize: '12px' }}>Rs.</div>{option.price}</div>
                            <div class="dashboard-ride-option">{option.drivers}<div style={{ fontSize: '12px' }}>drivers</div></div>
                        </div>
                    })}
                </div> : <div></div>}
        </div>
    }
}

export default DashboardPage;