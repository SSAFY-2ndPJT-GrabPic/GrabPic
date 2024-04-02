package org.grabpic.grabpic.gallery.db.repository;

import org.grabpic.grabpic.gallery.db.dto.EncyLogCountDTO;
import org.grabpic.grabpic.gallery.db.entity.GalleryLogEntity;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Objects;

@Repository
public interface GalleryLogRepository extends JpaRepository<GalleryLogEntity, Long> {


    boolean existsByUser_UserIdAndEncyclopedia_EncyclopediaId(long userId, long encyId);


    // @Query("SELECT new com.example.dto.EncyclopediaCountDTO(f.encyclopediaId, COUNT(*)) FROM FeedLog f GROUP BY f.encyclopediaId ORDER BY COUNT(*) DESC")

    //"WHERE NOT EXISTS (SELECT 1 FROM FeedLog f2 WHERE f2.userId = 2 AND f2.encyclopediaId = f.encyclopediaId) " +
    //"WHERE f.encyclopediaId NOT IN (SELECT DISTINCT f2.encyclopediaId FROM FeedLog f2 WHERE f2.userId = 2) " +
    @Query("SELECT new org.grabpic.grabpic.gallery.db.dto.EncyLogCountDTO(g.encyclopedia , COUNT(*)) FROM galleryLog g WHERE g.encyclopedia.encyclopediaId NOT IN (SELECT DISTINCT g2.encyclopedia.encyclopediaId FROM galleryLog g2 WHERE g2.user.userId = :userId) GROUP BY g.encyclopedia.encyclopediaId ORDER BY COUNT(*) DESC")
    List<EncyLogCountDTO> countLog(@Param("userId") Long userId, Pageable pageable);
}
