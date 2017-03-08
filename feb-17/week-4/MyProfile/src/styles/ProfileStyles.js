/* @flow */

import React, { Component } from "react";
import {
  StyleSheet,
  Dimensions,
} from "react-native";

import variables from "./StyleVariables";
const {height, width} = Dimensions.get("window");

var ProfileStyles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: variables.navBarHeight
  },
  editIconContainer: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    padding: 10
  },
  header: {
    height: 200,
    justifyContent: "center",
    alignSelf: "stretch",
  },
  profilePicContainer: {
    flex: 1,
    alignSelf: "stretch",
    justifyContent: "center",
    alignItems: "center",
  },
  profileImgBlock: {
    height: 134,
    width: 134,
    borderRadius:67,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    backgroundColor: "lightgrey"
  },
  profileImage: {
    height: 130,
    width: 130,
    borderRadius:65
  },
  usernameContainer: {
    height: 40,
    alignSelf: "stretch",
    justifyContent: "center"
  },
  username: {
    alignSelf: "center",
    fontSize: 18,
    color: "black",
    fontWeight: "500"
  },
  body: {
    flex: 1,
    width: width,
    height: height,
    alignSelf: "stretch"
  },
  textContainer: {
    alignSelf: "stretch",
    justifyContent: "flex-end"
  },
  bodyTextContainer: {
    paddingBottom: 5,
    flexDirection: "row"
  },
  text: {
    flex: 1,
    fontSize: 16,
    color: "darkgrey",
    fontWeight: "600"
  },
  editIcon: {
    height: 20,
    width: 20
  },
  blackSeparater: {
    height: 1,
    alignSelf: "stretch",
    backgroundColor: "black",
    margin: 0
  },
  whiteSeparater: {
    height: 1,
    alignSelf: "stretch",
    backgroundColor: "white",
    margin: 0
  },
  lightSeparater: {
    height: 1,
    alignSelf: "stretch",
    backgroundColor: "lightgrey",
    margin: 0
  }
});

export { ProfileStyles };
