package com.backend.main.controllers;

import com.backend.main.config.factory.UserFactory;
import com.backend.main.models.ContactForm;
import com.backend.main.models.ResponseModel;
import com.backend.main.models.Statistics;
import com.backend.main.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.security.Principal;
import java.util.List;

@RestController
public class User_API {

    @Autowired
    private UserFactory userFactory;

    @GetMapping(value = "/")
    public ResponseEntity<?> test(){
        return ResponseEntity.ok(new ResponseModel("Backend Works!!!", HttpStatus.ACCEPTED));
    }

    @GetMapping(value = "/api/test")
    public ResponseEntity<?> test(){
        return ResponseEntity.ok(new ResponseModel("Backend Works!!!", HttpStatus.ACCEPTED));
    }

    @GetMapping(value="/api/get-statistics")
    public ResponseEntity<?> userStatistics(@RequestParam("id") String id){
        return ResponseEntity.ok(userFactory.getStat(id));
    }
    @GetMapping(value="/api/device-id")
    public ResponseEntity<?> deviceId(@RequestParam("id") String deviceid){
        return ResponseEntity.ok(userFactory.getDeviceId(deviceid));
    }
    @PostMapping("/api/contact")
    public void  contact(@RequestBody ContactForm contactForm){
        userFactory.addMessage(contactForm);
    }
    @RequestMapping(value = "/me", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> currentUserNameSimple(HttpServletRequest request) {
        Principal principal = request.getUserPrincipal();
        return ResponseEntity.ok(userFactory.getUser(principal.getName()));
    }


}
