package org.grabpic.grabpic.gallery.service;


import lombok.RequiredArgsConstructor;
import org.grabpic.grabpic.encyclopedia.db.entity.EncyclopediaEntity;
import org.grabpic.grabpic.encyclopedia.db.repository.EncyclopediaRepository;
import org.grabpic.grabpic.gallery.db.dto.EncyLogCountDTO;
import org.grabpic.grabpic.gallery.db.dto.GalleryPostDTO;
import org.grabpic.grabpic.gallery.db.entity.GalleryLogEntity;
import org.grabpic.grabpic.gallery.db.repository.GalleryLogRepository;
import org.grabpic.grabpic.user.config.JWTUtil;
import org.grabpic.grabpic.user.db.entity.UserEntity;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GalleryServiceImpl implements GalleryService {

    private final JWTUtil jwtUtil;
    private final GalleryLogRepository galleryLogRepository;
    private final EncyclopediaRepository encyclopediaRepository;

    //갤러리 조회시 로그 추가
    @Override
    public void GalleryLogAdd(String token, long encyId) {
        long userId = jwtUtil.getUserId(token);

        // 본 전적이 없을 경우에만 추가
        if(!galleryLogRepository.existsByUser_UserIdAndEncyclopedia_EncyclopediaId(userId, encyId)) {
            GalleryLogEntity galleryLog = GalleryLogEntity.builder()
                    .user(UserEntity.builder().userId(userId).build())
                    .encyclopedia(EncyclopediaEntity.builder().encyclopediaId(encyId).build())
                    .build();

            galleryLogRepository.save(galleryLog);
        }

        //그 외 로직 없음
    }

    @Override
    public HashSet<GalleryPostDTO> recommendGalleryList(String token, int page, int limit) {
        // 1. 후보군 집합 생성 1후보군 = 1페이지
        // 2. 후보군 집합의 수는 가져오는 소재 별 limit/소재의 수
        // 3. HashSet을 이용하여 중복제거
        // 4. 추천 게시물이 끝나면 어떻게 되나
        long userId = jwtUtil.getUserId(token);
        int set = 3;
        System.out.println("확인1");
        Pageable subPage = PageRequest.of(page, limit/set, Sort.by(Sort.Direction.DESC, "registDateTime"));
        List<EncyclopediaEntity> subList = encyclopediaRepository.findEncyclopediaDetailsBySubscriberId(userId, subPage);
        Pageable logPage = PageRequest.of(page, limit/set);
        List<EncyLogCountDTO> logList = galleryLogRepository.countLog(userId, logPage);
        Pageable ranPage = PageRequest.of(0, limit/set);
        List<EncyclopediaEntity> ranList = encyclopediaRepository.randomEncy(userId, ranPage);
        System.out.println("확인2");
        HashSet<GalleryPostDTO> setup = new HashSet<>();

        for (EncyclopediaEntity sub : subList) {
            setup.add(postSetting(sub));
        }
        for (EncyLogCountDTO log : logList) {
            setup.add(postSetting(log.getEncyclopedia()));
        }
        for (EncyclopediaEntity ran : ranList) {
            setup.add(postSetting(ran));
        }
        System.out.println("확인3");

        return setup;
    }

    private GalleryPostDTO postSetting(EncyclopediaEntity encyclopedia) {
        GalleryPostDTO galleryPostDTO = new GalleryPostDTO();
        galleryPostDTO.setEncyclopediaId(encyclopedia.getEncyclopediaId());
        galleryPostDTO.setName(encyclopedia.getBiologyList().getName());
        galleryPostDTO.setWriterId(encyclopedia.getUser().getUserId());
        galleryPostDTO.setWriterNickName(encyclopedia.getUser().getNickname());
        galleryPostDTO.setProfileImage(encyclopedia.getUser().getProfileImage());
        galleryPostDTO.setRegistDateTime(encyclopedia.getRegistDateTime());
        galleryPostDTO.setThumbnailImageUrl(encyclopedia.getImageUrl());
        return  galleryPostDTO;
    }


}
