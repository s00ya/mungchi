package com.example.mungchi1.dto;

import lombok.Data;

import java.util.List;

@Data
public class FilteringRequest {
    private String userId;

    private String exercise1;

    private String exercise2;

    private String exercise3;

    private List<String> date;

    private List<String> time;

    private String userMbti;
}
