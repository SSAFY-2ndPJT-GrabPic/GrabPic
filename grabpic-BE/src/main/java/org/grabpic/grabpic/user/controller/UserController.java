package org.grabpic.grabpic.user.controller;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.grabpic.grabpic.user.db.dto.JoinDTO;
import org.grabpic.grabpic.user.db.dto.LoginDTO;
import org.grabpic.grabpic.user.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@ResponseBody
@RequestMapping("/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {

        this.userService = userService;
    }

    @PostMapping("/join")
    public String joinProcess(@RequestBody JoinDTO joinDTO) {

        System.out.println("CONTROLLER : " + joinDTO.getEmail());
        userService.joinProcess(joinDTO);

        return "ok";
    }

    @GetMapping("/getinfo")
    public ResponseEntity<?> getHeader(@RequestHeader("access") String accessToken) {
        System.out.println("받아온 토큰 : " + accessToken);

        LoginDTO dto = userService.getInfo(accessToken);
        return ResponseEntity.status(200).body(dto);
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
            throw new RuntimeException();
        }
    }
}
