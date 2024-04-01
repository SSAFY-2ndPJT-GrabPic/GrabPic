package org.grabpic.grabpic.guestbook.db.repository;

import org.grabpic.grabpic.guestbook.db.entity.GuestBookEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GuestBookRepository extends JpaRepository<GuestBookEntity, Long> {

    List<GuestBookEntity> findByOwner_UserId(long ownerId, Pageable pageable);
    GuestBookEntity findByGuestBookId(long guestBookId);

    long countByOwner_UserId(long ownerId);

}
