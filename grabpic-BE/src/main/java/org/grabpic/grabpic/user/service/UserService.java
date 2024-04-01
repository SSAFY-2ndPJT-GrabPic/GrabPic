package org.grabpic.grabpic.user.service;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.grabpic.grabpic.user.db.dto.InfoDTO;
import org.grabpic.grabpic.user.db.dto.JoinDTO;

import java.io.IOException;

public interface UserService {

    public boolean joinProcess(JoinDTO joinDTO);
    public boolean duplicationEmailCheck(String email);
    public boolean changePassword(String password, String token, HttpServletResponse response) throws IOException;
//    public LoginDTO getInfo(String accessToken);
    public JoinDTO setSocialInfo();
    public String reissue(Cookie[] cookies);
    public int duplicationNicknameCheck(String nickname);
    public InfoDTO userInfo(long userId);
    public InfoDTO myInfo(String token);
    public void changeMyInfo(InfoDTO infoDTO, String token);
    public boolean logout(HttpServletRequest request, HttpServletResponse response);
    public void userValidate(String token, HttpServletResponse response);
    public boolean checkPassword(String token, String password);
}