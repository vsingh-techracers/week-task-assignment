package com.example.rails.profilepage.base;

import android.app.ProgressDialog;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.support.v4.app.FragmentManager;
import android.support.v4.app.FragmentTransaction;

import com.example.rails.profilepage.MainActivity;

public abstract class BaseFragment extends Fragment {
	public MainActivity mActivity;
	protected ProgressDialog progress;


	@Override
	public void onCreate(Bundle savedInstanceState) {
		super.onCreate(savedInstanceState);
		mActivity		=	(MainActivity) this.getActivity();
        progress=new ProgressDialog(mActivity);
	}

	@Override
	public void onResume() {
		super.onResume();
		getActivity().setTitle(getTitle());
	}

	protected abstract String getTitle();
}
