package org.grabpic.grabpic.user.db.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@Getter
@AllArgsConstructor
@RedisHash(value = "EmailCode", timeToLive = 300)
public class EmailCodeEntity {
    @Id
    private String email;
    private int code;
}
