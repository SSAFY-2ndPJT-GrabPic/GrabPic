package org.grabpic.grabpic.user.service;

import jakarta.servlet.http.Cookie;
import org.grabpic.grabpic.user.db.dto.InfoDTO;
import org.grabpic.grabpic.user.db.dto.JoinDTO;
import org.grabpic.grabpic.user.db.dto.LoginDTO;

public interface UserService {

    public void joinProcess(JoinDTO joinDTO);
    public LoginDTO getInfo(String accessToken);
    public JoinDTO setSocialInfo();
    public String reissue(Cookie[] cookies);
    public int duplicationNicknameCheck(String nickname);
    public InfoDTO userInfo(long userId);
}