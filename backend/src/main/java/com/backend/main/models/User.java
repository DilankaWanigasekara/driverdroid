package com.backend.main.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.time.ZonedDateTime;
import java.util.Objects;
import java.util.UUID;

@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(unique = true)
    private String username;

    @Column
    private String password;

    @Column(unique = true)
    private String contact;

    @Column
    private Boolean valid = false;

    @Column
    private String otp;

    @OneToOne
    private Device device;

    @Column
    private String tempPassword;

    @Column
    private ZonedDateTime tempPasswordExpiryDate;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }



    public Boolean getValid() {
        return valid;
    }

    public void setValid(Boolean valid) {
        this.valid = valid;
    }



    public String getOtp() {
        return otp;
    }

    public void setOtp(String otp) {
        this.otp = otp;
    }

    public Device getDevice() {
        return device;
    }

    public void setDevice(Device device) {
        this.device = device;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return Objects.equals(id, user.id) && Objects.equals(username, user.username) && Objects.equals(password, user.password) && Objects.equals(contact, user.contact) ;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, username, password, contact);
    }

    public String getTempPassword() {
        return tempPassword;
    }

    public void setTempPassword(String tempPassword) {
        this.tempPassword = tempPassword;
    }

    public ZonedDateTime getTempPasswordExpiryDate() {
        return tempPasswordExpiryDate;
    }

    public void setTempPasswordExpiryDate(ZonedDateTime tempPasswordExpiryDate) {
        this.tempPasswordExpiryDate = tempPasswordExpiryDate;
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", contact='" + contact + '\'' +
                ", valid=" + valid +
                ", otp='" + otp + '\'' +
                ", device=" + device +
                ", tempPassword='" + tempPassword + '\'' +
                ", tempPasswordExpiryDate=" + tempPasswordExpiryDate +
                '}';
    }
}
