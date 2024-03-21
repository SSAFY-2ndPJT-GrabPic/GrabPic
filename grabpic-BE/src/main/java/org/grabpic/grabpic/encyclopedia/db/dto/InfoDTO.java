package org.grabpic.grabpic.encyclopedia.db.dto;

import lombok.*;

import java.time.LocalDate;

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
    private String content;


    //수집정보
    private LocalDate registDate;
    private String memo;
    private double latitude;
    private double longitude;
    private String address;
    private String imageUrl;
    private String shortsVideoUrl;

}
