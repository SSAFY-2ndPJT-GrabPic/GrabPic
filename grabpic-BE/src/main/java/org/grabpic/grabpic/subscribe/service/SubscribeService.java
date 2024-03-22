package org.grabpic.grabpic.subscribe.service;

import org.grabpic.grabpic.subscribe.db.dto.RelationshipListDTO;

import java.util.List;

public interface SubscribeService {

    public String subscribeAdd(long userId, String token);
    public String subscribeDel(long userId, String token);
    public boolean relationshipCheck(long userId, String token);
    public List<RelationshipListDTO> relationerList(long userId);
    public List<RelationshipListDTO> relationingList(long userId);
}
