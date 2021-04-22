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
    private String id;

    @Column
    private ZonedDateTime deviceDateTime;

    @OneToOne
    @JsonIgnore
    private User user;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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
                "deviceId='" + id + '\'' +
                ", deviceDateTime=" + deviceDateTime +
                ", user=" + user +
                '}';
    }
}
