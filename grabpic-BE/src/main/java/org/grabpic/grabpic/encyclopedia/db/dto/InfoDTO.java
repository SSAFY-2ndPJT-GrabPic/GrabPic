package org.grabpic.grabpic.encyclopedia.db.dto;

import lombok.*;

import java.time.LocalDate;

@Setter
@Getter
@ToString
public class InfoDTO {


    private long encyclopediaId;
    private long userId;
//    private long biologyListId;

    private LocalDate registDate;
    private String content;
    private double latitude;
    private double longitude;
    private String ImageUrl;
//    private String thumbnailImageUrl;
    private String shortVideoUrl;

}
