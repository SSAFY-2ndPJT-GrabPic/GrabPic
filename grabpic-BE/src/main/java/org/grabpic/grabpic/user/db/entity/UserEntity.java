package org.grabpic.grabpic.user.db.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

import java.time.LocalDate;

@Entity(name = "user")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    // PK
    private long userId;

    // 로그인용 이메일 중복X
    private String email;

    @Setter
    private String password;
    private String provider;
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
    private boolean isDeleted;

    //구독자 수 증가 메소드
    public void increaseSubsCount() {
        this.subsCount++;
    }

    //구독자수 감소 메소드
    public void decreaseSubsCount() {
        this.subsCount--;
    }

}