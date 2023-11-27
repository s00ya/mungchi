package com.example.mungchi1.controller;

import com.example.mungchi1.entity.UserInfoEntity;
import com.example.mungchi1.repository.UserInfoRepository;
import com.example.mungchi1.service.UserInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/users")
public class UserInfoController {
    @Autowired
    private UserInfoService userInfoService;

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody UserInfoEntity userInfo) {
        userInfoService.saveUserInfo(userInfo);
        return ResponseEntity.ok("로그인 성공");
    }

    @Autowired
    private UserInfoRepository userInfoRepository;

    @GetMapping("/getUserInfo/{userId}")
    public UserInfoEntity getUserByUserId(@PathVariable String userId) {
        return userInfoRepository.findByUserId(userId);
    }

    @PostMapping("/myInfo")
    public ResponseEntity<UserInfoEntity> getMyInfo(@RequestBody UserInfoEntity userInfo) {
        UserInfoEntity existingUser = userInfoRepository.findByUserId(userInfo.getUserId());
        if(existingUser != null){
            return ResponseEntity.ok(existingUser);
        } else {
            return ResponseEntity.badRequest().body(null);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UserInfoEntity userInfo) {
        UserInfoEntity existingUser = userInfoRepository.findByUserId(userInfo.getUserId());
        if (existingUser != null && existingUser.getUserPw().equals(userInfo.getUserPw())) {
            String userId = userInfo.getUserId();
            return ResponseEntity.ok(userId);
        } else {
            return ResponseEntity.badRequest().body("로그인 실패");
        }
    }
}










