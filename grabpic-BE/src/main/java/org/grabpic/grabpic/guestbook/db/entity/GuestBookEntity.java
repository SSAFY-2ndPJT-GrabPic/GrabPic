package org.grabpic.grabpic.guestbook.db.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.grabpic.grabpic.user.db.entity.UserEntity;

import java.time.LocalDateTime;

@Entity( name = "guestBook" )
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GuestBookEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    // PK
    private long guestBookId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "OWNER_ID")
    private UserEntity owner;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "WRITER_ID")
    private UserEntity writer;

    private String content;
    private LocalDateTime registDateTime;

}
