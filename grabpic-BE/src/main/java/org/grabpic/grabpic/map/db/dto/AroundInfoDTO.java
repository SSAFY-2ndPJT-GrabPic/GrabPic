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
    // 수집한 사람 Id
    private long userId;
    private String name;
    private LocalDateTime registDateTime;
    private String address;
    private double latitude;
    private double longitude;
    private String thumbnailImage;
    private int rareCount;
}
