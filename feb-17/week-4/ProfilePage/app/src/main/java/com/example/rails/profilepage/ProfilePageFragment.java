package com.example.rails.profilepage;


import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;

import com.example.rails.profilepage.base.BaseFragment;
import com.example.rails.profilepage.base.Constants;
import com.example.rails.profilepage.modal.User;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import butterknife.Bind;
import butterknife.ButterKnife;

public class ProfilePageFragment extends BaseFragment {

    private static View mProfilePageView;
    private static String name, email, mob, dob, gender;

    @Bind(R.id.gender_error) TextView mGenderError;
    @Bind(R.id.gender_error_layout) LinearLayout mGenderErrorLayout;

    @Bind(R.id.add_image_text) EditText mAddImagetext;
    @Bind(R.id.add_image) LinearLayout mAddImage;
    @Bind(R.id.profile_pic) ImageView mProfilePic;
    @Bind(R.id.user_name) EditText mUserName;
    @Bind(R.id.user_email) EditText mUserEmail;
    @Bind(R.id.user_dob) EditText mUserDob;
    @Bind(R.id.user_mob) EditText mUserMob;
    @Bind(R.id.gender_status) RadioGroup mGenderStatus;
    @Bind(R.id.submit) Button mSubmit;


    public ProfilePageFragment() {
        // Required empty public constructor
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        mProfilePageView = inflater.inflate(R.layout.fragment_profile_page, container, false);
        ButterKnife.bind(this, mProfilePageView);
        mSubmit.setOnClickListener(mSubmitButtonListener);
        mGenderStatus.setOnCheckedChangeListener(new RadioGroup.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(RadioGroup group, int checkedId) { hideIt(mGenderErrorLayout); }
        });
        return mProfilePageView;
    }

    private boolean dataValidation() {
        boolean validation = true;
        if(name.equals("")||!isNameValid(name)){
            mUserName.setError(Constants.nameErrorText);
            validation = false;
        }

        if(email.equals("")||!isPhoneValid(email)){
            mUserEmail.setError(Constants.emailErrorText);
            validation = false;
        }

        if(mob.equals("")||!isPhoneValid(mob)){
            mUserMob.setError(Constants.mobErrorText);
            validation = false;
        }

        if(mGenderStatus.getCheckedRadioButtonId()<0){
            setErrorMsg(mGenderErrorLayout, mGenderError, Constants.genderErrorText);
            validation = false;
        }

        if(dob.equals("")||!isDateValid(dob)){
            mUserDob.setError(Constants.dateErrorText);
            validation = false;
        }

        return validation;
    }

    private OnClickListener mSubmitButtonListener    =   new OnClickListener() {
        @Override
        public void onClick(View v) {
            resetData();
            setDataInStringFormat();
            boolean isAllFieldsValid = dataValidation();
            if (isAllFieldsValid){
                User user = new User();
                user.setName(name);
                user.setEmail(email);
                user.setMobile(mob);
                user.setDob(dob);
                user.setGender(gender);
                Toast.makeText(mActivity, "Data saved successfully!!!", Toast.LENGTH_SHORT).show();
            }
        }
    };

    private void resetData() {
        name = email = dob = mob = gender = null;
    }

    private void setDataInStringFormat() {
        name = getStringDataFromEditText(mUserName);
        email = getStringDataFromEditText(mUserEmail);
        dob = getStringDataFromEditText(mUserDob);
        mob = getStringDataFromEditText(mUserMob);
        if(mGenderStatus.getCheckedRadioButtonId()>=0){
            gender = getStringDataFromRadioButton((RadioButton) mProfilePageView.findViewById(mGenderStatus.getCheckedRadioButtonId()));
        }
    }

    @Override
    protected String getTitle() {
        return Constants.kProfilePageFragment;
    }
}
