package com.backend.main.models;

import org.springframework.http.HttpStatus;

import java.io.Serializable;

public class ResponseModel implements Serializable {

    private String message;
    private HttpStatus status;

    public ResponseModel(String message, HttpStatus status) {
        this.message = message;
        this.status = status;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public HttpStatus getStatus() {
        return status;
    }

    public void setStatus(HttpStatus status) {
        this.status = status;
    }
}
