package org.grabpic.grabpic.encyclopedia.db.dto;

import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Setter
@Getter
@ToString
public class InfoDTO {


    private long encyclopediaId;

    //개체 정보
    private String name;
    private String species;
    private String genus;
    private String familia;
    private String ordo;

    //상세 설명
    private String summary;
    private String title1;
    private String content1;
    private String title2;
    private String content2;
    private String title3;
    private String content3;


    //수집정보
    private LocalDateTime registDateTime;
    private String memo;
    private double latitude;
    private double longitude;
    private String address;
    private String imageUrl;
    private String shortsVideoUrl;

}
