package org.grabpic.grabpic.subscribe.db.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class RelationshipListDTO {

    private long userId;
    private String nickname;
    private String profileImage;
}
