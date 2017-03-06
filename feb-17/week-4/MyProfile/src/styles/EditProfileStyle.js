/* @flow */

import React, { Component } from 'react';
import {
  StyleSheet,
  Dimensions,
} from 'react-native';
import variables from "./StyleVariables";
const {height, width} = Dimensions.get("window");

var EditProfileStyle = StyleSheet.create({
	container: {
    flex: 1,
    marginTop: variables.navBarHeight
  },
  header: {
    height: 180,
    alignSelf: "stretch",
  },
  editIconContainer: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    paddingRight: 10,
    paddingLeft: 10
  },
  editIcon: {
    height: 25,
    width: 25
  },
	inputContainer: {
		backgroundColor: "lightgrey",
		margin: 10,
		borderWidth: 1,
		borderColor: "black"
	},
	TextInput: {
		alignSelf: "stretch",
		height: 40,
		padding: 5,
		fontSize: 16,
		color: "black"	
	},
	spinnerView: {
		height: 160,
		zIndex: 30,
		width,
		backgroundColor: "transparent",
		position: "absolute",
		bottom: 0,
		alignItems: "flex-end"
	},
	imageOption: {
		borderRadius: 10,
		width: width - 20,
		backgroundColor: "white",
		height: 95,
		marginHorizontal: 10,
		marginVertical: 5,
		justifyContent: "space-around"
	},
	imageButtonOption: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		backgroundColor: "transparent",
		paddingHorizontal: 10
	},
	imagePickerText: {
		fontSize: 16,
		paddingVertical: 10,
		color: "rgba(0, 0, 0, 0.8)",
		fontWeight: "500"
	},
	imageCancelButtonOption: {
		justifyContent: "center",
		alignItems: "center"
	},
	pickerText: {
		fontSize: 16,
		padding: 10,
		color: "#266ca6",
		fontWeight: "600"
	},
	imageCancelOption: {
		borderRadius: 10,
		width: width - 20,
		backgroundColor: "white",
		height: 45,
		marginHorizontal: 10,
		marginVertical: 5
	}
});

export {EditProfileStyle};
