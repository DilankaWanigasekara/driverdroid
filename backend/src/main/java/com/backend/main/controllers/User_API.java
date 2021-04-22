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
    public ResponseEntity<?> test01(){
        return ResponseEntity.ok(new ResponseModel("Backend Works!!!", HttpStatus.ACCEPTED));
    }

    @GetMapping(value = "/api/test") //to testing
    public ResponseEntity<?> test(){
        return ResponseEntity.ok(new ResponseModel("Backend Works!!!", HttpStatus.ACCEPTED));
    }

    @GetMapping(value="/api/get-statistics") //to get statistics from database
    public ResponseEntity<?> userStatistics(@RequestParam("id") long id){
        return ResponseEntity.ok(userFactory.getStat(id));
    }
    @GetMapping(value="/api/device-id") //to check user entered device id mapping with database
    public ResponseEntity<?> deviceId(@RequestParam("id") String deviceid){
        return userFactory.getDeviceId(deviceid);
    }
    @PostMapping("/api/contact")//to get user feedback and save in database
    public void  contact(@RequestBody ContactForm contactForm){
        userFactory.addMessage(contactForm);
    }
    @RequestMapping(value = "/me", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> currentUserNameSimple(HttpServletRequest request) {
        Principal principal = request.getUserPrincipal();
        return ResponseEntity.ok(userFactory.getUser(principal.getName()));
    }

    @PostMapping("/api/assign-device") //to assign device id to the relavant user
    public ResponseEntity<?> assignDevice(@RequestParam("userId") long userId,
                             @RequestParam("deviceId") String deviceId){
        return userFactory.assignDevice(userId, deviceId);
    }

}
