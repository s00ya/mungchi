package com.example.mungchi1.service;

import com.example.mungchi1.entity.UserInfoEntity;
import com.example.mungchi1.repository.UserInfoRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserInfoService {
    @Autowired
    private UserInfoRepository userInfoRepository;

    @Transactional
    public void saveUserInfo(UserInfoEntity userInfo) {
        userInfoRepository.save(userInfo);
    }
}

