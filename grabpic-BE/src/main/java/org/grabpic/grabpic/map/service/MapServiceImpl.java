package org.grabpic.grabpic.map.service;

import lombok.RequiredArgsConstructor;
import org.grabpic.grabpic.encyclopedia.db.entity.EncyclopediaEntity;
import org.grabpic.grabpic.encyclopedia.db.repository.EncyclopediaRepository;
import org.grabpic.grabpic.map.db.dto.AroundCheckDTO;
import org.grabpic.grabpic.map.db.dto.AroundInfoDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class MapServiceImpl implements MapService{

    private final EncyclopediaRepository encyclopediaRepository;

    @Override
    public List<AroundInfoDTO> aroundInfo(AroundCheckDTO aroundCheckDTO) {
        Page<EncyclopediaEntity> aroundList;
        Pageable pageable = PageRequest.of(aroundCheckDTO.getPage()-1, aroundCheckDTO.getLimit(), Sort.by(Sort.Direction.DESC, "registDateTime"));
        if(aroundCheckDTO.getSort() == 1) {
            // 등록 날짜 기준 최신순 정렬, 최초 선언된 그대로 쓰면 되서 내용이 없음
            aroundList = encyclopediaRepository.findAround(aroundCheckDTO.getLatitude(), aroundCheckDTO.getLongitude(), aroundCheckDTO.getRange(), pageable);
        } else if(aroundCheckDTO.getSort() == 2) {
            // 등록 날짜 기준 오래된 순 정렬
            pageable = PageRequest.of(aroundCheckDTO.getPage()-1, aroundCheckDTO.getLimit(), Sort.by(Sort.Direction.ASC, "registDateTime"));
            aroundList = encyclopediaRepository.findAround(aroundCheckDTO.getLatitude(), aroundCheckDTO.getLongitude(), aroundCheckDTO.getRange(), pageable);

        } else {
            //희귀도순 정렬 기준 정립 필요 아래 코드는 임시내용
            pageable = PageRequest.of(aroundCheckDTO.getPage()-1, aroundCheckDTO.getLimit(), Sort.by(Sort.Direction.ASC, "b.cnt"));
            aroundList = encyclopediaRepository.findAroundOrderByRare(aroundCheckDTO.getLatitude(), aroundCheckDTO.getLongitude(), aroundCheckDTO.getRange(), pageable);
        }

        List<AroundInfoDTO> aroundInfoDTOList = new ArrayList<>();
        for(EncyclopediaEntity encyclopedia : aroundList) {
            AroundInfoDTO aroundInfoDTO = new AroundInfoDTO();
            aroundInfoDTO.setUserId(encyclopedia.getUser().getUserId());
            aroundInfoDTO.setEncyclopedia(encyclopedia.getEncyclopediaId());
            aroundInfoDTO.setName(encyclopedia.getBiologyList().getName());
            aroundInfoDTO.setRegistDateTime(encyclopedia.getRegistDateTime());
            aroundInfoDTO.setAddress(encyclopedia.getAddress());
            aroundInfoDTO.setThumbnailImage(encyclopedia.getThumbnailImageUrl());
            aroundInfoDTO.setLatitude(encyclopedia.getLatitude());
            aroundInfoDTO.setLongitude(encyclopedia.getLongitude());

            // 희귀도 카운트 셋의 기준을 사용하고 입력할 필요가 있음.
            aroundInfoDTOList.add(aroundInfoDTO);

        }

        return aroundInfoDTOList;
    }
}
