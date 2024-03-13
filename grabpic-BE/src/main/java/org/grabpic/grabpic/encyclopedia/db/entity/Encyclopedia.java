package org.grabpic.grabpic.encyclopedia.db.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.grabpic.grabpic.biologyList.db.entity.BiologyList;
import org.grabpic.grabpic.user.db.entity.User;

import java.time.LocalDate;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Encyclopedia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    // PK
    private long encyclopediaId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "USER_ID")
    private User user;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "BIOLOGY_LIST_ID")
    private BiologyList biologyList;

    private LocalDate registDate;
    private String content;
    private double latitude;
    private double longitude;
    private String ImageUrl;
    private String thumbnailImageUrl;
    private String shortVideoUrl;

}
