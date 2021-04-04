package com.backend.main.repository;

import com.backend.main.models.User;
import org.springframework.data.repository.CrudRepository;

import javax.swing.text.html.Option;

public interface UserRepo extends CrudRepository<User, String> {

    User findByUsername(String username);

    User findByContact(String contact);
}
