package org.grabpic.grabpic.user.config;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.grabpic.grabpic.user.db.dto.CustomOAuth2User;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Collection;
import java.util.Iterator;

@Component
public class CustomSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JWTUtil jwtUtil;

    public CustomSuccessHandler(JWTUtil jwtUtil) {

        this.jwtUtil = jwtUtil;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {


        //OAuth2User
        CustomOAuth2User customUserDetails = (CustomOAuth2User) authentication.getPrincipal();

        //ROLE 추출
        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        Iterator<? extends GrantedAuthority> iterator = authorities.iterator();
        GrantedAuthority auth = iterator.next();
        String role = auth.getAuthority();

        //contaions 이렇게 쓰는게 맞나 ?
        if( role.equals("ROLE_UNKNOWN")) {
            System.out.println("가입되지 않은 회원");
            response.setStatus(HttpStatus.OK.value());
            response.sendRedirect("http://localhost:5173/user/regist");
            return;
        }

        String email = customUserDetails.getEmail();

        //토큰 생성
        //20초
        String access = jwtUtil.createJwt("access", email, role, 20000L);
        //60초
        String refresh = jwtUtil.createJwt("refresh", email, role, 60000L);

        response.addCookie(createCookie("access", access));
        response.addCookie(createCookie("refresh", refresh));
        response.setStatus(HttpStatus.OK.value());
        response.sendRedirect("http://localhost:5173/");
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