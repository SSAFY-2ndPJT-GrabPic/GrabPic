package org.grabpic.grabpic.gallery.db.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.grabpic.grabpic.encyclopedia.db.entity.EncyclopediaEntity;
import org.grabpic.grabpic.user.db.entity.UserEntity;


@Entity( name = "galleryLog" )
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GalleryLogEntity {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        // PK
        private long galleryLogId;

        @ManyToOne(fetch = FetchType.EAGER)
        @JoinColumn(name = "USER_ID")
        private UserEntity user;

        @ManyToOne(fetch = FetchType.EAGER)
        @JoinColumn(name = "ENCYCLOPEDIA_ID")
        private EncyclopediaEntity encyclopedia;
}
