package org.grabpic.grabpic.map.db.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class AroundCheckDTO {

    private double latitude;
    private double longitude;
    private double range;
    private int page;
    private int limit;
    private int sort;

}
