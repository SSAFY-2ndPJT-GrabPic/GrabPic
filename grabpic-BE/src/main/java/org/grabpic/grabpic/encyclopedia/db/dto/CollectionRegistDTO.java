package org.grabpic.grabpic.encyclopedia.db.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@ToString
public class CollectionRegistDTO {

    private long biologyId;
    private double latitude;
    private double longitude;
    private String address;
    private String content;
}
