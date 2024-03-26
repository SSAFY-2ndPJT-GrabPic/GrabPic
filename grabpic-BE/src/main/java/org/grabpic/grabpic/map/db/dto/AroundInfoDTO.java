package org.grabpic.grabpic.map.db.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@ToString
public class AroundInfoDTO {

    private long encyclopedia;
    private String name;
    private LocalDateTime registDateTime;
    private String address;
    private double latitude;
    private double longitude;
    private String thumnailImage;
    private int rareCount;
}
