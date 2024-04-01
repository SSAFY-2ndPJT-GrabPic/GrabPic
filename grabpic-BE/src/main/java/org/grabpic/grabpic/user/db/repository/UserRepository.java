package org.grabpic.grabpic.user.db.repository;

import org.grabpic.grabpic.user.db.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<UserEntity, Long> {

    UserEntity findByUserId(long userId);
    Boolean existsByEmail(String email);
    //username을 받아 DB 테이블에서 회원을 조회하는 메소드 작성
    UserEntity findByEmail(String email);
    Boolean existsByNickname(String nickname);

}
