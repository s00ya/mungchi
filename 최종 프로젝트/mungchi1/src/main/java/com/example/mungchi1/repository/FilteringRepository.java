package com.example.mungchi1.repository;


import com.example.mungchi1.entity.FilteringEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FilteringRepository extends JpaRepository<FilteringEntity, Long> {
    FilteringEntity findByUserId(String userId);
}
