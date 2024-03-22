package org.grabpic.grabpic.map.db.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;

@Getter
@Setter
@ToString
public class AroundInfoDTO {

    private long encyclopedia;
    private String name;
    private LocalDate registDate;
    private String address;
    private double latitude;
    private double longitude;
    private int rareCount;
}
