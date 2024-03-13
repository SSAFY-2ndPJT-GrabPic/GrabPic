package org.grabpic.grabpic.encyclopedia.service;

import org.grabpic.grabpic.encyclopedia.db.dto.InfoPreviewDTO;
import org.grabpic.grabpic.encyclopedia.db.entity.Encyclopedia;
import org.grabpic.grabpic.encyclopedia.db.repository.EncyclopediaRepository;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class EncyclopediaServiceImpl implements EncyclopediaService{

    private final EncyclopediaRepository encyclopediaRepository;

    public EncyclopediaServiceImpl(EncyclopediaRepository encyclopediaRepository) {
        this.encyclopediaRepository = encyclopediaRepository;
    }

    @Override
    public List<InfoPreviewDTO> previewInfo(long userId) {
        List<Encyclopedia> encyclopediaList = encyclopediaRepository.findByUser_UserId(userId);
        List<InfoPreviewDTO> infoPreviewDTOList = new ArrayList<>();
        for (Encyclopedia encyclopedia : encyclopediaList) {
            InfoPreviewDTO infoPreviewDTO = new InfoPreviewDTO(encyclopedia.getEncyclopediaId(), encyclopedia.getBiologyList().getName(), encyclopedia.getThumbnailImageUrl());
            infoPreviewDTOList.add(infoPreviewDTO);
        }

        return infoPreviewDTOList;
    }
}
