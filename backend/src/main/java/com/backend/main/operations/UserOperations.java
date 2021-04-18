package com.backend.main.operations;

import com.backend.main.models.ContactForm;
import com.backend.main.models.Device;
import com.backend.main.models.Statistics;
import com.backend.main.models.User;
import com.backend.main.repository.DeviceRepo;
import com.backend.main.repository.FormRepo;
import com.backend.main.repository.StatisticRepo;
import com.backend.main.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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
        return statisticsRepo.findAllByUserIdAndTimeRange(id);
    }

    public Optional<Device> getId(String deviceId){
        return deviceRepo.findById(deviceId);
    }

    public void addMessage(ContactForm message){
        formRepo.save(message);
    }
}
