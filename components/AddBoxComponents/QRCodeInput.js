import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    TextInput,
    TouchableOpacity,
    Alert,
    LayoutAnimation
} from 'react-native';

var Global = require('../../assets/styles/global');
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'; 
import {connect} from 'react-redux'
import ClientAPI from '../../clientAPI'

import { BarCodeScanner } from 'expo-barcode-scanner';



class QRCodeInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            scanned: true
        };

        this._handleBarCodeScanned = this._handleBarCodeScanned.bind(this)
    }

    // Ideally we see https://track.helpaidafrica.org/where-is-my-donation-box?id=2020-08-A-Box-C116
    async _handleBarCodeScanned({ type, data}){
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
        this.props.updateBoxScanned(true); 

        if (type !== "org.iso.QRCode"){
            Alert.alert("You must scan a QR code")
        }

        if (!data.includes("https://track.helpaidafrica.org/where-is-my-donation-box?id=")){
            Alert.alert("Invalid Help Aid Africa QR code.")
        }

        let boxID = data.split("=")[1].split("-")
        boxID = boxID[boxID.length - 1]

        this.props.updateBoxID_Number(boxID);
        await ClientAPI.searchForBox(boxID)

    }

    _handleQRIconClicked(){
        LayoutAnimation.configureNext(LayoutAnimation.Presets.spring)
        this.props.updateBoxScanned(false); 
        this.props.updateBoxID_Number("")
        this.props.updateBoxSearchState(null);
        this.props.updateBoxData(null);
    }

  render() {
    return(
        <View style={styles.container}>
                
                {   !this.props.boxScanned && 
                    <BarCodeScanner
                        onBarCodeScanned={this.props.boxScanned ? undefined : this._handleBarCodeScanned}
                        style={styles.CameraView}
                    />          
                }

                {   !this.props.boxScanned && 
                    <Ionicons name="ios-qr-scanner" size={150} color={"rgba(242,242,242,.5)"} style={styles.bracket}/>        
                }

                {this.props.boxScanned && <TouchableOpacity onPress={() => this._handleQRIconClicked() }><MaterialCommunityIcons name="qrcode-scan" size={124} color="black"/></TouchableOpacity>}
        </View>
    );
  }
};

function mapStateToProps(state){
    return {
        boxID_Number: state.addBoxReducer.boxID_Number,
        boxScanned: state.addBoxReducer.boxScanned
    }
}

const mapDispatchToProps = (dispatch, ownProps) =>{
    return {
        updateBoxID_Number: (cons) => dispatch({ type: 'UPDATE_BOXID_NUMBER', boxID_Number: cons }),
        updateBoxSearchState: (cons) => dispatch({type: 'UPDATE_BOX_SEARCH', boxSearch: cons}),
        updateBoxData: (cons) => dispatch({type: 'UPDATE_BOX_DATA', boxData: cons}),
        updateBoxScanned: (cons) => dispatch({type: 'UPDATE_BOX_SCANNED', boxScanned: cons})
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: 'center',
        marginBottom: 25
    },
    CameraView:{
        height: 200,
        width: "100%",
        borderRadius: 25,
        overflow: 'hidden'
    },

    bracket:{
        position: 'absolute',
        justifyContent: 'center',
        alignSelf: 'center',
    }
});

// export default connect(mapStateToProps, mapDispatchToProps)(TemplateComponent);
export default connect(mapStateToProps, null)(connect(mapStateToProps, mapDispatchToProps)(QRCodeInput))