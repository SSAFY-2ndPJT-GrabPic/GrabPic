package org.grabpic.grabpic.user.db.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Setter
@Getter
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    // PK
    private long user_id;

    // 로그인용 이메일 중복X
    private String email;

    private String password;
    private String nickname;
    private String name;
    private LocalDate birth;
    private String gender;
    private String profileImage;
    private String role;
    private long subsCount;
    //탈퇴 날짜
    private LocalDate validateDate;
    //탈퇴 여부, mysql default는 false(tinyint 0)
    private boolean deleated;
}