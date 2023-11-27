package com.example.mungchi1.entity;

import jakarta.persistence.*;
import lombok.Data;


@Entity
@Data
@Table(name = "user_info")
public class UserInfoEntity {
    @Id
    @Column(name = "user_id")
    private String userId;

    @Column(name = "user_nick")
    private String userNick;

    @Column(name = "user_age")
    private String userAge;

    @Column(name = "user_sex")
    private String userSex;

    @Column(name = "password")
    private String userPw;

    @Column(name = "user_name")
    private String userName;

}


