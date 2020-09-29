import React, { Component } from "react";
import mapboxgl from "mapbox-gl";

export default class Map extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    let { center, zoom } = this.props;
    this.map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/streets-v11",
      center: center,
      zoom: zoom,
    });
  }

  render() {
    let { width, height } = this.props;
    return (
      <div>
        <div
          style={{ width: width + "px", height: height + "px" }}
          ref={(el) => (this.mapContainer = el)}
        />
      </div>
    );
  }
}
