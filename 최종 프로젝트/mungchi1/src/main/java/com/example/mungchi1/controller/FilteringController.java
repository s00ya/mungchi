package com.example.mungchi1.controller;

import com.example.mungchi1.dto.FilteringRequest;
import com.example.mungchi1.entity.FilteringEntity;
import com.example.mungchi1.repository.FilteringRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/filtering")
public class FilteringController {
    @Autowired
    private FilteringRepository filteringRepository;

    @PostMapping("/save")
    public FilteringEntity saveFilteringData(@RequestBody FilteringRequest request) {
        //사용자 아이디로 필터링 데이터를 가져옴
        String userId = request.getUserId();
        FilteringEntity existingData = filteringRepository.findByUserId(userId);

        if (existingData != null) {
            existingData.setExercise1(request.getExercise1());
            existingData.setExercise2(request.getExercise2());
            existingData.setExercise3(request.getExercise3());
            existingData.setDate(String.join(", ", request.getDate())); // 쉼표로 구분하여 저장
            existingData.setTime(String.join(", ", request.getTime()));   // 쉼표로 구분하여 저장
            existingData.setUserMbti(request.getUserMbti());

            return filteringRepository.save(existingData);
        }else {
            return null;
        }
    }

    @GetMapping("/{userId}")
    public FilteringEntity getUserByUserId(@PathVariable String userId) {
        return filteringRepository.findByUserId(userId);
    }

    @PostMapping("/filteringInfo")
    public ResponseEntity<FilteringEntity> getFilteringInfo(@RequestBody Map<String, String> request) {
        String userId = request.get("userId");
        FilteringEntity filteringEntity = filteringRepository.findByUserId(userId);

        if (filteringEntity != null) {
            return new ResponseEntity<>(filteringEntity, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
