package com.example.mungchi1.repository;

import com.example.mungchi1.entity.UserInfoEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserInfoRepository extends JpaRepository<UserInfoEntity, Long> {
    UserInfoEntity findByUserId(String userId);
}

