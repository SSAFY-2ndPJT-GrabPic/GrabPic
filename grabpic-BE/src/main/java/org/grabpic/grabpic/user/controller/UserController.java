package org.grabpic.grabpic.user.controller;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.grabpic.grabpic.errors.errorcode.UserError;
import org.grabpic.grabpic.errors.exception.RestApiException;
import org.grabpic.grabpic.user.db.dto.EmailAuthDto;
import org.grabpic.grabpic.user.db.dto.InfoDTO;
import org.grabpic.grabpic.user.db.dto.JoinDTO;
import org.grabpic.grabpic.user.service.MailService;
import org.grabpic.grabpic.user.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final UserService userService;
    private final MailService mailService;

    // 회원가입 API 수정 필요
    @PostMapping("/join")
    public ResponseEntity<?> joinProcess(@RequestBody JoinDTO joinDTO) {
        System.out.println("CONTROLLER : " + joinDTO.toString());
        try {
            boolean result = userService.joinProcess(joinDTO);
            if(result) {
                return new ResponseEntity<>(HttpStatus.OK);
            } else  {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            log.error(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    //이메일 중복체크
    @GetMapping("/look/email/{email}")
    public ResponseEntity<?> duplicationEmailCheck(@PathVariable String email) {
        try {
            boolean result = userService.duplicationEmailCheck(email);
            return ResponseEntity.status(HttpStatus.OK).body(result);
        } catch (Exception e) {
            //뭐라써야할까요
            log.error(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //비밀번호 변경
    @PostMapping("/password/change")
    public ResponseEntity<?> changePassword(@RequestBody String password, HttpServletRequest request, HttpServletResponse response) {
        try{
            boolean result = userService.changePassword(password, request.getHeader("access"), response);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            log.error(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    //소셜 로그인 후 회원가입 시 소셜정보 전달 API
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

    // access Token 재발급 API
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

    // 이메일 인증 요청 -> 메일 전송 API
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

    // 이메일 인증 코드 검증 API
    @PostMapping("/auth/emails/verification")
    public ResponseEntity<?> verificationCode(@RequestBody EmailAuthDto emailAuthDto, HttpServletResponse response) {
        try {
            // 1 성공, 2코드불일치, 3만료
            int authResult = mailService.verificationCode(emailAuthDto);
            if (authResult == 1) {
                return new ResponseEntity<>(HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            log.error(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    //닉네임 중복확인 API
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

    // 유저 정보 조회 API
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

    @GetMapping("/info/my")
    public ResponseEntity<?> myInfo(HttpServletRequest request) {
        try {
            InfoDTO infoDTO = userService.myInfo(request.getHeader("access"));
            return ResponseEntity.status(HttpStatus.OK).body(infoDTO);
        } catch (Exception e) {
            log.error(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/myinfochange")
    public ResponseEntity<?> myInfoChange(HttpServletRequest request, @RequestBody InfoDTO infoDTO) {
        try {
            userService.changeMyInfo(infoDTO, request.getHeader("access"));
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            log.error(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {
        try {
            boolean result = userService.logout(request, response);
            if(result) {
                return new ResponseEntity<>(HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        } catch (Exception e) {
            log.error(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/validate")
    public ResponseEntity<?> userValidate(HttpServletRequest request) {
        userService.userValidate(request.getHeader("access"));
        return new ResponseEntity<>(HttpStatus.OK);
    }

    //테스트용 코드
    //    @GetMapping("/getinfo")
//    public ResponseEntity<?> getHeader(@RequestHeader("access") String accessToken) {
//        System.out.println("받아온 토큰 : " + accessToken);
//
//        LoginDTO dto = userService.getInfo(accessToken);
//        return ResponseEntity.status(HttpStatus.OK).body(dto);
//    }
}
