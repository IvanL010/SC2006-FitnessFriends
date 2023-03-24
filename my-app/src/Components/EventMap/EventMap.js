import { Component, useMemo } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  MarkerClusterer,
} from "@react-google-maps/api";
import { useState, useEffect } from "react";
import "./event-map-styles.css";

export default function MapContainer({events, state, setState, mapOptions}) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyCGCznAwZAFJ8qMQY1ckg6EfDwuczmepWI",
  });
  if (!isLoaded) return <div>..Loading</div>;
  return <Map events={events} state={state} setState={setState} mapOptions={mapOptions}/>;
}

function Map({events, state, setState, mapOptions}) {
  const [displayEvents, setEvents] = useState([]);

  const initEvents = () => {
    if (events != undefined) {
        if (Array.isArray(events) == true) {
            // Already array, can map 
            console.log("hi");
            setEvents(events);
        }else {
          console.log("hi");
            // Not array, cant map 
            setEvents({events});
        }
    }
    console.log({events});
    console.log({displayEvents});
  }

  const onMarkerClick = (event) => {
      if (setState != undefined) {
        setState(event);
      }
  }

  useEffect(() => {
		initEvents();
	  }, []);

  return (
    <>
      <GoogleMap
        zoom={18}
        center={{lat:1.348578045634617,lng:103.6831722481014}}
        mapContainerClassName="map-container"
        options={mapOptions}
      >
        <MarkerClusterer>
                {clusterer => 
                    displayEvents.map((marker, index) => (
                        <Marker key={"marker-" + index} id={index} position={marker.eventPosition} clusterer={clusterer} onClick={()=>onMarkerClick(marker)}/>
                    ))
                }
        </MarkerClusterer>
      </GoogleMap>
    </>
  );
}
