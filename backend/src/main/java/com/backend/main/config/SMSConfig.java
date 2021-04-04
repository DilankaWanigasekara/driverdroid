package com.backend.main.config;

import org.springframework.beans.factory.annotation.Value;

import java.net.*;
import java.io.*;

public class SMSConfig {

    @Value("${phone.sms.from}")
    private String from;

    @Value("${phone.sms.pwd}")
    private String pwd;

    public SMSConfig(String to, String text) throws IOException {
        String url = "http://textit.biz/sendmsg/index.php?id=94763358718&pw=1995&to=" + to + "&text=" + text;
        URL textit = new URL(url);
        BufferedReader in = new BufferedReader(new InputStreamReader(textit.openStream()));

        String inputLine;
        while ((inputLine = in.readLine()) != null)
            System.out.println(inputLine);
        in.close();
    }
}

