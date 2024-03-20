package org.grabpic.grabpic.encyclopedia.service;

import lombok.RequiredArgsConstructor;
import org.grabpic.grabpic.biologyList.db.entity.BiologyListEntity;
import org.grabpic.grabpic.encyclopedia.db.dto.CollectionRegistDTO;
import org.grabpic.grabpic.encyclopedia.db.dto.InfoDTO;
import org.grabpic.grabpic.encyclopedia.db.dto.InfoPreviewDTO;
import org.grabpic.grabpic.encyclopedia.db.entity.EncyclopediaEntity;
import org.grabpic.grabpic.encyclopedia.db.repository.EncyclopediaRepository;
import org.grabpic.grabpic.user.config.JWTUtil;
import org.grabpic.grabpic.user.db.entity.UserEntity;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EncyclopediaServiceImpl implements EncyclopediaService{

    private final EncyclopediaRepository encyclopediaRepository;
    private final JWTUtil jwtUtil;

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
                .registDate(collectionRegistDTO.getRegistDate())
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
        infoDTO.setRegistDate(encyclopedia.getRegistDate());

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
}
