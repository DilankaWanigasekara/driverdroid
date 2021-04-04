package com.backend.main.operations;

import com.backend.main.models.User;
import com.backend.main.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserOperations {

    @Autowired
    private UserRepo userRepo;

    public User getUser(String username){
        return userRepo.findByUsername(username);
    }
}
