package org.grabpic.grabpic.biologyList.db.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.*;

@Entity( name = "biologyList" )
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BiologyListEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    // PK
    private long biologyListId;
    private String ordo;
    private String familia;
    private String genus;
    private String species;
    private String name;
    private String summary;
    private String content;
    private String imageThumbnail;
    private String imageDetail;

}
