package org.grabpic.grabpic.user.db.repository;

import org.grabpic.grabpic.user.db.dto.InfoDTO;
import org.grabpic.grabpic.user.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    Boolean existsByEmail(String email);
    //username을 받아 DB 테이블에서 회원을 조회하는 메소드 작성
    User findByEmail(String email);
    Boolean existsByNickname(String nickname);

    @Query("SELECT new org.grabpic.grabpic.user.db.dto.InfoDTO(u.userId, u.email, u.nickname, u.name, u.birth, u.gender, u.profileImage, u.subsCount) FROM User u WHERE u.userId = :id")
    InfoDTO findInfoDTOById(@Param("id") Long id);
}
