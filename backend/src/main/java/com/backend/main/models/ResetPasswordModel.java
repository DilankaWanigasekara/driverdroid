package com.backend.main.models;

public class ResetPasswordModel {

    private String username;
    private String temp_pwd;
    private  String pwd;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getTemp_pwd() {
        return temp_pwd;
    }

    public void setTemp_pwd(String temp_pwd) {
        this.temp_pwd = temp_pwd;
    }

    public String getPwd() {
        return pwd;
    }

    public void setPwd(String pwd) {
        this.pwd = pwd;
    }
}
