package org.grabpic.grabpic.encyclopedia.db.repository;

import org.grabpic.grabpic.encyclopedia.db.dto.GalleryPostDTO;
import org.grabpic.grabpic.encyclopedia.db.entity.EncyclopediaEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;

import java.util.List;
import java.util.Optional;

public interface EncyclopediaRepository extends JpaRepository<EncyclopediaEntity, Long>, JpaSpecificationExecutor<EncyclopediaEntity> {

    List<EncyclopediaEntity> findByUser_UserId(long id);
    EncyclopediaEntity findByEncyclopediaId(long id);

    @Query("SELECT e FROM encyclopedia e WHERE " +
            "(6371 * FUNCTION('acos', FUNCTION('cos', FUNCTION('radians', :latitude)) * FUNCTION('cos', FUNCTION('radians', e.latitude)) " +
            "* FUNCTION('cos', FUNCTION('radians', e.longitude) - FUNCTION('radians', :longitude)) + " +
            "FUNCTION('sin', FUNCTION('radians', :latitude)) * FUNCTION('sin', FUNCTION('radians', e.latitude)))) < :range")
    Page<EncyclopediaEntity> findAround(@Param("latitude") double latitude, @Param("longitude") double longitude, @Param("range") double range, Pageable pageable);


    @Query(value = "SELECT a.encyclopedia_id, a.user_id, a.biology_list_id, a.regist_date_time, a.content, a.latitude, a.longitude, a.address, a.image_url, a.thumbnail_image_url, a.shorts_video_url " +
            "FROM " +
            "(SELECT * FROM grabpic.encyclopedia e " +
            "WHERE (6371*acos(cos(radians(:latitude))*cos(radians(e.latitude))*cos(radians(e.longitude) - radians(:longitude)) + sin(radians(:latitude)) * sin(radians(e.latitude)))) < :range) a " +
            "JOIN " +
            "(SELECT biology_list_id, COUNT(*) as cnt FROM grabpic.encyclopedia e " +
            "WHERE (6371*acos(cos(radians(:latitude))*cos(radians(e.latitude))*cos(radians(e.longitude) - radians(:longitude)) + sin(radians(:latitude)) * sin(radians(e.latitude)))) < :range GROUP BY e.biology_list_id) b " +
            "ON a.biology_list_id = b.biology_list_id"
            , countQuery = "SELECT COUNT(*) FROM grabpic.encyclopedia e WHERE (6371*acos(cos(radians(:latitude))*cos(radians(e.latitude))*cos(radians(e.longitude) - radians(:longitude)) + sin(radians(:latitude)) * sin(radians(e.latitude)))) < :range"
            , nativeQuery = true
    )
    Page<EncyclopediaEntity> findAroundOrderByRare(@Param("latitude") double latitude, @Param("longitude") double longitude, @Param("range") double range, Pageable pageable);

    @Query("SELECT COUNT(*) FROM encyclopedia e JOIN subscribe s ON e.user.userId = s.owner.userId WHERE s.subscribeUser.userId = :id")
    long countByEncyclopediaDetail(@Param("id") Long id);

    @Query("SELECT e FROM encyclopedia e JOIN subscribe s ON e.user.userId = s.owner.userId WHERE s.subscribeUser.userId = :id")
    List<EncyclopediaEntity> findEncyclopediaDetailsBySubscriberId(@Param("id") Long id, Pageable pageable);

    @Query("SELECT e FROM encyclopedia e JOIN subscribe s ON e.user.userId = s.owner.userId WHERE s.subscribeUser.userId != :id and e.user.userId != :id")
    List<EncyclopediaEntity> findEncyclopediaDetailsOthers(@Param("id") Long id, Pageable pageable);

    @Query("SELECT e FROM encyclopedia e where e.user.userId != :userId ORDER BY RAND()")
    List<EncyclopediaEntity> randomEncy(@Param("userId") long userId, Pageable pageable);

    Page<EncyclopediaEntity> findAll(Specification<EncyclopediaEntity> spec, Pageable pageable);

    List<EncyclopediaEntity> findAll(Specification<EncyclopediaEntity> spec);
//    @Query("SELECT e.encyclopediaId as encyclopediaId, e.user.nickname as writerNickName, e.registDateTime as registDateTime, e.thumbnailImageUrl as thumbnailImageUrl, e.biologyList.name as name FROM encyclopedia e JOIN subscribe s ON e.user.userId = s.owner.userId WHERE s.subscribeUser.userId = :id")
//    List<GalleryPostDTO> findEncyclopediaDetailsBySubscriberId(@Param("id") Long id, Pageable pageable);
//
//    @Query("SELECT e.encyclopediaId as encyclopediaId, e.user.nickname as writerNickName, e.registDateTime as registDateTime, e.thumbnailImageUrl as thumbnailImageUrl, e.biologyList.name as name FROM encyclopedia e JOIN subscribe s ON e.user.userId = s.owner.userId WHERE s.subscribeUser.userId != :id and e.user.userId != :id")
//    List<GalleryPostDTO> findEncyclopediaDetailsOthers(@Param("id") Long id, Pageable pageable);
}
