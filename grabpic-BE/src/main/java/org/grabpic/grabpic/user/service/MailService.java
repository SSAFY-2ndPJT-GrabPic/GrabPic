package org.grabpic.grabpic.user.service;

public interface MailService {

    public int sendEmail(String email, int type);
    public boolean verificationCode(int code);
}
