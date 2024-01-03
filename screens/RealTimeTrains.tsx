import * as React from 'react';
import { StyleSheet} from 'react-native';
import {Text, View} from 'react-native';
import apiRequest from '../lib/apiRequest';

const stations = JSON.parse(require("../GOTravelData/stations.json"));

let trains: any;
let [realTime, updateRealTime] = React.useState('Finding State')

export default function RealTimeTrains() {
  apiRequest("api/V1/ServiceataGlance/Trains/All", '', 'GET').then(res => {
    if (res.success) {
      trains = JSON.parse(res.response);
      console.log(trains);
      if (trains && trains.Trips) {
        let displayed = ``;
        for (let i = 0; i < trains.Trips.length; i++) {
          displayed += `${trains.Trips[i].Display}\t | ${trains.Trips[i].NextStopCode}`
        }
        updateRealTime(displayed);
      } else {
        updateRealTime('No Trains Currently!');
      }
    }
  }).catch(err => {
    updateRealTime('Error occurred D:');
  })
  
  return (
    <View style={styles.timeTableContainer}>
      <View style={styles.courseContainer}>

      {/* --- COURSE TEXT --- */}
      <Text>{realTime}</Text>

      {/* --- COURSE CONTAINER --- */}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* --- BACKGROUND IMAGE --- */
  backgroundImage: {
    flex: 1,
  },
  /* ---------- WEATHER ---------- */

  /* ---WEATHER CONTAINER ---*/
  weatherContainer: {

    position: "absolute",
    right: 10,
    top: 10,

    backgroundColor: "transparent",
    alignItems: "center",
  },

  /* ---TEMPERATURE ---*/
  temperature: {
    fontWeight: "bold",
    fontSize: 35,
    fontFamily: "poppins",
  },

  /* --- WEATHER DIVIDER --- */
  weatherDivider: {
    width: "90%",
    borderWidth: 1,
    marginBottom: 7,
  },

  /* ---TEMPERATURE LOGO ---*/
  logo: {
    width: 60,
    height: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 20,
  },

  /*---------- MAIN INFO ----------*/

  course: {
    width: "90%",
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",

    fontFamily: "poppins",
  },

  timeText: {
    width: "80%",
    fontSize: 20,
    textAlign: "center",
  },

  /*---------- TIME TABLE ----------*/

  /* --- TIME TABLE CONTAINER --- */
  timeTableContainer: {
    backgroundColor: "transparent",
    position: "absolute",
    left: 10,
    bottom: 10,
  },

  /* --- COURSE CONTAINER --- */
  courseContainer: {
    backgroundColor: "transparent",
    borderColor: "rgb(58, 106, 150)",
    borderLeftWidth: 4,
    alignItems: "center",
  },

  /* --- WEEK TEXT --- */
  weekText: {
    fontSize: 40,
    fontWeight: "bold",
    fontFamily: "poppins",
  },

  /* --- COURSE TEXT --- */
  courseText: {
    marginVertical: 5,
    marginLeft: 10,
    textAlign: "justify",
    justifyContent: 'space-evenly',
    fontSize: 17,
  },

});
