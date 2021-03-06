import React, {Component} from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  StatusBar,
  View,
  Button,
  Alert
} from 'react-native';

import { AntDesign, MaterialIcons } from '@expo/vector-icons'; 

var Global = require('../assets/styles/global');

import { MonoText } from '../components/StyledText';
import ButtonCustom from '../components/ButtonCustom';
import Time from '../components/AddScreenComponents/Time';
import Destination from '../components/AddScreenComponents/Destination';
import Boxes from '../components/AddScreenComponents/Boxes';
import Photos from '../components/AddScreenComponents/Photos';
import Notes from '../components/AddScreenComponents/Notes';

import ClientAPI from '../clientAPI'


export default function AddScreen(props) {

async function _handleSubmitAddTrackingEvent(){
  let r  = await ClientAPI.addTrackingEvent();
  if (r.success){
    props.navigation.navigate("Main")
  }
}


  return (
            <View style={styles.container}>
              <ScrollView>
                <Time {...props}/>
                <Destination {...props}/>
                <Boxes {...props}/>
                <Notes {...props}/>

                <ButtonCustom buttonText="Complete Tracking Event" color={Global.Styles.primaryGreen} onPress={()=>_handleSubmitAddTrackingEvent()}/>
                <ButtonCustom buttonText="Discard" color={Global.Styles.cancelRed} onPress={()=>props.navigation.navigate("Main")}/>
              </ScrollView>

              

            </View>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: Global.Styles.appBackgroundColor,
    flexDirection: 'column',
    paddingTop: 25
  },
});
