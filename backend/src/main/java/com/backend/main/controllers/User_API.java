package com.backend.main.controllers;

import com.backend.main.config.factory.UserFactory;
import com.backend.main.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.security.Principal;

@RestController
public class User_API {

    @Autowired
    private UserFactory userFactory;

    @GetMapping(value = "/api/test")
    public String test(){
        return "Backend works";
    }

    @PostMapping(value = "/api/user/verify")
    public ResponseEntity<?> verifyUser(@RequestBody String otp){
        return null;
    }

    @GetMapping(value = "/api/user/me")
    public ResponseEntity<?> getCurrentUser(@RequestAttribute String id){
        return null;
    }

    @GetMapping(value = "/api/user/stats")
    public ResponseEntity<?> getStats(@RequestAttribute String id){
        return null;
    }

    @RequestMapping(value = "/me", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> currentUserNameSimple(HttpServletRequest request) {
        Principal principal = request.getUserPrincipal();
        return ResponseEntity.ok(userFactory.getUser(principal.getName()));
    }
}
