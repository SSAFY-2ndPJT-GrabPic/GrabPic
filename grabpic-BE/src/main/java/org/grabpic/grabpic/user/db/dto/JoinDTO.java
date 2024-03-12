package org.grabpic.grabpic.user.db.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Setter
@Getter
@ToString
public class JoinDTO {

    private String email;
    private String password;
}
