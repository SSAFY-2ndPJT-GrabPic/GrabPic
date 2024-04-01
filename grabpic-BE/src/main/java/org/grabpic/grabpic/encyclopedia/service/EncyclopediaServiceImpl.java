package org.grabpic.grabpic.encyclopedia.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.grabpic.grabpic.biologyList.db.entity.BiologyListEntity;
import org.grabpic.grabpic.biologyList.db.repository.BiologyListRepository;
import org.grabpic.grabpic.encyclopedia.db.dto.*;
import org.grabpic.grabpic.encyclopedia.db.entity.ChartDataEntity;
import org.grabpic.grabpic.encyclopedia.db.entity.EncyclopediaEntity;
import org.grabpic.grabpic.encyclopedia.db.repository.ChartDataRepository;
import org.grabpic.grabpic.encyclopedia.db.repository.EncyclopediaRepository;
import org.grabpic.grabpic.encyclopedia.db.repository.EncyclopediaSpecification;
import org.grabpic.grabpic.user.config.JWTUtil;
import org.grabpic.grabpic.user.db.entity.UserEntity;
import org.grabpic.grabpic.user.db.repository.UserRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class EncyclopediaServiceImpl implements EncyclopediaService{

    private final EncyclopediaRepository encyclopediaRepository;
    private final JWTUtil jwtUtil;
    private final UserRepository userRepository;
    private final BiologyListRepository biologyListRepository;
    private final ChartDataRepository chartDataRepository;

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
    public void addChartData(CollectionRegistDTO collectionRegistDTO, String token){
        log.info("addChartData : " + collectionRegistDTO.toString());
        long biologyId = collectionRegistDTO.getBiologyId();
        long userId = jwtUtil.getUserId(token);
        System.out.println(biologyId);

        BiologyListEntity entity = biologyListRepository.findById(biologyId).get();
        ChartDataEntity data;
        if(chartDataRepository.existsById(userId)){
            data = chartDataRepository.findById(userId);
        }else{
            data = new ChartDataEntity();
            data.setId(userId);
        }

        Map<String, NodeDto> nodeMap = data.getNodeData();
        Map<String, EdgeDto> edgeMap = data.getEdgeData();

        nodeMap.put(entity.getOrdo(), new NodeDto(entity.getOrdo(), entity.getOrdo()));
        nodeMap.put(entity.getFamilia(), new NodeDto(entity.getFamilia(), entity.getFamilia()));
        nodeMap.put(entity.getGenus(), new NodeDto(entity.getGenus(), entity.getGenus()));
        nodeMap.put(entity.getSpecies(), new NodeDto(entity.getSpecies(), entity.getSpecies()));
        edgeMap.put(entity.getSpecies()+"간선", new EdgeDto(entity.getSpecies()+"간선", entity.getSpecies(), entity.getGenus()));
        edgeMap.put(entity.getGenus()+"간선", new EdgeDto(entity.getGenus()+"간선", entity.getGenus(), entity.getFamilia()));
        edgeMap.put(entity.getFamilia()+"간선", new EdgeDto(entity.getFamilia()+"간선", entity.getFamilia(), entity.getOrdo()));

        data.setNodeData(nodeMap);
        data.setEdgeData(edgeMap);
        log.info("End of addChartData");
        chartDataRepository.save(data);
    }

    @Override
    public EncyclopediaEntity collectionRegist(CollectionRegistDTO collectionRegistDTO, String token) {
        log.info("RegistCollection");
        long userId = jwtUtil.getUserId(token);

        EncyclopediaEntity encyclopedia = EncyclopediaEntity.builder()
                //로그인된 사용자의 key값을 가져와서 등록
                .user(UserEntity.builder().userId(userId).build())
                //보내준 데이터에서 id 추출
                .biologyList(BiologyListEntity.builder().biologyListId(collectionRegistDTO.getBiologyId()).build())
                //등록 날짜
                .registDateTime(LocalDateTime.now(ZoneId.of("Asia/Seoul")))
                //위도
                .latitude(collectionRegistDTO.getLatitude())
                //경도
                .longitude(collectionRegistDTO.getLongitude())
                //주소
                .address(collectionRegistDTO.getAddress())
                //메모
                .content(collectionRegistDTO.getContent())
                .build();

        UserEntity user = userRepository.findByUserId(userId);
        user.increaseCollectCount();
        userRepository.save(user);
        log.info("End of RegistCollection");
        return encyclopediaRepository.save(encyclopedia);
    }

    public ChartDataEntity getChartData(long userId){
        return chartDataRepository.findById(userId);
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
        infoDTO.setSummary(encyclopedia.getBiologyList().getSummary());
        infoDTO.setTitle1(encyclopedia.getBiologyList().getTitle1());
        infoDTO.setContent1(encyclopedia.getBiologyList().getContent1());
        infoDTO.setTitle2(encyclopedia.getBiologyList().getTitle2());
        infoDTO.setContent2(encyclopedia.getBiologyList().getContent2());
        infoDTO.setTitle3(encyclopedia.getBiologyList().getTitle3());
        infoDTO.setContent3(encyclopedia.getBiologyList().getContent3());

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
                galleryPostDTO.setWriterId(encyclopedia.getUser().getUserId());
                galleryPostDTO.setWriterNickName(encyclopedia.getUser().getNickname());
                galleryPostDTO.setProfileImage(encyclopedia.getUser().getProfileImage());
                galleryPostDTO.setRegistDateTime(encyclopedia.getRegistDateTime());
                galleryPostDTO.setName(encyclopedia.getBiologyList().getName());
                galleryPostDTO.setThumbnailImageUrl(encyclopedia.getImageUrl());
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
                galleryPostDTO.setWriterId(encyclopedia.getUser().getUserId());
                galleryPostDTO.setWriterNickName(encyclopedia.getUser().getNickname());
                galleryPostDTO.setProfileImage(encyclopedia.getUser().getProfileImage());
                galleryPostDTO.setRegistDateTime(encyclopedia.getRegistDateTime());
                galleryPostDTO.setName(encyclopedia.getBiologyList().getName());
                galleryPostDTO.setThumbnailImageUrl(encyclopedia.getImageUrl());
                galleryPostDTOList.add(galleryPostDTO);
            }
        }
        return galleryPostDTOList;
    }

    //컬랙션 조회 서비스 다중 조건 검색
    @Override
    public List<InfoPreviewDTO> searchEncyclopedia(long user, String ordo, String familia, String genus, String species){

        Specification<EncyclopediaEntity> spec = (root, query, criteriaBuilder) -> null;

        spec = spec.and(EncyclopediaSpecification.equalUserId(user));
        if (ordo != null)
            spec = spec.and(EncyclopediaSpecification.equalOrdo(ordo));
        if (familia != null)
            spec = spec.and(EncyclopediaSpecification.equalFamilia(familia));
        if (genus != null)
            spec = spec.and(EncyclopediaSpecification.equalGenus(genus));
        if (species != null)
            spec = spec.and(EncyclopediaSpecification.equalSpecies(species));

        List<EncyclopediaEntity> encyclopediaList = encyclopediaRepository.findAll(spec);

        List<InfoPreviewDTO> infoPreviewDTOList = new ArrayList<>();
        for (EncyclopediaEntity encyclopedia : encyclopediaList) {
            InfoPreviewDTO infoPreviewDTO = new InfoPreviewDTO();
            infoPreviewDTO.setEncyclopediaId(encyclopedia.getEncyclopediaId());
            infoPreviewDTO.setName(encyclopedia.getBiologyList().getName());
            infoPreviewDTO.setThumbnailImageUrl(encyclopedia.getThumbnailImageUrl());

            infoPreviewDTOList.add(infoPreviewDTO);
        }

        return infoPreviewDTOList;

//        return null;
//        return encyclopediaRepository.findByBiologyList_OrdoAndBiologyList_FamiliaAndBiologyList_GenusAndBiologyList_Species(ordo, familia, genus, species);
//        return encyclopediaRepository.findByUser_UserId(1l);
    }
}
