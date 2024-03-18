package org.grabpic.grabpic.subscribe.db.repository;

import org.grabpic.grabpic.subscribe.db.entity.SubscribeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface SubscribeRepository extends JpaRepository<SubscribeEntity, Long> {

    SubscribeEntity findByOwner_UserIdAndSubscribeUser_UserId(long ownerId, long subId);

    boolean existsByOwner_UserIdAndSubscribeUser_UserId(long ownerId, long subId);
}
