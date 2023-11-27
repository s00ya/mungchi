package com.example.mungchi1.repository;

import com.example.mungchi1.entity.UserInfoEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MatchingInfoRepository extends JpaRepository<UserInfoEntity, String> {
    @Query("SELECT u.userId, u.userNick, u.userAge, u.userSex, f.exercise1, f.exercise2, f.exercise3, f.date, f.time, f.userMbti FROM UserInfoEntity u INNER JOIN FilteringEntity f ON u.userId = f.userId WHERE u.userId IN :userIds")
    List<Object[]> getUsersWithFilteringInfo(@Param("userIds") List<String> userIds);
}
