package org.grabpic.grabpic.encyclopedia.service;

import lombok.RequiredArgsConstructor;
import org.grabpic.grabpic.biologyList.db.entity.BiologyListEntity;
import org.grabpic.grabpic.encyclopedia.db.dto.CollectionRegistDTO;
import org.grabpic.grabpic.encyclopedia.db.dto.GalleryPostDTO;
import org.grabpic.grabpic.encyclopedia.db.dto.InfoDTO;
import org.grabpic.grabpic.encyclopedia.db.dto.InfoPreviewDTO;
import org.grabpic.grabpic.encyclopedia.db.entity.EncyclopediaEntity;
import org.grabpic.grabpic.encyclopedia.db.repository.EncyclopediaRepository;
import org.grabpic.grabpic.user.config.JWTUtil;
import org.grabpic.grabpic.user.db.entity.UserEntity;
import org.grabpic.grabpic.user.db.repository.UserRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EncyclopediaServiceImpl implements EncyclopediaService{

    private final EncyclopediaRepository encyclopediaRepository;
    private final JWTUtil jwtUtil;
    private final UserRepository userRepository;

    @Override
    public List<InfoPreviewDTO> previewInfo(long userId) {
        List<EncyclopediaEntity> encyclopediaList = encyclopediaRepository.findByUser_UserId(userId);
        List<InfoPreviewDTO> infoPreviewDTOList = new ArrayList<>();
        for (EncyclopediaEntity encyclopedia : encyclopediaList) {
            InfoPreviewDTO infoPreviewDTO = new InfoPreviewDTO();
            infoPreviewDTO.setEncyclopediaId(encyclopedia.getEncyclopediaId());
            infoPreviewDTO.setName(encyclopedia.getBiologyList().getName());
            infoPreviewDTO.setThumbnailImageUrl(encyclopedia.getThumbnailImageUrl());

            infoPreviewDTOList.add(infoPreviewDTO);
        }

        return infoPreviewDTOList;
    }

    @Override
    public void collectionRegist(CollectionRegistDTO collectionRegistDTO, String token) {
        long userId = jwtUtil.getUserId(token);

        EncyclopediaEntity encyclopedia = EncyclopediaEntity.builder()
                //로그인된 사용자의 key값을 가져와서 등록
                .user(UserEntity.builder().userId(userId).build())
                //보내준 데이터에서 id 추출
                .biologyList(BiologyListEntity.builder().BiologyListId(collectionRegistDTO.getBiologyId()).build())
                //등록 날짜
                .registDateTime(collectionRegistDTO.getRegistDateTime())
                //위도
                .latitude(collectionRegistDTO.getLatitude())
                //경도
                .longitude(collectionRegistDTO.getLongitude())
                //주소
                .address(collectionRegistDTO.getAddress())
                //메모
                .content(collectionRegistDTO.getContent())
                //이미지 Url
                .imageUrl(collectionRegistDTO.getImageUrl())
                .build();

        UserEntity user = userRepository.findById(userId).get();
        user.increaseCollectCount();
        userRepository.save(user);

        encyclopediaRepository.save(encyclopedia);
    }

    @Override
    public InfoDTO collectionInfo(long encyclopediaId) {
        EncyclopediaEntity encyclopedia = encyclopediaRepository.findByEncyclopediaId(encyclopediaId);
        InfoDTO infoDTO = new InfoDTO();

        // 등록된 정보의 PK값
        infoDTO.setEncyclopediaId(encyclopediaId);

        //개체 이름
        infoDTO.setName(encyclopedia.getBiologyList().getName());
        //개체 목과속종
        infoDTO.setSpecies(encyclopedia.getBiologyList().getSpecies());
        infoDTO.setGenus(encyclopedia.getBiologyList().getGenus());
        infoDTO.setFamilia(encyclopedia.getBiologyList().getFamilia());
        infoDTO.setOrdo(encyclopedia.getBiologyList().getOrdo());

        //개체 정보
        infoDTO.setContent(encyclopedia.getBiologyList().getContent());

        //개체 등록일자
        infoDTO.setRegistDateTime(encyclopedia.getRegistDateTime());

        //개체 등록시 적은 메모
        infoDTO.setMemo(encyclopedia.getContent());

        //수집 위도경도
        infoDTO.setLatitude(encyclopedia.getLatitude());
        infoDTO.setLongitude(encyclopedia.getLongitude());

        //위도경도 값 기반으로한 주소
        infoDTO.setAddress(encyclopedia.getAddress());

        //이미지 URL
        infoDTO.setImageUrl(encyclopedia.getImageUrl());
        infoDTO.setShortsVideoUrl(encyclopedia.getShortsVideoUrl());

        return infoDTO;
    }

    //갤러리 게시물 불러오기 구독자 -> 구독 안된자 순서
    @Override
    public List<GalleryPostDTO> galleryList(String token, int page, int limit) {
        // 0페이지 부터 시작하기 때문에
        page--;
        long userId = jwtUtil.getUserId(token);
        long galleryListCount = encyclopediaRepository.countByEncyclopediaDetail(userId);
        Pageable pageable;
        List<EncyclopediaEntity> encyclopediaEntityList;
        List<GalleryPostDTO> galleryPostDTOList = new ArrayList<>();
        // 구독자 게시글이 남아 있는 경우
        if( galleryListCount > ((long) page * limit)) {
            pageable = PageRequest.of(page, limit, Sort.by(Sort.Direction.DESC, "registDateTime"));
            encyclopediaEntityList = encyclopediaRepository.findEncyclopediaDetailsBySubscriberId(userId, pageable);
            for (EncyclopediaEntity encyclopedia : encyclopediaEntityList) {
                GalleryPostDTO galleryPostDTO = new GalleryPostDTO();
                galleryPostDTO.setEncyclopediaId(encyclopedia.getEncyclopediaId());
                galleryPostDTO.setWriterNickName(encyclopedia.getUser().getNickname());
                galleryPostDTO.setRegistDateTime(encyclopedia.getRegistDateTime());
                galleryPostDTO.setName(encyclopedia.getBiologyList().getName());
                galleryPostDTO.setThumnailImageUrl(encyclopedia.getImageUrl());
                galleryPostDTOList.add(galleryPostDTO);
            }
        }
        // 비 구독자 게시글로 채우기
        else {
            int otherPage = page - ((int) galleryListCount / limit) + 1;
            pageable = PageRequest.of(otherPage, limit, Sort.by(Sort.Direction.DESC, "registDateTime"));
            encyclopediaEntityList = encyclopediaRepository.findEncyclopediaDetailsOthers(userId, pageable);
            for (EncyclopediaEntity encyclopedia : encyclopediaEntityList) {
                GalleryPostDTO galleryPostDTO = new GalleryPostDTO();
                galleryPostDTO.setEncyclopediaId(encyclopedia.getEncyclopediaId());
                galleryPostDTO.setWriterNickName(encyclopedia.getUser().getNickname());
                galleryPostDTO.setRegistDateTime(encyclopedia.getRegistDateTime());
                galleryPostDTO.setName(encyclopedia.getBiologyList().getName());
                galleryPostDTO.setThumnailImageUrl(encyclopedia.getImageUrl());
                galleryPostDTOList.add(galleryPostDTO);
            }
        }
        return galleryPostDTOList;
    }
}
