package com.example.rails.profilepage;


import android.app.Activity;
import android.app.AlertDialog;
import android.content.DialogInterface;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.os.Bundle;
import android.os.Environment;
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

    @Bind(R.id.gender_error) TextView mGenderError;
    @Bind(R.id.gender_error_layout) LinearLayout mGenderErrorLayout;

    @Bind(R.id.add_image_text) TextView mAddImagetext;
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
        mAddImage.setOnClickListener(mAddImageListener);
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
                user.setProfilePic(bitmapImg);
                Toast.makeText(mActivity, "Data saved successfully!!!", Toast.LENGTH_SHORT).show();
            }
        }
    };

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
        mAddImagetext.setVisibility(View.GONE);
        mProfilePic.setImageBitmap(bitmapImg);
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
        mAddImagetext.setVisibility(View.GONE);
        mProfilePic.setImageBitmap(bitmapImg);
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
