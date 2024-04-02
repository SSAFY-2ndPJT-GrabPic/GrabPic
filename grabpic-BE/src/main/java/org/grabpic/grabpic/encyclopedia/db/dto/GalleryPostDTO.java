package org.grabpic.grabpic.encyclopedia.db.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Getter
@Setter
@ToString
public class GalleryPostDTO {
    private long encyclopediaId;
    private long writerId;
    private String profileImage;
    private String writerNickName;
    private LocalDateTime registDateTime;
    private String thumbnailImageUrl;
    private String name;
}
