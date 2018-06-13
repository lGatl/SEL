import React, { Component } from "react";
import GoogleMapReact from "google-map-react";
import PointMap from "./PointMap";
class SimpleMap extends Component {
  static defaultProps = {
    center: {
      lat: 48.866667,
      lng: 2.333333
    },
    zoom: 11
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: 500, width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyAouLNdX0fayRuO1Ro-4vRu_eJAx2W9XSU" }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <PointMap
            lat={ 48.9063711601357 }
            lng={2.340227468359444}
            text={'gat@live.fr'}
          />
          <PointMap
            lat={ 48.844077668064706 }
            lng={2.3731584394531637}
            text={'jean.thierier@gmail.com'}
          />
          <PointMap
            lat={ 48.86847370622049 }
            lng={2.2784013593750387}
            text={'adeezdezdez'}
          />
          <PointMap
            lat={ 48.83955857847089 }
            lng={2.36354540234378874}
            text={'adeezdezdez'}
          />
        </GoogleMapReact>
      </div>
    );
  }
}

export default SimpleMap;
  
