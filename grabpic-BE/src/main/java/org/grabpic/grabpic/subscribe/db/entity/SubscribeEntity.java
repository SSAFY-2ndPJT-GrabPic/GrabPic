package org.grabpic.grabpic.subscribe.db.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.grabpic.grabpic.user.db.entity.UserEntity;

@Entity( name = "subscribe" )
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SubscribeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    // PK
    private long subscribeId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "OWNER_ID")
    private UserEntity owner;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "SUBSCRIBE_USER_ID")
    private UserEntity subscribeUser;
}
