package org.grabpic.grabpic.encyclopedia.db.entity;

import jakarta.persistence.*;
import lombok.*;
import org.grabpic.grabpic.biologyList.db.entity.BiologyListEntity;
import org.grabpic.grabpic.user.db.entity.UserEntity;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity( name = "encyclopedia" )
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EncyclopediaEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    // PK
    private long encyclopediaId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID")
    private UserEntity user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "BIOLOGY_LIST_ID")
    private BiologyListEntity biologyList;

    private LocalDateTime registDateTime;
    private String content;
    private double latitude;
    private double longitude;
    private String address;
    private String imageUrl;
    private String thumbnailImageUrl;
    @Setter
    private String shortsVideoUrl;

}
