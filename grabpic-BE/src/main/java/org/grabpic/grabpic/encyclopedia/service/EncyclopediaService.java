package org.grabpic.grabpic.encyclopedia.service;

import org.grabpic.grabpic.encyclopedia.db.dto.CollectionRegistDTO;
import org.grabpic.grabpic.encyclopedia.db.dto.InfoPreviewDTO;

import java.util.List;

public interface EncyclopediaService {

    public List<InfoPreviewDTO> previewInfo(long userId);
    public void collectionRegist(CollectionRegistDTO collectionRegistDTO, String token);
}
