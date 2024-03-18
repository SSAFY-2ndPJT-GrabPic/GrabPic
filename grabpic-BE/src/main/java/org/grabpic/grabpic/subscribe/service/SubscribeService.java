package org.grabpic.grabpic.subscribe.service;

public interface SubscribeService {

    public String subscribeAdd(long userId, String token);
    public String subscribeDel(long userId, String token);
}
