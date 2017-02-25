package com.example.rails.profilepage;


import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import com.example.rails.profilepage.base.BaseFragment;


/**
 * A simple {@link Fragment} subclass.
 */
public class ProfilePageFragment extends BaseFragment {


    public ProfilePageFragment() {
        // Required empty public constructor
    }


    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        return inflater.inflate(R.layout.fragment_profile_page, container, false);
    }

    @Override
    protected String getTitle() {
        return String.valueOf(R.string.profile_page);
    }
}
