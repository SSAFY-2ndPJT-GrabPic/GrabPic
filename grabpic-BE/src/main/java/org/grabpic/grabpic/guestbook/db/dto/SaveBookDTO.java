package org.grabpic.grabpic.guestbook.db.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;

@Getter
@Setter
@ToString
public class SaveBookDTO {

    private long guestBookId;
    private long ownerId;
    private String content;
    private LocalDate registDate;
}
