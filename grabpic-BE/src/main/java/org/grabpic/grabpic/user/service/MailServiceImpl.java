package org.grabpic.grabpic.user.service;

import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.grabpic.grabpic.user.config.BusinessLogicException;
import org.grabpic.grabpic.user.config.JWTUtil;
import org.grabpic.grabpic.user.db.dto.EmailAuthDto;
import org.grabpic.grabpic.user.db.entity.EmailCodeEntity;
import org.grabpic.grabpic.user.db.repository.EmailCodeRepository;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.Random;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class MailServiceImpl implements MailService {

    private final JavaMailSender emailSender;
    private final JWTUtil jwtUtil;
    private final EmailCodeRepository emailCodeRepository;
    //이메일 전송
    public int sendEmail(String email, int type) {

        Random random = new Random();
        int randomInRange = random.nextInt(900) + 100;
        // randomInRange를 DB에 넣는 작업 추가 필요
        emailCodeRepository.save(new EmailCodeEntity(email, randomInRange));
        String title = "기본값";
        String content = "기본값";

        if(type == 1) {
            //제목작성
            title = "GrabPic 회원가입을 위한 이메일 인증요청입니다.";
            //내용 작성
            content = "인증을 위한 숫자는 " + randomInRange + " 입니다.";
            SimpleMailMessage emailForm = createEmailForm(email, title, content);
            try {
                emailSender.send(emailForm);
            } catch (RuntimeException e) {
                //전송 실패
                log.debug("MailService.sendEmail exception occur toEmail: {}, " +
                        "title: {}, text: {}", email, title, content);
                throw new BusinessLogicException(BusinessLogicException.ExceptionCode.UNABLE_TO_SEND_EMAIL);
            }

        }

        if(type == 2) {
            //제목작성
            title = "GrabPic 비밀번호 재설정을 위한 이메일 인증요청입니다.";
            //내용 작성
            content = "인증을 위한 숫자는 " + randomInRange + " 입니다.";
            SimpleMailMessage emailForm = createEmailForm(email, title, content);
            try {
                emailSender.send(emailForm);
            } catch (RuntimeException e) {
                //전송 실패
                log.debug("MailService.sendEmail exception occur toEmail: {}, " +
                        "title: {}, text: {}", email, title, content);
                throw new BusinessLogicException(BusinessLogicException.ExceptionCode.UNABLE_TO_SEND_EMAIL);
            }

        }


        return randomInRange;
    }

    // 발신할 이메일 데이터 세팅
    private SimpleMailMessage createEmailForm(String toEmail,
                                              String title,
                                              String text) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(toEmail);
        message.setSubject(title);
        message.setText(text);

        return message;
    }

    public int verificationCode(EmailAuthDto dto) {
        /*
         저장된 코드를 불러오는 내용
         */
        int code = dto.getCode();
        String email = dto.getEmail();
        System.out.println(emailCodeRepository.existsById(email));
        if(!emailCodeRepository.existsById(email)){
            System.out.println("Asdf");
            return 1;
        }
        Optional<EmailCodeEntity> emailCodeEntity = emailCodeRepository.findById(email);
        int tmpSaveCode = emailCodeEntity.get().getCode();

        if(dto.getCode() == tmpSaveCode) {
            return 2;
        } else {
            return 3;

        }

        return false;
    }
}
