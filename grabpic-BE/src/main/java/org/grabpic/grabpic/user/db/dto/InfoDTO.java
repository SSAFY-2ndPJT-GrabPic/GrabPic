package org.grabpic.grabpic.user.db.dto;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

import java.time.LocalDate;

@Setter
@Getter
@ToString
public class InfoDTO {

    private long userId;
    // 로그인용 이메일 중복X
    private String email;
    private String nickname;
    private String name;
    private String provider;
    private LocalDate birth;
    private String gender;
    private String profileImage;
    private long subsCount;
    private long mySubsCount;
    private long collectCount;

}
