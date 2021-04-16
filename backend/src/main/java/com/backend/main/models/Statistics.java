package com.backend.main.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import java.sql.Time;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;
import java.util.UUID;
@Entity
public class Statistics {
    @Id
    private String id = UUID.randomUUID().toString();

    @Column(nullable=false)
    private ZonedDateTime dateTime;

    @Column(nullable=false)
    private String location;

    @ManyToOne
    @JsonIgnore
    private User user;

    public User getUser(){
        return user;
    }
    public void setUser(User user){
        this.user=user;
    }
    public ZonedDateTime getDateTime() {
        return dateTime;
    }

    public void setDateTime(ZonedDateTime dateTime) {
        this.dateTime = dateTime;
    }


    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }
}
