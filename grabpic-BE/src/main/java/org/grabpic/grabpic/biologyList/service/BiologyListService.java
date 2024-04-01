package org.grabpic.grabpic.biologyList.service;

import org.grabpic.grabpic.biologyList.db.dto.RegistInfoDTO;

public interface BiologyListService {

    public RegistInfoDTO getInfo(long biologyListId);
}
