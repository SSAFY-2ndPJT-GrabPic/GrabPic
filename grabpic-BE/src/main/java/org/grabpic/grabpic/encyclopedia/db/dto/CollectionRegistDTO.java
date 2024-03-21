package org.grabpic.grabpic.encyclopedia.db.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;

@Getter
@Setter
@ToString
public class CollectionRegistDTO {

    private long biologyId;
    private LocalDate registDate;
    private double latitude;
    private double longitude;
    private String address;
    private String content;
    private String imageUrl;
}
