package org.grabpic.grabpic.encyclopedia.db.dto;

import jakarta.persistence.*;
import lombok.*;
import org.grabpic.grabpic.user.db.entity.User;

import java.time.LocalDate;

@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
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
