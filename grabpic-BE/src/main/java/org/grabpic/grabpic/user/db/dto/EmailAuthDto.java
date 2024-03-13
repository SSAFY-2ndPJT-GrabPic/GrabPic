package org.grabpic.grabpic.user.db.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class EmailAuthDto {

    private String email;
    private int type;
    private int code;

}
