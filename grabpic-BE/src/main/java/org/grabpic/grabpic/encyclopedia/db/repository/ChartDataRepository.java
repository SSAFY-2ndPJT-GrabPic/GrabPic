package org.grabpic.grabpic.encyclopedia.db.repository;

import org.grabpic.grabpic.encyclopedia.db.entity.ChartDataEntity;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ChartDataRepository extends MongoRepository<ChartDataEntity, Long> {
    ChartDataEntity findById(long userId);
}
