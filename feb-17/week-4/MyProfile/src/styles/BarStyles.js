/* @flow */

import React, { Component } from 'react';
import {
  StyleSheet,
  Dimensions,
} from 'react-native';

import variables from '../styles/StyleVariables'
const {height, width} = Dimensions.get("window");

var barStyles = StyleSheet.create({
  // Nav Bar
  navBar: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,.95)',
    alignItems: 'stretch',
    borderBottomColor: variables.childBorder,
    borderBottomWidth: 1,
  },
  navBarLeftButton: {
    paddingLeft: 10,
  },
    backButton: {
      paddingTop: 3,
      paddingRight: 20,
      fontSize: 28,
      color: variables.tappableColor,
    },
  navBarRightButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    marginRight: variables.gutterSize,
    width: 48,
    height: 24,
    borderRadius: 12,
    overflow: 'hidden',
  },
  navBarTitleText: {
    justifyContent: 'center',
    top: 9,
    width: width / 1.6,
    fontSize: variables.h2,
    fontWeight: '700',
    fontFamily: variables.uiFont,
    textAlign: 'center',
    letterSpacing: 4,
    color: variables.subTextColor,
  },
  menuImage: {
    height: 13,
    width: 13,
    overflow: 'hidden',
  },
  menuAvatarImage: {
    height: 14,
    width: 14,
    borderWidth: 1,
    borderColor: variables.tappableColor,
    borderRadius: 7,
  },

  // Footer Bar Stuff
  footerBar: {
    position: 'absolute',
    right: variables.marginSize,
    bottom: variables.marginSize,
    left: variables.marginSize,
    flexDirection: 'row',
    alignItems: 'center',
    height: 44,
    marginTop: -1,
    borderWidth: 1,
    borderColor: variables.childBorder,
    backgroundColor: 'rgba(255,255,255,.9)',
  },
  actionButton: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: variables.marginSize,
    marginRight: variables.marginSize,
    height: 44 - (variables.marginSize * 2),
    borderRadius: 1,
    backgroundColor: variables.tappableColor,
  },
  actionSecondaryButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: variables.tappableColor,
    backgroundColor: 'white',
  },
    actionButtonText: {
      fontSize: 15,
      fontWeight: '700',
      fontFamily: variables.uiFont,
      color: 'white',
    },
    actionSecondaryButtonText: {
      color: variables.tappableColor,
    },
  storyInfoButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 44,
    paddingRight: variables.marginSize,
    paddingLeft: variables.marginSize,
  },
    storyInfoButtonText: {
      fontSize:  14,
      fontWeight: '700',
      fontFamily: variables.uiFont,
      color: variables.tappableColor,
    },
  twitterButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
    followButton: {
      justifyContent: 'center',
      height: variables.avatarSize,
      marginRight: variables.marginSize,
      marginLeft: variables.marginSize,
      paddingRight: variables.marginSize,
      paddingLeft: variables.marginSize,
      borderRadius: variables.marginSize,
      backgroundColor: variables.tappableColor,
    },
      followButtonText: {
        fontWeight: '700',
        fontSize: 12,
        color: 'white',
      },
  otherSites: {
    color: variables.tappableColor,
    fontSize: 12,
    fontWeight: 'bold',
  },

  // Home Button
  homeFooterBar: {
    justifyContent: 'center',
  },
  shareButtonText: {
    fontSize: 18,
    fontWeight: '700',
    fontFamily: variables.uiFont,
    color: variables.tappableColor,
  },
});

export {barStyles};
