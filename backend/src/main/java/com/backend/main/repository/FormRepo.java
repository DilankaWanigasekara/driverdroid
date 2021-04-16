package com.backend.main.repository;

import com.backend.main.models.ContactForm;
import com.backend.main.models.Device;
import org.springframework.data.repository.CrudRepository;

public interface FormRepo extends CrudRepository<ContactForm, String> {

}
