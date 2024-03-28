package org.grabpic.grabpic.biologyList.db.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class RegistInfoDTO {

    private long biologyListId;
    private String ordo;
    private String familia;
    private String genus;
    private String species;
    private String name;
    private String summary;
    private String content;
    private String imageDetail;
}
