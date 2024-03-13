package org.grabpic.grabpic.encyclopedia.service;

import org.grabpic.grabpic.encyclopedia.db.dto.InfoPreviewDTO;

import java.util.List;

public interface EncyclopediaService {

    List<InfoPreviewDTO> previewInfo(long userId);
}
