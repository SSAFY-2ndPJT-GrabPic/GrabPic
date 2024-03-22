package org.grabpic.grabpic.user.db.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;

@Setter
@Getter
@ToString
public class JoinDTO {

    private String email;
    private String password;
    private String provider;
    private String nickname;
    private String name;
    private LocalDate birth;
    private String gender;
}
