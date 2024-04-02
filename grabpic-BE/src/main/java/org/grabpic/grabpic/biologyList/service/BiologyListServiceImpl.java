package org.grabpic.grabpic.biologyList.service;

import lombok.RequiredArgsConstructor;
import org.grabpic.grabpic.biologyList.db.dto.RegistInfoDTO;
import org.grabpic.grabpic.biologyList.db.entity.BiologyListEntity;
import org.grabpic.grabpic.biologyList.db.repository.BiologyListRepository;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BiologyListServiceImpl implements BiologyListService {

    private final BiologyListRepository biologyListRepository;
    @Override
    public RegistInfoDTO getInfo(long biologyListId) {

        //개체 조회
        BiologyListEntity biologyList = biologyListRepository.findByBiologyListId(biologyListId);

        RegistInfoDTO registInfoDTO = new RegistInfoDTO();
        //썸네일 이미지 제외 전체
        registInfoDTO.setBiologyListId(biologyList.getBiologyListId());
        registInfoDTO.setOrdo(biologyList.getOrdo());
        registInfoDTO.setFamilia(biologyList.getFamilia());
        registInfoDTO.setGenus(biologyList.getGenus());
        registInfoDTO.setSpecies(biologyList.getSpecies());
        registInfoDTO.setName(biologyList.getName());
        registInfoDTO.setSummary(biologyList.getSummary());
        registInfoDTO.setTitle1(biologyList.getTitle1());
        registInfoDTO.setContent1(biologyList.getContent1());
        registInfoDTO.setTitle2(biologyList.getTitle2());
        registInfoDTO.setContent2(biologyList.getContent2());
        registInfoDTO.setTitle3(biologyList.getTitle3());
        registInfoDTO.setContent3(biologyList.getContent3());
        registInfoDTO.setImageDetail(biologyList.getImageDetail());

        return registInfoDTO;
    }
}
