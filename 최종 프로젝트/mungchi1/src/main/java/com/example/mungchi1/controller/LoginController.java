package com.example.mungchi1.controller;

import com.example.mungchi1.entity.UserInfoEntity;
import com.example.mungchi1.repository.UserInfoRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/user")
@CrossOrigin
public class LoginController {
    @Autowired
    private UserInfoRepository userInfoRepository;

    @GetMapping("/getCookie")
    public String getCookieValue(@CookieValue(value = "userId", defaultValue = "defaultCookieValue") String myCookie, HttpServletRequest request) {
        // 쿠키 값을 읽어 문자열로 반환
        return myCookie;
    }

    @PostMapping("/login2")
    public ResponseEntity<String> login(@RequestBody Map<String, String> requestBody, HttpServletResponse response) {
        String userId = requestBody.get("userId");
        String userPw = requestBody.get("userPw");

        UserInfoEntity user = userInfoRepository.findByUserId(userId);

        if (user != null && user.getUserPw().equals(userPw)) {
            Cookie cookie = new Cookie("userId", userId);
            cookie.setPath("/");
            cookie.setDomain("localhost");
            response.addCookie(cookie);


            System.out.println("쿠키 값: " + userId);

            return ResponseEntity.ok("로그인 성공: " + userId);
            //.header("Set-Cookie", "userId=" + userId)
            //.body("로그인 성공: " + userId);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 실패");
        }
    }
}

