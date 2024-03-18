package org.grabpic.grabpic.subscribe.service;

import lombok.RequiredArgsConstructor;
import org.grabpic.grabpic.subscribe.db.entity.SubscribeEntity;
import org.grabpic.grabpic.subscribe.db.repository.SubscribeRepository;
import org.grabpic.grabpic.user.config.JWTUtil;
import org.grabpic.grabpic.user.db.entity.UserEntity;
import org.grabpic.grabpic.user.db.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class SubscribeServiceImpl implements SubscribeService{

    private final SubscribeRepository subscribeRepository;
    private final UserRepository userRepository;
    private final JWTUtil jwtUtil;

    //구독하기
    public String subscribeAdd(long userId, String token) {

        String email = jwtUtil.getEmail(token);
        UserEntity user = userRepository.findByEmail(email);

        if(userId == user.getUserId()) {
            //임시조치
            return "구독대상자와 구독하려는 사람이 동일인물";
        }

        // 이미 구독되어 있는지 조회
        if(subscribeRepository.existsByOwner_UserIdAndSubscribeUser_UserId(userId, user.getUserId())) {
            //임시조치
            return "이미 구독되어 있음";
        }


        //구독자 목록 추가
        SubscribeEntity subscribe = SubscribeEntity.builder()
                .owner(UserEntity.builder().userId(userId).build())
                .subscribeUser(UserEntity.builder().userId(user.getUserId()).build())
                .build();
        subscribeRepository.save(subscribe);

        //구독자 수 증가
        UserEntity owner = userRepository.findById(userId).get();
        owner.increaseSubsCount();
        userRepository.save(owner);

        return "ok";
    }

    public String subscribeDel(long userId, String token) {

        String email = jwtUtil.getEmail(token);
        UserEntity user = userRepository.findByEmail(email);

        //구독자 목록 삭제
        SubscribeEntity subscribe = subscribeRepository.findByOwner_UserIdAndSubscribeUser_UserId(userId, user.getUserId());
        if( subscribe == null) {
            //임시조치
            return "삭제하려는 대상이 없음";
        }

        subscribeRepository.delete(subscribe);

        //구독자 수 감소
        Optional<UserEntity> optionalOwner = userRepository.findById(userId);
        if(optionalOwner.isPresent()) {
            UserEntity owner = optionalOwner.get();
            owner.decreaseSubsCount();
            userRepository.save(owner);
            return "ok";
        } else {
            //임시조치
            return "구독하려는 유저를 찾을 수 없음";
        }

    }
}
