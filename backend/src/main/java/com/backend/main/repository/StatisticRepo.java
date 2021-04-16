package com.backend.main.repository;

import com.backend.main.models.Statistics;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface StatisticRepo extends CrudRepository<Statistics, String> {

    List<Statistics> findAllByUserId(String id);
}
