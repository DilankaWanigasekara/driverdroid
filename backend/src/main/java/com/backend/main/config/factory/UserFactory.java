package com.backend.main.config.factory;

import com.backend.main.models.ContactForm;
import com.backend.main.models.Device;
import com.backend.main.models.Statistics;
import com.backend.main.models.User;
import com.backend.main.operations.UserOperations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserFactory {

    @Autowired
    private UserOperations userOperations;

    public User getUser(String username){
        return userOperations.getUser(username);
    }
    public List<Statistics> getStat(String id){
        return userOperations.getStatistics(id);
    }
    public Optional<Device> getDeviceId(String id){
        return userOperations.getId(id);
    }
    public void addMessage(ContactForm contactForm){
        userOperations.addMessage(contactForm);
    }
}
