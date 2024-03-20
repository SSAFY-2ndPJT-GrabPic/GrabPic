package org.grabpic.grabpic.encyclopedia.service;

import lombok.RequiredArgsConstructor;
import org.grabpic.grabpic.encyclopedia.db.dto.CollectionRegistDTO;
import org.grabpic.grabpic.encyclopedia.db.dto.InfoPreviewDTO;
import org.grabpic.grabpic.encyclopedia.db.entity.EncyclopediaEntity;
import org.grabpic.grabpic.encyclopedia.db.repository.EncyclopediaRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class EncyclopediaServiceImpl implements EncyclopediaService{

    private final EncyclopediaRepository encyclopediaRepository;

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
        
    }
}
