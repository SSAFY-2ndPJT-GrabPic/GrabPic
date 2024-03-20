package org.grabpic.grabpic.encyclopedia.db.repository;

import org.grabpic.grabpic.encyclopedia.db.entity.EncyclopediaEntity;
import org.springframework.data.jpa.repository.JpaRepository;


import java.util.List;

public interface EncyclopediaRepository extends JpaRepository<EncyclopediaEntity, Long> {

    List<EncyclopediaEntity> findByUser_UserId(long id);
    EncyclopediaEntity findByEncyclopediaId(long id);

}
