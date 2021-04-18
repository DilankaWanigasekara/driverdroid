package com.backend.main.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToOne;
import java.time.ZonedDateTime;
@Entity
public class Device {


    @Id
    private String deviceId;

    @Column
    private ZonedDateTime deviceDateTime;

    @OneToOne
    @JsonIgnore
    private User user;

    public String getDeviceId(){
        return deviceId;
    }
    public void setDeviceId(String id){
        this.deviceId=deviceId;
    }

    public ZonedDateTime getDeviceDateTime() {
        return deviceDateTime;
    }

    public void setDeviceDateTime(ZonedDateTime deviceDateTime) {
        this.deviceDateTime = deviceDateTime;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "Device{" +
                "deviceId='" + deviceId + '\'' +
                ", deviceDateTime=" + deviceDateTime +
                ", user=" + user +
                '}';
    }
}
