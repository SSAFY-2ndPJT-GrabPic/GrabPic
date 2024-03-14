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

    private long user_id;
    // 로그인용 이메일 중복X
    private String email;
    private String nickname;
    private String name;
    private LocalDate birth;
    private String gender;
    private String profileImage;
    private long subsCount;

}
