package org.grabpic.grabpic.user.service;

import org.grabpic.grabpic.user.db.dto.EmailAuthDto;

public interface MailService {

    public int sendEmail(String email, int type);
    public int verificationCode(EmailAuthDto code);
}
