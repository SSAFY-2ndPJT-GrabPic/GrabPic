package org.grabpic.grabpic.encyclopedia.service;

import org.grabpic.grabpic.encyclopedia.db.dto.CollectionRegistDTO;
import org.grabpic.grabpic.encyclopedia.db.dto.GalleryPostDTO;
import org.grabpic.grabpic.encyclopedia.db.dto.InfoDTO;
import org.grabpic.grabpic.encyclopedia.db.dto.InfoPreviewDTO;
import org.grabpic.grabpic.encyclopedia.db.entity.ChartDataEntity;

import java.util.List;

public interface EncyclopediaService {

    public List<InfoPreviewDTO> previewInfo(long userId);
    public void collectionRegist(CollectionRegistDTO collectionRegistDTO, String token);
    public InfoDTO collectionInfo(long encyclopediaId);
    public List<GalleryPostDTO> galleryList(String token, int page, int limit);
    public void addChartData(CollectionRegistDTO collectionRegistDTO, String token);
    public ChartDataEntity getChartData(long userId);
}
