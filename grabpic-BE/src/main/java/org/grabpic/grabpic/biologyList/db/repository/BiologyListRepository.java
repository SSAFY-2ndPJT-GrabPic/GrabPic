package org.grabpic.grabpic.biologyList.db.repository;

import org.grabpic.grabpic.biologyList.db.entity.BiologyListEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BiologyListRepository extends JpaRepository<BiologyListEntity, Long> {

    BiologyListEntity findByBiologyListId(long biologyListId);
}
