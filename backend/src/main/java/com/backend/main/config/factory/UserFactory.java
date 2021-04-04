package com.backend.main.config.factory;

import com.backend.main.models.User;
import com.backend.main.operations.UserOperations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserFactory {

    @Autowired
    private UserOperations userOperations;

    public User getUser(String username){
        return userOperations.getUser(username);
    }
}
