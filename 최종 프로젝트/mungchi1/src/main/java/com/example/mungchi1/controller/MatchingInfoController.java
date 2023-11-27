package com.example.mungchi1.controller;

import com.example.mungchi1.repository.MatchingInfoRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/matching")
public class MatchingInfoController {
    @Autowired
    private MatchingInfoRepository matchingInfoRepository;

    @PostMapping("/userinfo")
    public ResponseEntity<List<Map<String, Object>>> getUsersWithFilteringInfo(@RequestBody Map<String, List<String>> requestBody){

        List<String> userIds = requestBody.get("userIds");

        if (userIds == null || userIds.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        List<Object[]> userFilteringInfo = matchingInfoRepository.getUsersWithFilteringInfo(userIds);

        // JSON으로 변환
        List<Map<String, Object>> jsonResults = new LinkedList<>();
        for (Object[] result : userFilteringInfo) {
            Map<String, Object> jsonMap = new LinkedHashMap<>();
            jsonMap.put("userId", result[0]);
            jsonMap.put("userNick", result[1]);
            jsonMap.put("userAge", result[2]);
            jsonMap.put("userSex", result[3]);
            jsonMap.put("exercise1", result[4]);
            jsonMap.put("exercise2", result[5]);
            jsonMap.put("exercise3", result[6]);
            jsonMap.put("date", result[7]);
            jsonMap.put("time", result[8]);
            jsonMap.put("userMbti", result[9]);
            jsonResults.add(jsonMap);
        }

        return new ResponseEntity<>(jsonResults, HttpStatus.OK);
    }
}
