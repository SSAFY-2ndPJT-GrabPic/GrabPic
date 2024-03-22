package org.grabpic.grabpic.map.service;

import org.grabpic.grabpic.map.db.dto.AroundCheckDTO;
import org.grabpic.grabpic.map.db.dto.AroundInfoDTO;

import java.util.List;

public interface MapService {

    public List<AroundInfoDTO> aroundInfo(AroundCheckDTO aroundCheckDTO);
}
