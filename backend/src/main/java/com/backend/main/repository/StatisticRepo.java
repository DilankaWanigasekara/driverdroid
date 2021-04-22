package com.backend.main.repository;

import com.backend.main.models.Statistics;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface StatisticRepo extends CrudRepository<Statistics, String> {

    @Query(value = "select * " +
            "FROM  statistics " +
            "where device_id= :id AND date_time > current_date - interval 30 day", nativeQuery = true)
    List<Statistics> findAllByDeviceIdAndTimeRange(@Param("id") String id);
}
