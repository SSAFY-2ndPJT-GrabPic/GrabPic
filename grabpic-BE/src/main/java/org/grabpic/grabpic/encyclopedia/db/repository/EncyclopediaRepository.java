package org.grabpic.grabpic.encyclopedia.db.repository;

import org.grabpic.grabpic.encyclopedia.db.dto.InfoPreviewDTO;
import org.grabpic.grabpic.encyclopedia.db.entity.Encyclopedia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EncyclopediaRepository extends JpaRepository<Encyclopedia, Long> {


    List<Encyclopedia> findByUser_UserId(long id);

}
