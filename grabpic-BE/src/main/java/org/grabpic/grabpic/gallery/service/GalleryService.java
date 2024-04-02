package org.grabpic.grabpic.gallery.service;

import org.grabpic.grabpic.encyclopedia.db.entity.EncyclopediaEntity;
import org.grabpic.grabpic.gallery.db.dto.EncyLogCountDTO;
import org.grabpic.grabpic.gallery.db.dto.GalleryPostDTO;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;

public interface GalleryService {

    public void GalleryLogAdd(String token, long encyId);
    public HashSet<GalleryPostDTO> recommendGalleryList(String token, int page, int limit);

    public List<EncyLogCountDTO> galleryTest();
}
