package com.backend.main.config.factory;

import com.backend.main.models.ContactForm;
import com.backend.main.models.Device;
import com.backend.main.models.Statistics;
import com.backend.main.models.User;
import com.backend.main.operations.UserOperations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.xml.ws.Response;
import java.util.List;
import java.util.Optional;

@Service
public class UserFactory {

    @Autowired
    private UserOperations userOperations;

    public User getUser(String username){
        return userOperations.getUser(username);
    }
    public List<Statistics> getStat(long id){
        return userOperations.getStatistics(id);
    }
    public ResponseEntity<?> getDeviceId(String id){
        return userOperations.getId(id);
    }
    public void addMessage(ContactForm contactForm){
        userOperations.addMessage(contactForm);
    }
    public ResponseEntity<?> assignDevice(long user, String device){
        return userOperations.assignDeviceToUser(user, device);
    }
}