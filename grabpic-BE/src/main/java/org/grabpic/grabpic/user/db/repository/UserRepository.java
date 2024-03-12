package org.grabpic.grabpic.user.db.repository;

import org.grabpic.grabpic.user.db.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {

    Boolean existsByEmail(String email);

    //username을 받아 DB 테이블에서 회원을 조회하는 메소드 작성
    User findByEmail(String email);
}
