package org.grabpic.grabpic.gallery.db.dto;

import lombok.*;
import org.grabpic.grabpic.encyclopedia.db.entity.EncyclopediaEntity;

@Getter
@Setter
@ToString
@AllArgsConstructor
public class EncyLogCountDTO {

    private EncyclopediaEntity encyclopedia;
    private long count;
}
