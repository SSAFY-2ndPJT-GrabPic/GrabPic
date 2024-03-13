package org.grabpic.grabpic.user.controller;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.xml.ws.Response;
import lombok.extern.slf4j.Slf4j;
import org.grabpic.grabpic.user.db.dto.EmailAuthDto;
import org.grabpic.grabpic.user.db.dto.InfoDTO;
import org.grabpic.grabpic.user.db.dto.JoinDTO;
import org.grabpic.grabpic.user.db.dto.LoginDTO;
import org.grabpic.grabpic.user.service.MailService;
import org.grabpic.grabpic.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@Controller
@ResponseBody
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    private final MailService mailService;

    public UserController(UserService userService, MailService mailService) {

        this.userService = userService;
        this.mailService = mailService;
    }

    @PostMapping("/join")
    public String joinProcess(@RequestBody JoinDTO joinDTO) {

        System.out.println("CONTROLLER : " + joinDTO.toString());
        userService.joinProcess(joinDTO);

        return "ok";
    }

    @GetMapping("/baseinfo")
    public ResponseEntity<?> setSocialInfo() {
        try {
            JoinDTO joinDTO = userService.setSocialInfo();
            return ResponseEntity.status(HttpStatus.OK).body(joinDTO);
        } catch (Exception e) {
            //뭐라써야할까요
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/getinfo")
    public ResponseEntity<?> getHeader(@RequestHeader("access") String accessToken) {
        System.out.println("받아온 토큰 : " + accessToken);

        LoginDTO dto = userService.getInfo(accessToken);
        return ResponseEntity.status(HttpStatus.OK).body(dto);
    }

    @PostMapping("/reissue")
    public ResponseEntity<?> reissue(HttpServletRequest request, HttpServletResponse response) {
        System.out.println("만료테스트");
        Cookie[] cookies = request.getCookies();
        try {
            String answer = userService.reissue(cookies);
            if (answer.equals("refresh token null") || answer.equals("refresh token expired") || answer.equals("invalid refresh token")) {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
            //response
            response.setHeader("access", answer);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            //뭐라써야할까요
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/auth/emails/verification-requests")
    public ResponseEntity<?> sendEmail(@RequestBody EmailAuthDto emailAuthDto) {
        try {
            mailService.sendEmail(emailAuthDto.getEmail(), emailAuthDto.getType());
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            //수정필요
            log.error(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/auth/emails/verification")
    public ResponseEntity<?> verificationCode(@RequestBody EmailAuthDto emailAuthDto) {
        try {
            boolean authResult = mailService.verificationCode(emailAuthDto.getCode());
            if(authResult) {
                return new ResponseEntity<>(HttpStatus.OK);
            } else  {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            log.error(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    @GetMapping("/look/nickname/{nickname}")
    public ResponseEntity<?> duplicationNicknameCheck(@PathVariable String nickname) {
        try {
            int result = userService.duplicationNicknameCheck(nickname);
            if( result == 0) {
                return ResponseEntity.status(HttpStatus.OK).body("중복닉네임없음");
            } else if (result == 1) {
                return ResponseEntity.status(HttpStatus.OK).body("중복닉네임있음");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("부적절한 닉네임");
            }
        } catch (Exception e) {
            log.error(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/info/{userId}")
    public ResponseEntity<?> userInfo(@PathVariable long userId) {
        try {
            InfoDTO infoDTO = userService.userInfo(userId);
            return ResponseEntity.status(HttpStatus.OK).body(infoDTO);
        } catch (Exception e) {
            log.error(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
