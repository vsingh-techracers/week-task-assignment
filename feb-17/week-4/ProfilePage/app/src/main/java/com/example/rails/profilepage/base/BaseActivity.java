package com.example.rails.profilepage.base;

import android.os.Bundle;
import android.support.v4.app.FragmentManager;
import android.support.v7.app.AppCompatActivity;
import android.view.View;

public abstract class BaseActivity extends AppCompatActivity {

    private FragmentManager fragmentManager;
    private AddFragmentHandler fragmentHandler;


    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        fragmentManager = getSupportFragmentManager();
        fragmentHandler = new AddFragmentHandler(fragmentManager);
    }

    @Override
    protected void onResume() {
        super.onResume();
    }

    @Override
    protected void onDestroy() {
        fragmentManager = null;
        super.onDestroy();
    }

    protected void add(BaseFragment fragment) {
        fragmentHandler.add(fragment);
    }

    @Override
    public void onBackPressed() {
        super.onBackPressed();
        if (fragmentManager.getBackStackEntryCount() == 0) {
            finish();
        }
    }


}
