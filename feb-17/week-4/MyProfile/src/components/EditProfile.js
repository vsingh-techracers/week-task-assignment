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
  Keyboard,
  Navigator,
} from 'react-native'
import ImagePicker from "react-native-image-picker";
import { ProfileStyles } from "../styles/ProfileStyles";
import { EditProfileStyle } from "../styles/EditProfileStyle";
import variables from "../styles/StyleVariables";


const { width, height } = Dimensions.get('window');

export default class EditProfile extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isAllFieldsValid: false,
      avatarSource: ""
    }
  }

  imagepicker(){
    ImagePicker.showImagePicker(null, (response) => {
    if (response.didCancel) {
      console.log('User cancelled image picker');
    }
    else if (response.error) {
      console.log('ImagePicker Error: ', response.error);
    }
    else if (response.customButton) {
      console.log('User tapped custom button: ', response.customButton);
    }
    else {
      let source = { uri: response.uri }
      // You can also display the image using data:
      // let source = { uri: 'data:image/jpeg;base64,' + response.data };
      this.setState({
        avatarSource: source
      })
    }
    })

  }

  render() {
    return (
      <Navigator
        ref="navigator"
        renderScene  ={(route, navigator) => this.renderScene(route, navigator)}/>
    )
  }
 renderScene(route, navigator) {
   return (
     <ScrollView style = {EditProfileStyle.container} >
       <View style = {EditProfileStyle.header} >
         <View style = {EditProfileStyle.editIconContainer}>
          <TouchableOpacity
            onPress ={()=> this.props.navigator.pop()}
          >
            <Image
              source={require('../images/submit_icon.png')}
              style = {EditProfileStyle.editIcon} />
          </TouchableOpacity>
         </View>
         <View style = {ProfileStyles.profilePicContainer} >
          <TouchableOpacity 
            style={ProfileStyles.profileImgBlock}
            onPress={() => this.imagepicker()}
          >
           <Image
             source={require('../images/profile.png')}
             style = {ProfileStyles.profileImage} />
          </TouchableOpacity>
         </View>
         <View style = {ProfileStyles.blackSeparater}/>
       </View>
       <View style = {ProfileStyles.body} >
         <View style={EditProfileStyle.inputContainer}>
          <TextInput
             style={EditProfileStyle.TextInput}
             placeholder='Full name'
             keyboardType="default"
             returnKeyType="next"
             ref="username"
             underlineColorAndroid='transparent'
             onSubmitEditing={(event)=>{this.refs.dob.focus()}}
          />
         </View>
         <View style={EditProfileStyle.inputContainer}>
           <TextInput
             style={EditProfileStyle.TextInput}
             placeholder="DOB (mm/dd/yyyy)"
             keyboardType="numeric"
             returnKeyType="next"
             ref="dob"
             underlineColorAndroid='transparent'
             onSubmitEditing={(event)=>{this.refs.mobile.focus()}}
           />
         </View>
         <View style={EditProfileStyle.inputContainer}>
           <TextInput
             style={EditProfileStyle.TextInput}
             placeholder="Mobile No"
             keyboardType="phone-pad"
             returnKeyType="next"
             ref="mobile"
             underlineColorAndroid='transparent'
             onSubmitEditing={(event)=>{this.refs.email.focus()}}
           />
         </View>
         <View style={EditProfileStyle.inputContainer}>
           <TextInput
             style={EditProfileStyle.TextInput}
             placeholder="email"
             keyboardType="email-address"
             returnKeyType="done"
             ref="email"
             underlineColorAndroid='transparent'
             onSubmitEditing={(event)=>{Keyboard.dismiss()}}
           />
         </View> 
       </View>
     </ScrollView>
   )
 } 
}
