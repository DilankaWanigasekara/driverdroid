package com.backend.main.operations;

import com.backend.main.models.*;
import com.backend.main.repository.DeviceRepo;
import com.backend.main.repository.FormRepo;
import com.backend.main.repository.StatisticRepo;
import com.backend.main.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.nio.charset.Charset;
import java.time.ZonedDateTime;
import java.util.List;
import java.util.Optional;
import java.util.Random;

@Service
public class UserOperations {

    @Autowired
    private UserRepo userRepo;
    @Autowired
    private StatisticRepo statisticsRepo;
    @Autowired
    private DeviceRepo deviceRepo;
    @Autowired
    private FormRepo formRepo;

    public User getUser(String username){
        return userRepo.findByUsername(username);
    }

    public List<Statistics> getStatistics(long id){
        Device device = deviceRepo.findByUserId(id).get();
        return statisticsRepo.findAllByDeviceIdAndTimeRange(device.getId());
    }

    public Optional<Device> getId(String deviceId) {
            return deviceRepo.findById(deviceId);
    }

    public void addMessage(ContactForm message){ //save user message in database
        formRepo.save(message);
    }

    public ResponseEntity<?> assignDeviceToUser(long user, String device){
        if (deviceRepo.existsById(device)){
            Device dev = deviceRepo.findById(device).get();
            if (dev.getUser()!=null){
                return new ResponseEntity(new ResponseModel("Device is already Assigned to an user", HttpStatus.PRECONDITION_FAILED), HttpStatus.PRECONDITION_FAILED);
            }

            if(userRepo.existsById(user)){
                User u = userRepo.findById(user).get();
                dev.setDeviceDateTime(ZonedDateTime.now());
                dev.setUser(u);
                deviceRepo.save(dev);
                u.setDevice(dev);
                return ResponseEntity.ok(userRepo.save(u));
            }else {
                return new ResponseEntity(new ResponseModel("Invalid User id", HttpStatus.PRECONDITION_FAILED), HttpStatus.PRECONDITION_FAILED);
            }
        }else {
            return new ResponseEntity(new ResponseModel("Invalid Device Id", HttpStatus.PRECONDITION_FAILED), HttpStatus.PRECONDITION_FAILED);
        }
    }


}
