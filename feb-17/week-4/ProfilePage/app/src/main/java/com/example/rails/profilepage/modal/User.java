package com.example.rails.profilepage.modal;

import android.graphics.Bitmap;

public class User {
    private String name;
    private String email;
    private String mobile;
    private String dob;
    private String gender;
    private Bitmap profilePic;

    public User() {
      /*Blank default constructor essential for Firebase*/
    }
    //Getters and setters for name
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    //Getters and setters for email
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }

    //Getters and setters for mobile
    public String getMobile() {
        return mobile;
    }
    public void setMobile(String mobile) {
        this.mobile = mobile;
    }


    //Getters and setters for dob
    public String getDob() {
        return dob;
    }
    public void setDob(String bloodGroup) {
        this.dob = dob;
    }

    //Getters and setters for gender
    public String getGender() {
        return gender;
    }
    public void setGender(String gender) {
        this.gender = gender;
    }

    //Getters and setters for profile pic
    public Bitmap getProfilePic() {
        return profilePic;
    }
    public void setProfilePic(Bitmap profilePic) {
        this.profilePic = profilePic;
    }
}
