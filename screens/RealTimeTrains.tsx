import * as React from 'react';
import { StyleSheet} from 'react-native';
import {Text, View} from 'react-native';
import apiRequest from '../lib/apiRequest';
import Train from '../components/Train';

export default function RealTimeTrains() {

  let trains: any;
  let [realTime, updateRealTime] = React.useState('Finding State')
  
  apiRequest(`api/V1/ServiceataGlance/Trains/All`, '', 'GET').then(res => {
    if (res.success) {
      trains = JSON.parse(res.response);
      if (trains && trains.Trips && trains.Trips.Trip) {
        let displayed = ``;
        for (let i = 0; i < trains.Trips.Trip.length; i++) {
          displayed += `${trains.Trips.Trip[i].Display}\t | ${trains.Trips.Trip[i].NextStopCode}`
        }
        updateRealTime(displayed);
      } else {
        updateRealTime(`No Trains Currently!`);
      }
    }
  }).catch(err => {
    updateRealTime(`Error occurred D:`);
  })
  
  return (
    <View style={styles.timeTableContainer}>
      <View style={styles.courseContainer}>

      {/* --- COURSE TEXT --- */}
      <Text>{realTime}</Text>
      <Train/>
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

  timeTableContainer: {
    backgroundColor: "transparent",
    position: "absolute",
    left: 10,
    bottom: 10,
  },

  courseContainer: {
    backgroundColor: "transparent",
    borderColor: "rgb(58, 106, 150)",
    borderLeftWidth: 4,
    alignItems: "center",
  },

  weekText: {
    fontSize: 40,
    fontWeight: "bold",
    fontFamily: "poppins",
  },

  courseText: {
    marginVertical: 5,
    marginLeft: 10,
    textAlign: "justify",
    justifyContent: 'space-evenly',
    fontSize: 17,
  },

});
