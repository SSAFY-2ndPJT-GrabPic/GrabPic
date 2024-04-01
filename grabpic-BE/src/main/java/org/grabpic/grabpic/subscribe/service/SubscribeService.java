package org.grabpic.grabpic.subscribe.service;

import org.grabpic.grabpic.subscribe.db.dto.RelationshipListDTO;
import org.grabpic.grabpic.subscribe.db.dto.SubscribeInOutDTO;

import java.util.List;

public interface SubscribeService {

    public SubscribeInOutDTO subscribeAdd(long userId, String token);
    public SubscribeInOutDTO subscribeDel(long userId, String token);
    public boolean relationshipCheck(long userId, String token);
    public List<RelationshipListDTO> relationerList(long userId);
    public List<RelationshipListDTO> relationingList(long userId);
}
