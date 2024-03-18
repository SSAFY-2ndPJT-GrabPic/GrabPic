package org.grabpic.grabpic.guestbook.db.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@ToString
public class LoadBookDTO {

    private long guestBookId;
    private String writerNickName;
    private String content;
    private LocalDateTime registDateTime;
}
