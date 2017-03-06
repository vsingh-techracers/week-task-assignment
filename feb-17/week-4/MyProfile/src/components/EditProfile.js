/* @flow */

import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Alert,
  ActionSheetIOS,
  Modal,
  Image,
  ListView,
  TextInput,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  AsyncStorage,
  Navigator,
} from 'react-native'

const { width, height } = Dimensions.get('window');

export default class EditProfile extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isAllFieldsValid: false
    }
  }

  render() {
    return (
      <Navigator
        ref="navigator"
        renderScene  ={(route, navigator) => this.renderScene(route, navigator)}/>
    )
  }

   renderScene(route,navigator) {
    let iconPath = this.state.avatarSource === '' ? require('../images/profile.png') : this.state.avatarSource
    let maleButtonBackground = (this.state.gender === 'Male' ? {backgroundColor: 'white'} : {backgroundColor: 'transparent'})
    let femaleButtonBackground = (this.state.gender === 'Female' ? {backgroundColor: 'white'} : {backgroundColor: 'transparent'})
    return(
         
    <Image style = {styles.backgroundImage} source={require('../images/main_background.jpg')}>

      <View style={styles.profileImageHolderView}>
        <TouchableOpacity style={styles.profileImageClickableStyle}
          onPress={() => this.imagepicker()} >

          <Image source={iconPath} style = {styles.profileImageStyle}/>

        </TouchableOpacity>
      </View>

      <ScrollView style={{flex:1}}>
        <View style={{marginTop: 20}}>
          <View style={styles.inputViewStyle}>
            <Image source={require('../images/User.png')} style={styles.smallIconStyle}/>
            <TextInput
              ref='1'
              style={styles.textFieldStyle}
              placeholder='Name'
              returnKeyType='next'
              underlineColorAndroid='transparent'
              placeholderTextColor='rgba(230,230,230,0.5)'
              selectionColor={'white'}
              onChangeText={(nametext) => this.setState({nametext})}
              value={this.state.nametext}
              onSubmitEditing={(event)=>{this.refs.email.focus()}}
            />
          </View>
          <View style={styles.inputViewStyle}>
            <Image source={require('../images/Mail.png')} style={styles.smallIconStyle}/>
            <TextInput
              ref='1'
              style={styles.textFieldStyle}
              placeholder='Email'
              keyboardType='email-address'
              returnKeyType='next'
              ref='email'
              underlineColorAndroid='transparent'
              placeholderTextColor='rgba(230,230,230,0.5)'
              selectionColor={'white'}
              onChangeText={(emailtext) => this.setState({emailtext})}
              value={this.state.emailtext}
              onSubmitEditing={(event)=>{this.refs.phoneNumber.focus()}}
            />
          </View>
          <View style={styles.inputViewStyle}>
            <Image source={require('../images/Phone.png')} style={styles.smallIconStyle}/>
            <TextInput
              ref='1'
              style={styles.textFieldStyle}
              placeholder='Phone Number'
              keyboardType='phone-pad'
              ref='phoneNumber'
              underlineColorAndroid='transparent'
              placeholderTextColor='rgba(230,230,230,0.5)'
              selectionColor={'white'}
              onChangeText={(phonenumber) => this.setState({phonenumber})}
              value={this.state.phonenumber}
              onSubmitEditing={(event)=>{}}
            />
          </View>

          <View style={styles.inputViewStyle}>
            <Image source={require('../images/Gender.png')} style={styles.smallIconStyle}/>
            <View style={{flex:1,flexDirection: 'row',alignItems:'center',justifyContent:'center'}}>
              <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => this.setMaleGender()}>
                <TouchableOpacity style={[{width: 25,height: 25,borderRadius: 13.5,alignItems:'center',justifyContent:'center',borderWidth:1,borderColor:'#FFFFFF',marginTop: 20,marginLeft: 10},maleButtonBackground]}
                  onPress={() => this.setMaleGender()} >
                
                </TouchableOpacity>
                <Text style={{marginTop: 20,fontSize: 20.0,color: '#FFFFFF',fontFamily: 'Avenir-Black',marginLeft: 10}}>Male</Text>
              </TouchableOpacity>

              <TouchableOpacity style={{flexDirection: 'row'}} onPress={() => this.setFemaleGender()}>
                <TouchableOpacity style={[{width: 25,height: 25,borderRadius: 13.5,alignItems:'center',justifyContent:'center', borderWidth:1,borderColor:'#FFFFFF',marginTop: 20, marginLeft: 50},femaleButtonBackground]}
                  onPress={() => this.setFemaleGender()} >
                
              </TouchableOpacity>
              <Text style={{marginTop: 20,fontSize: 20.0,color: '#FFFFFF',fontFamily: 'Avenir-Black',marginLeft: 10}}>Female</Text>
              </TouchableOpacity>

            </View>
          </View>

        </View>
      </ScrollView>
      <View style={{alignItems:'center',justifyContent:'center', height: 55 }}>
        <TouchableOpacity underlayColor='gray' style={{width: width-40,height: 40,alignItems:'center',justifyContent:'center', borderWidth:1,borderColor:'#FFFFFF',borderRadius: 10, marginBottom: 10,backgroundColor:'#FFFFFF'}}
              onPress={() => this.onSubmitPressed()} >

          <Text style={styles.submitButtonText}>Submit</Text>

        </TouchableOpacity>
      </View>
    </Image>

      
    )
  } 
}

const styles = StyleSheet.create({

  backgroundview: {
    flex: 1,
    resizeMode: 'cover', 
  },
  backgroundImage: {
    flex: 1,
    width : width,
    height: height
  },
  profileImageHolderView: {
    marginTop: 5,
    alignItems:'center',
    justifyContent:'center'
  },
  profileImageClickableStyle: {
    alignItems:'center',
    justifyContent:'center',
    marginTop:20,
    height: 140,
    width: 140
  },
  profileImageStyle: {
    width :140,
    height: 140,
    borderRadius:70
  },
  inputViewStyle: {
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'center',
    marginTop: 10
  },
  smallIconStyle: {
    marginTop: 10,
    marginLeft: 15,
    width :30,
    height: 30
  },
  textFieldStyle: {
    flex: 1,
    marginLeft:15,
    marginRight:10,
    paddingLeft:5,
    paddingRight:5,
    height: 40,
    marginTop:10,
    fontSize: 17.0,
    color: '#FFFFFF',
    fontFamily: 'Avenir-Black'
  },
  datePickerViewStyle: {
    flexDirection: 'row',
    alignItems:'flex-start',
    justifyContent:'flex-start',
    marginTop: 10
  },
  submitButtonText: {
    marginTop: 0,
    fontSize: 20.0,
    color: 'rgb(21,53,75)',
    fontFamily: 'Avenir-Black'
  }
});
