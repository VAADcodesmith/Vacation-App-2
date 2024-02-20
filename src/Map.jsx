import React, { useState } from 'react'
import { geoCentroid } from 'd3-geo'; //package allows us to only show a map projection of the United States
import { useNavigate } from 'react-router-dom';
import { Button } from "@chakra-ui/react";

import {
    ComposableMap, //map container
    Geographies, //json of all countries
    Geography, //each country object
    Marker, //method to create a marker
    Annotation, // method to create an annotation
} from 'react-simple-maps'; // package allows us to render a map



//json file currently in src that could be moved to our database, and we can fetch it to have a smaller app size. 
import allStates from "./allstates.json";

//json file url that has the requirements to render a US map
//checkout https://www.npmjs.com/package/us-atlas for more info
const geoURL = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";


const offsets = { //for tiny states, this adds the label off to the side
    VT: [50, -8],
    NH: [34, 2],
    MA: [30, -1],
    RI: [28, 2],
    CT: [35, 10],
    NJ: [34, 1],
    DE: [33, 0],
    MD: [47, 10],
    DC: [49, 21]
  };


export default function Map() {
  const [clickedStates, setClickedStates] = useState([]);

  const navigate = useNavigate();
  const BACKEND_URL = 'http://localhost:3000';


  const handleLogout = () => { //sends user back to login page
    navigate('/');
  }

  const saveCurrUserLocations = (clickedGeography, event) => {
    setClickedStates(prev => {
      if (prev.includes(clickedGeography)) {
        // If the state is already in the array, remove it
        return prev.filter(state => state !== clickedGeography);
      } else {
        // If the state is not in the array, add it
        return [...prev, clickedGeography];
      }
    });
    //need to add variable to store the element that was clicked
    // event.preventDefault();
    fetch(BACKEND_URL + '/map', {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type' : 'application/json',
      },
      body: JSON.stringify({clickedGeography}) //this will send the state's name to server/db to save into locations list
    })
    .then(res => res.json())
    .then(data => {
      console.log('data saved successfully sent', data); //this can just be confirmation that the location has been saved to the user's location list
    })
    .catch(err => console.log('Map Component -> saveCurrUserLocations Func -> Post Fetch Error:', err));
    };

  return (
    <div 
        className='App' 
        style={{
            width: "100%",
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            background: "cream"
    }}>
      {/*  <Button borderRadius="9px" type="submit" variant="solid" colorScheme="brand" width="full">Login</Button> */}
        <Button borderRadius="9px" variant="solid" colorScheme="brand" height="25px" width="70px" onClick={handleLogout}>Logout</Button>
        <h1>Let's track our travels!</h1>

        {/* component to render map */}

        <div style={{width: "1400px", borderStyle: "double"}}>
            <ComposableMap projection="geoAlbersUsa">
                    <Geographies geography={geoURL}>
                        {({ geographies }) => (
                            <>

                            {/* this first geographies.map creates the individual state elements */}
                            {geographies.map((geo) => ( 
                              
                                <Geography
                                    key={geo.rsmKey}
                                    geography={geo}
                                    // onMouseEnter={() => {
                                    //     const { NAME } = geo.properties;
                                    //     setcontent(`${NAME}`);
                                    // }}
                                    // onMouseLeave={() => { setcontent("");}} 
                                    onClick={() => { console.log(geo.properties.name, 'clicked!'); saveCurrUserLocations(geo.properties.name); }}
                                    style={{
                                      default: {fill: clickedStates.includes(geo.properties.name) ? "#0ac" : "#DDD", stroke: "#F53"},
                                      hover: { fill: "#F53", outline: "none"},
                                      pressed: {fill: clickedStates.includes(geo.properties.name) ? "#DDD" : "#0ac" }}}
                                    />  
                            ))}

                            {/* this second geographies.map adds the labels to the state elements. States either get a marker(aka label) or an annotation */}
                            {geographies.map(geo => {
                                const centroid = geoCentroid(geo);
                                const cur = allStates.find(s => s.val === geo.id);
                                return (
                                  <g key={geo.rsmKey + "-name"}>
                                    {cur &&
                                      centroid[0] > -160 &&
                                      centroid[0] < -67 &&
                                      (Object.keys(offsets).indexOf(cur.id) === -1 ? (
                                        <Marker coordinates={centroid}>
                                          <text y="2" fontSize={14} textAnchor="middle">
                                            {cur.id}
                                          </text>
                                        </Marker>
                                      ) : (
                                        <Annotation
                                          subject={centroid}
                                          dx={offsets[cur.id][0]}
                                          dy={offsets[cur.id][1]}
                                        >
                                          <text x={4} fontSize={14} alignmentBaseline="middle">
                                            {cur.id}
                                          </text>
                                        </Annotation>
                                      ))}
                                  </g>
                                );
                              })}
                              </>
                              )}
                    </Geographies>
            </ComposableMap>
        </div>
    </div>
  );
};
