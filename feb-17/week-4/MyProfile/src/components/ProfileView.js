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
  ListView,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  AsyncStorage,
  Navigator,
} from 'react-native'
import { ProfileStyles } from "../styles/ProfileStyles";
import { EditProfileStyle } from "../styles/EditProfileStyle";
import variables from "../styles/StyleVariables";
const { width, height } = Dimensions.get("window");

export default class ProfileView extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isAllFieldsValid: false
    }
  }

  renderUserAttr() {
    return user.map((attribute, index)=>
      <View key = {index} style = {{ margin: variables.mediumDistance }} >
        <View style = {[ProfileStyles.textContainer, ProfileStyles.bodyTextContainer]} >
          <Text style = {ProfileStyles.text} >
            Male
          </Text>
          <TouchableOpacity >
            <Image
              source={require('../images/edit_icon.png')}
              style = {ProfileStyles.editIcon} />
          </TouchableOpacity>
        </View>
        <View style = {ProfileStyles.lightSeparater}/>
      </View>
    );
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
      <View style = {ProfileStyles.container} >
        <View style = {ProfileStyles.header} >
          <View style = {ProfileStyles.editIconContainer}>
            <TouchableOpacity
              onPress ={()=> this.props.navigator.push({id: "editProfile"})}
            >
              <Image
                source={require('../images/edit_icon.png')}
                style = {EditProfileStyle.editIcon} />
            </TouchableOpacity>
          </View>
          <View style = {ProfileStyles.profilePicContainer} >
            <TouchableOpacity style={ProfileStyles.profileImgBlock} >
              <Image
                source={require('../images/profile.png')}
                style = {ProfileStyles.profileImage} />
            </TouchableOpacity>
          </View>
          <View style = {ProfileStyles.usernameContainer} >
            <Text style = {ProfileStyles.username} >
              Vinay Singh
            </Text>
          </View>
          <View style = {ProfileStyles.blackSeparater}/>
        </View>
        <ScrollView style = {ProfileStyles.body} >
          <View style = {{ margin: variables.mediumDistance }} >
            <View style = {[ProfileStyles.textContainer, ProfileStyles.bodyTextContainer]} >
              <Text style = {ProfileStyles.text} >
                Male
              </Text>
              <TouchableOpacity >
                <Image
                  source={require('../images/single_edit.png')}
                  style = {ProfileStyles.editIcon} />
              </TouchableOpacity>
            </View>
            <View style = {ProfileStyles.lightSeparater}/>
          </View>
          <View style = {{ margin: variables.mediumDistance }} >
            <View style = {[ProfileStyles.textContainer, ProfileStyles.bodyTextContainer]} >
              <Text style = {ProfileStyles.text} >
                +91 9753238059
              </Text>
              <TouchableOpacity >
                <Image
                  source={require('../images/single_edit.png')}
                  style = {ProfileStyles.editIcon} />
              </TouchableOpacity>
            </View>
            <View style = {ProfileStyles.lightSeparater}/>
          </View>
          <View style = {{ margin: variables.mediumDistance }} >
            <View style = {[ProfileStyles.textContainer, ProfileStyles.bodyTextContainer]} >
              <Text style = {ProfileStyles.text} >
                01 Aug, 1990
              </Text>
              <TouchableOpacity >
                <Image
                  source={require('../images/single_edit.png')}
                  style = {ProfileStyles.editIcon} />
              </TouchableOpacity>
            </View>
            <View style = {ProfileStyles.lightSeparater}/>
          </View>
          <View style = {{ margin: variables.mediumDistance }} >
            <View style = {[ProfileStyles.textContainer, ProfileStyles.bodyTextContainer]} >
              <Text style = {ProfileStyles.text} >
                vinay@gmail.com
              </Text>
              <TouchableOpacity >
                <Image
                  source={require('../images/single_edit.png')}
                  style = {ProfileStyles.editIcon} />
              </TouchableOpacity>
            </View>
            <View style = {ProfileStyles.lightSeparater}/>
          </View>
        </ScrollView>
      </View>
    )
  } 
}
