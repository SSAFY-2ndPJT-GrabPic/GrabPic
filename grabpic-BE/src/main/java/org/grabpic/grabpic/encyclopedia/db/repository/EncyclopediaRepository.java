package org.grabpic.grabpic.encyclopedia.db.repository;

import org.grabpic.grabpic.encyclopedia.db.dto.GalleryPostDTO;
import org.grabpic.grabpic.encyclopedia.db.entity.EncyclopediaEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EncyclopediaRepository extends JpaRepository<EncyclopediaEntity, Long> {

    List<EncyclopediaEntity> findByUser_UserId(long id);
    EncyclopediaEntity findByEncyclopediaId(long id);

    @Query("SELECT e FROM encyclopedia e WHERE " +
            "(6371 * FUNCTION('acos', FUNCTION('cos', FUNCTION('radians', :latitude)) * FUNCTION('cos', FUNCTION('radians', e.latitude)) " +
            "* FUNCTION('cos', FUNCTION('radians', e.longitude) - FUNCTION('radians', :longitude)) + " +
            "FUNCTION('sin', FUNCTION('radians', :latitude)) * FUNCTION('sin', FUNCTION('radians', e.latitude)))) < :range")
    Page<EncyclopediaEntity> findAround(@Param("latitude") double latitude, @Param("longitude") double longitude, @Param("range") double range, Pageable pageable);

//    @Query("SELECT e.encyclopediaId as encyclopediaId, e.user.nickname as writerNickName, e.registDateTime as registDateTime, e.thumbnailImageUrl as thumnailImageUrl, e.biologyList.name as name FROM encyclopedia e JOIN subscribe s ON e.user.userId = s.owner.userId WHERE s.subscribeUser.userId = :id ORDER BY e.registDateTime DESC")
//    List<GalleryPostDTO> findEncyclopediaDetailsBySubscriberId(@Param("thatId") Long id, Pageable pageable);

}
