package org.grabpic.grabpic.encyclopedia.db.dto;

import lombok.*;

@Setter
@Getter
@ToString
@NoArgsConstructor
@AllArgsConstructor
public class InfoPreviewDTO {

    private long encyclopediaId;
    private String name;
    private String thumbnailImageUrl;
}
