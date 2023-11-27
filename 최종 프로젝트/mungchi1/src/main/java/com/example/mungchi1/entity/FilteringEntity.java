package com.example.mungchi1.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "filtering")
@Data
public class FilteringEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "fi_code")
    private Long fiCode;

    @Column(name = "user_id")
    private String userId;

    @Column(name = "exercise1")
    private String exercise1;

    @Column(name = "exercise2")
    private String exercise2;

    @Column(name = "exercise3")
    private String exercise3;

    @Column(name = "date")
    private String date;

    @Column(name = "time")
    private String time;

    @Column(name = "user_mbti")
    private String userMbti;
}

