package com.example.rails.profilepage;


import android.app.Activity;
import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.graphics.Color;
import android.os.Bundle;
import android.os.Environment;
import android.os.Handler;
import android.provider.MediaStore;
import android.support.annotation.NonNull;
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
import com.example.rails.profilepage.base.Utility;
import com.example.rails.profilepage.modal.User;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import butterknife.Bind;
import butterknife.ButterKnife;

public class ProfilePageFragment extends BaseFragment {

    private static View mProfilePageView;
    private static String name, email, mob, dob, gender;
    private String userChoosenTask;
    private int REQUEST_CAMERA = 0, SELECT_FILE = 1;
    private static Bitmap bitmapImg = null;

    @Bind(R.id.root_container) LinearLayout mRootContainer;
    @Bind(R.id.gender_error) TextView mGenderError;
    @Bind(R.id.gender_error_layout) LinearLayout mGenderErrorLayout;

    @Bind(R.id.add_image) LinearLayout mAddImage;
    @Bind(R.id.dummy_pic_container) LinearLayout mDummyPicContainer;
    @Bind(R.id.profile_pic) ImageView mProfilePic;
    @Bind(R.id.user_name) EditText mUserName;
    @Bind(R.id.user_email) EditText mUserEmail;
    @Bind(R.id.user_dob) EditText mUserDob;
    @Bind(R.id.user_mob) EditText mUserMob;
    @Bind(R.id.gender_container) LinearLayout mGenderContainer;
    @Bind(R.id.gender_status) RadioGroup mGenderStatus;
    @Bind(R.id.submit) Button mSubmit;


    @Bind(R.id.user_name_text) TextView mUserNameText;
    @Bind(R.id.user_email_text) TextView mUserEmailText;
    @Bind(R.id.user_dob_text) TextView mUserDobText;
    @Bind(R.id.user_mob_text) TextView mUserMobText;
    @Bind(R.id.user_gender_text) TextView mUserGenderText;
    @Bind(R.id.edit_again) Button mEditAgain;

    public ProfilePageFragment() {
        // Required empty public constructor
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        mProfilePageView = inflater.inflate(R.layout.fragment_profile_page, container, false);
        ButterKnife.bind(this, mProfilePageView);
        mAddImage.setOnClickListener(mAddImageListener);
        mSubmit.setOnClickListener(mSubmitButtonListener);
        mGenderStatus.setOnCheckedChangeListener(new RadioGroup.OnCheckedChangeListener() {
            @Override
            public void onCheckedChanged(RadioGroup group, int checkedId) { hideIt(mGenderErrorLayout); }
        });
        mEditAgain.setOnClickListener(new OnClickListener() {
            @Override
            public void onClick(View view) {
                progress.setMessage("Restoring profile...");
                progress.show();
                resetAll();
            }
        });
        return mProfilePageView;
    }

    private boolean dataValidation() {
        boolean validation = true;
        if(name.equals("")||!isNameValid(name)){
            mUserName.setError(Constants.nameErrorText);
            validation = false;
        }

        if(email.equals("")||!isEmailValid(email)){
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
            progress.setMessage("Updating profile...");
            progress.show();
            resetData();
            Handler handler = new Handler();
            handler.postDelayed(new Runnable() {
                public void run() {
                    setDataInStringFormat();
                    boolean isAllFieldsValid = dataValidation();
                    if (isAllFieldsValid){
                        try{
                            User user = new User();
                            user.setName(name);
                            user.setEmail(email);
                            user.setMobile(mob);
                            user.setDob(dob);
                            user.setGender(gender);
                            user.setProfilePic(bitmapImg);
                            setDataAsProfileView(user);
                            Toast.makeText(mActivity, "Successfully updated!!!", Toast.LENGTH_SHORT).show();
                        }catch (Exception e){
                            Toast.makeText(mActivity, "Updation failed!!!", Toast.LENGTH_SHORT).show();
                            progress.dismiss();
                        }

                    } else {
                        Toast.makeText(mActivity, "Something went wrong!!!", Toast.LENGTH_SHORT).show();
                        progress.dismiss();
                    }
                }
            }, 2000);

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

    private void setDataAsProfileView(User user) {
        mUserNameText.setText(!user.getName().equals("") ?   "Name  :"+user.getName():"Name");
        mUserEmailText.setText(!user.getEmail().equals("") ? "Email :"+user.getEmail():"Email");
        mUserMobText.setText(!user.getMobile().equals("") ?  "Phone :"+user.getMobile():"Phone");
        mUserDobText.setText(!user.getDob().equals("") ?     "DOB   :"+user.getDob():"DOB");
        mUserGenderText.setText(!user.getGender().equals("")?"Gender:"+user.getGender():"Gender");
        removeEditProfileView();
        mRootContainer.setBackgroundColor(Color.parseColor("#185349"));
        updateProfileView();
        progress.dismiss();
    }

    private void updateProfileView() {
        mUserNameText.setVisibility(View.VISIBLE);
        mUserEmailText.setVisibility(View.VISIBLE);
        mUserMobText.setVisibility(View.VISIBLE);
        mUserDobText.setVisibility(View.VISIBLE);
        mUserGenderText.setVisibility(View.VISIBLE);
        mEditAgain.setVisibility(View.VISIBLE);
    }

    private void removeEditProfileView() {
        mUserName.setVisibility(View.GONE);
        mUserEmail.setVisibility(View.GONE);
        mUserMob.setVisibility(View.GONE);
        mUserDob.setVisibility(View.GONE);
        mGenderContainer.setVisibility(View.GONE);
        mSubmit.setVisibility(View.GONE);
    }

    private void resetAll() {
        resetData();
        mRootContainer.setBackgroundColor(Color.parseColor("#35586c"));
        removeProfileView();
        updateEditProfileView();
        progress.dismiss();
    }

    private void updateEditProfileView() {
        mDummyPicContainer.setVisibility(View.VISIBLE);
        mUserName.setVisibility(View.VISIBLE);
        mUserEmail.setVisibility(View.VISIBLE);
        mUserMob.setVisibility(View.VISIBLE);
        mUserDob.setVisibility(View.VISIBLE);
        mGenderContainer.setVisibility(View.VISIBLE);
        mSubmit.setVisibility(View.VISIBLE);
    }

    private void removeProfileView() {
        mProfilePic.setVisibility(View.GONE);
        mUserNameText.setVisibility(View.GONE);
        mUserEmailText.setVisibility(View.GONE);
        mUserMobText.setVisibility(View.GONE);
        mUserDobText.setVisibility(View.GONE);
        mUserGenderText.setVisibility(View.GONE);
        mEditAgain.setVisibility(View.GONE);
    }

    private OnClickListener mAddImageListener = new OnClickListener() {
        @Override
        public void onClick(View v) {
            selectImage();
        }
    };

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (resultCode == Activity.RESULT_OK) {
            if (requestCode == SELECT_FILE)
                onSelectFromGalleryResult(data);
            else if (requestCode == REQUEST_CAMERA)
                onCaptureImageResult(data);
        }
    }

    private void onCaptureImageResult(Intent data) {
        bitmapImg=null;
        bitmapImg = (Bitmap) data.getExtras().get("data");
        ByteArrayOutputStream bytes = new ByteArrayOutputStream();
        bitmapImg.compress(Bitmap.CompressFormat.PNG, 90, bytes);

        File destination = new File(Environment.getExternalStorageDirectory(),
                System.currentTimeMillis() + ".png");
        FileOutputStream fo;
        try {
            destination.createNewFile();
            fo = new FileOutputStream(destination);
            fo.write(bytes.toByteArray());
            fo.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
        mDummyPicContainer.setVisibility(View.GONE);
        mProfilePic.setImageBitmap(bitmapImg);
        mProfilePic.setVisibility(View.VISIBLE);
    }

    private void onSelectFromGalleryResult(Intent data) {

        bitmapImg=null;
        if (data != null) {
            try {
                bitmapImg = MediaStore.Images.Media.getBitmap(getContext().getContentResolver(), data.getData());
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        mDummyPicContainer.setVisibility(View.GONE);
        mProfilePic.setImageBitmap(bitmapImg);
        mProfilePic.setVisibility(View.VISIBLE);
    }

    private void selectImage() {
        final CharSequence[] items = { "Take Photo", "Choose from Library",
                "Cancel" };

        AlertDialog.Builder builder = new AlertDialog.Builder(mActivity);
        builder.setTitle("Add Profile Image ");
        builder.setIcon(R.drawable.user_profile_img);
        builder.setItems(items, new DialogInterface.OnClickListener() {
            @Override
            public void onClick(DialogInterface dialog, int item) {
                boolean result=Utility.checkPermission(mActivity);

                if (items[item].equals("Take Photo")) {
                    userChoosenTask ="Take Photo";
                    if(result)
                        cameraIntent();

                } else if (items[item].equals("Choose from Library")) {
                    userChoosenTask ="Choose from Library";
                    if(result)
                        galleryIntent();

                } else if (items[item].equals("Cancel")) {
                    dialog.dismiss();
                }
            }
        });
        builder.show();
    }

    private void galleryIntent() {
        Intent intent = new Intent();
        intent.setType("image/*");
        intent.setAction(Intent.ACTION_GET_CONTENT);//
        startActivityForResult(Intent.createChooser(intent, "Select File"),SELECT_FILE);
    }

    private void cameraIntent() {
        Intent intent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
        startActivityForResult(intent, REQUEST_CAMERA);
    }

    @Override
    protected String getTitle() {
        return Constants.kProfilePageFragment;
    }
}
