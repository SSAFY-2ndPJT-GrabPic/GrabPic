package org.grabpic.grabpic.subscribe.db.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class SubscribeInOutDTO {

    // error나 ok 상황을 구분하기 위한 상수
    private int actionTypeForBackEnd;
    private long ownerSubCount;

}
