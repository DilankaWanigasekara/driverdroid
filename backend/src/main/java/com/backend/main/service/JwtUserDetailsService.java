package com.backend.main.service;

import java.io.IOException;
import java.util.ArrayList;

import com.backend.main.config.SMSConfig;
import com.backend.main.models.User;
import com.backend.main.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.management.openmbean.KeyAlreadyExistsException;

@Service
public class JwtUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private PasswordEncoder bcryptEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepo.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found with username: " + username);
        }
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),
                new ArrayList<>());
    }

    public ResponseEntity<?> save(User user) {
        if(userRepo.findByUsername(user.getUsername())!=null){
            return new ResponseEntity("User already Exist", HttpStatus.PRECONDITION_FAILED );
        }

        if(userRepo.findByContact(user.getContact())!=null){
            return new ResponseEntity("Phone number already Exist", HttpStatus.PRECONDITION_FAILED );
        }



        user.setPassword(bcryptEncoder.encode(user.getPassword()));
        try {
            String code = RandomNumGeneratorService.generateID(6);
            SMSConfig smsConfig = new SMSConfig(user.getContact(), code);
            user.setOtp(code);
        } catch (IOException e) {
            e.printStackTrace();
        }

        return ResponseEntity.ok(userRepo.save(user));
    }

    public ResponseEntity<?> verify(String otp, String username){
        User user = userRepo.findByUsername(username);
        if (user.getOtp().equals(otp)){
            user.setValid(true);
            return ResponseEntity.ok(userRepo.save(user));
        }else{
            return new ResponseEntity("Invalid OTP entered!", HttpStatus.PRECONDITION_FAILED);
        }

    }
}