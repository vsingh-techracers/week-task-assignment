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
import { nameRegex, dobRegex, mobileRegex, emailRegex } from "../modals/Regex.js"
import variables from "../styles/StyleVariables";
import ProfileView from './ProfileView'


const { width, height } = Dimensions.get('window');
let imageData;
const userData = [];
let isAllFieldsValid;

export default class EditProfile extends Component {

  constructor(props) {
    super(props)
    this.state = {
      imgUri: "",
      username: "",
      gender: "",
      dob: "",
      email: "",
      mob: "",
      usernameErr: "",
      genderErr: "",
      dobErr: "",
      emailErr: "",
      mobErr: ""
    }
  }

  blankView() {
    return (
      <View style={{ flex: 0 }}/>
      );
  }

  setUsername(text){
    if (text.length<4) {
      if (text.length<1) {
        this.setState({ usernameErr: "Required" });
      } else {
        this.setState({ usernameErr: "Username must be in more than 4 chars" });
      }
    } else {
      this.setState({
        usernameErr: "",
        username: text
      });
    }
  }
  
  setDob(text){
    if (text.length<10) {
      if (text.length<1) {
        this.setState({ dobErr: "Required" });
      }
    } else {
      this.setState({
        dobErr: "",
        dob: text
      });
    }
  }
  
  setMobile(text){
    if (text.length<10) {
      if (text.length<1) {
        this.setState({ mobErr: "Required" });
      }
    } else {
      this.setState({
        mobErr: "",
        mob: text
      });
    }
  }

  setEmail(text){
      if (text.length<1) {
        this.setState({ emailErr: "Required" });
      }
      else {
      this.setState({
        emailErr: "",
        email: text
      });
    }
  }

  isNameValid() {
    console.log("@@@@@@@@@@@@", this.state.username.match(nameRegex))
    if (this.state.username.match(nameRegex)) {
      return true
    } else {
      return false
    }
  }

  isDOBValid(txt) {
    return txt.toLowerCase(dobRegex).trim().test(dobRegex);
  }

  isMobValid(txt) {
    return txt.toLowerCase(mobileRegex).trim().test(mobileRegex);
  }

  isEmailValid(txt) {
    return txt.toLowerCase(emailRegex).trim().test(emailRegex);
  }

  applyValidation() {
    // let valid = true;
    // if (!this.isNameValid()) {
    //    console.log("===isNameValid=====");
    //   valid = false;
    // }
    // if (!this.isDOBValid(this.state.dob)) {
    //   console.log("===isDOBValid=====");
    //   valid = false;
    // }
    // if (!this.isMobValid(this.state.mob)) {
    //   console.log("===isMobValid=====");
    //   valid = false;
    // }
    // if (!this.isEmailValid(this.state.email)) {
    //   console.log("===isEmailValid=====");
    //   valid = false;
    // }
    return valid;
  }

  submit() {
    userData = []
    userData.push(this.state.username);
    userData.push(this.state.mob);
    userData.push(this.state.email);
    userData.push(this.state.dob);
    console.log("@@@@@@@@",userData);
    this.props.navigator.pop();
    // this.props.navigator.push({
    //     index: 0,
    //     id: "ProfileView",
    //     props: {
    //       name: this.state.username,
    //       email: this.state.email,
    //       mob: this.state.mob,
    //       dob: this.state.dob,
    //     }
    // });

    //userData.map((usr)=> new User());


    // isAllFieldsValid = this.applyValidation();
    // console.log("========",isAllFieldsValid);
    //this.props.navigator.pop()
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
            onPress ={()=> this.submit()}
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
          { this.state.usernameErr ? <Text style={EditProfileStyle.errorText}>{this.state.usernameErr}</Text>:this.blankView }
          <TextInput
            ref='username'
             style={EditProfileStyle.TextInput}
             placeholder='Full name'
             keyboardType="default"
             returnKeyType="next"
             clearTextOnFocus={true}
             underlineColorAndroid='transparent'
             blurOnSubmit={true}
             maxLength={50}
             numberOfLines={1}
             onChangeText={(text) => this.setUsername(text)}
          />
          { this.state.mobErr ? <Text style={EditProfileStyle.errorText}>{this.state.mobErr}</Text>:this.blankView }
          <TextInput
            ref='userDob'
            style={EditProfileStyle.TextInput}
            placeholder="DOB (mm/dd/yyyy)"
            keyboardType="numeric"
            returnKeyType="next"
            underlineColorAndroid='transparent'
            maxLength={10}
            numberOfLines={1}
            onChangeText={(text) => this.setMobile(text)}
          />
          { this.state.dobErr ? <Text style={EditProfileStyle.errorText}>{this.state.dobErr}</Text>:this.blankView }
          <TextInput
            style={EditProfileStyle.TextInput}
            placeholder="Mobile No"
            keyboardType="phone-pad"
            returnKeyType="next"
            ref='mobile'
            underlineColorAndroid='transparent'
            maxLength={10}
            numberOfLines={1}
            onChangeText={(text) => this.setDob(text)}
          />
          { this.state.emailErr ? <Text style={EditProfileStyle.errorText}>{this.state.emailErr}</Text>:this.blankView }
          <TextInput
            style={EditProfileStyle.TextInput}
            placeholder="email"
            keyboardType="email-address"
            returnKeyType="done"
            ref="email"
            underlineColorAndroid='transparent'
            maxLength={100}
            numberOfLines={1}
            onSubmitEditing={(event)=>{Keyboard.dismiss()}}
            onChangeText={(text) => this.setEmail(text)}
          />           
         </View> 
       </View>
     </ScrollView>
   )
 } 
}
