package com.backend.main.repository;

import com.backend.main.models.Statistics;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface StatisticRepo extends CrudRepository<Statistics, String> {

    List<Statistics> findAllByUserId(String id);

    @Query(value = "select * " +
            "FROM  statistic " +
            "where user_id= :id AND date_time > current_date - interval 7 day", nativeQuery = true)
    List<Statistics> findAllByUserIdAndTimeRange(@Param("id") long id);
}