package org.grabpic.grabpic.encyclopedia.service;

import org.grabpic.grabpic.encyclopedia.db.dto.*;
import org.grabpic.grabpic.encyclopedia.db.entity.ChartDataEntity;
import org.grabpic.grabpic.encyclopedia.db.entity.EncyclopediaEntity;

import java.util.List;

public interface EncyclopediaService {

    public List<InfoPreviewDTO> previewInfo(long userId);
    public EncyclopediaEntity collectionRegist(CollectionRegistDTO collectionRegistDTO, String token);
    public InfoDTO collectionInfo(long encyclopediaId);
    public List<GalleryPostDTO> galleryList(String token, int page, int limit);
    public void addChartData(CollectionRegistDTO collectionRegistDTO, String token);
    public ChartDataEntity getChartData(long userId);
    public List<InfoPreviewDTO> searchEncyclopedia(long user, String ordo, String familia, String genus, String species, int page, int limit);
    public CategoryDto category(long userId, String ordo, String familia, String genus, String species);
}