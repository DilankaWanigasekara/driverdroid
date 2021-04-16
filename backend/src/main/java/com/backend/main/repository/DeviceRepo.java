package com.backend.main.repository;

import com.backend.main.models.Device;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

public interface DeviceRepo extends CrudRepository<Device, String> {
    @Override
    Optional<Device> findById(String deviceId);
}
