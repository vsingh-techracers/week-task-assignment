/* @flow */
import Halson from 'halson';

export default class User {
  constructor(json) {
    const user = Halson(json)
    this.name                       = user.name
    this.gender                     = user.gender
    this.dob                        = user.dob
    this.mobile_no                  = user.mobile_no
    this.email                      = user.email
    this.image_url                  = user.image_url
  }
}