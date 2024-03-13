package org.grabpic.grabpic.biologyList.db.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BiologyList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    // PK
    private long BiologyListId;
    private String species;
    private String genus;
    private String familia;
    private String ordo;
    private String classis;
    private String name;
    private String content;
    private String imageThumnail;
    private String imageDetail;

}
