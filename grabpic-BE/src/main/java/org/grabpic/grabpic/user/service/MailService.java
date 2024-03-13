package org.grabpic.grabpic.user.service;

import java.util.List;

public interface MailService {

    public int sendEmail(String email, int type);

    public boolean verificationCode(int code);
}
