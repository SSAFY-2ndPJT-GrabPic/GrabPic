package org.grabpic.grabpic.user.config;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.grabpic.grabpic.user.db.dto.CustomOAuth2User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Collection;
import java.util.Iterator;

@Component
@RequiredArgsConstructor
public class CustomSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JWTUtil jwtUtil;

    @Value("${spring.jwt.access}")
    private long accessTime;

    @Value("${spring.jwt.refresh}")
    private long refreshTime;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {


        //OAuth2User
        CustomOAuth2User customUserDetails = (CustomOAuth2User) authentication.getPrincipal();

        //ROLE 추출
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        Iterator<? extends GrantedAuthority> iterator = authorities.iterator();
        GrantedAuthority auth = iterator.next();
        String role = auth.getAuthority();

        if (role.equals("ROLE_VALIDATE")) {
            response.setStatus(205);
            response.sendRedirect("https://j10d104.p.ssafy.io/login");
            return;
        }

        String email = customUserDetails.getEmail();
        long userId = customUserDetails.getUserId();

        //토큰 생성
        String access = jwtUtil.createJwt("access", email, role, userId, accessTime);
        String refresh = jwtUtil.createJwt("refresh", email, role, userId, refreshTime);

        response.addCookie(createCookie("access", access));
        response.addCookie(createCookie("refresh", refresh));
        response.setStatus(HttpStatus.OK.value());
        response.sendRedirect("https://j10d104.p.ssafy.io/social");
    }

    private Cookie createCookie(String key, String value) {

        Cookie cookie = new Cookie(key, value);
        cookie.setMaxAge(24*60*60);
        //cookie.setSecure(true);
        cookie.setPath("/");
        if(key.equals("refresh")) {
            cookie.setHttpOnly(true);
        }

        return cookie;
    }
}