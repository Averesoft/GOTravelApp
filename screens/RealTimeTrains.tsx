import * as React from 'react';
import { StyleSheet} from 'react-native';
import {Text, View, ScrollView} from 'react-native';
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
    <ScrollView>

    </ScrollView>
  )
}

const styles = StyleSheet.create({
});
