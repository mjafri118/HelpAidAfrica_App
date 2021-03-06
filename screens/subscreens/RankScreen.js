import React, {Component} from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Button,
  StatusBar,
  View
} from 'react-native';

import SafeAreaView from 'react-native-safe-area-view';

var Global = require('../../assets/styles/global');



export default function RankScreen(props) {

  return (
        <View style={{height: '100%'}}>
            {Platform.OS === 'ios' && <StatusBar barStyle="light-content" />}
            <SafeAreaView style={styles.container}>
            <Text>No ranks just yet!</Text>

            </SafeAreaView>
        </View>

  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: Global.Styles.appBackgroundColor,
    paddingTop: 10,
    height: "100%",
    paddingHorizontal: 5,
    flexDirection: 'column',
  },
});
