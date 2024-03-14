package org.grabpic.grabpic.user.service;

import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.http.Cookie;
import org.grabpic.grabpic.user.config.JWTUtil;
import org.grabpic.grabpic.user.db.dto.CustomOAuth2User;
import org.grabpic.grabpic.user.db.dto.InfoDTO;
import org.grabpic.grabpic.user.db.dto.JoinDTO;
import org.grabpic.grabpic.user.db.dto.LoginDTO;
import org.grabpic.grabpic.user.db.entity.User;
import org.grabpic.grabpic.user.db.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    private final JWTUtil jwtUtil;

    public UserServiceImpl(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder, JWTUtil jwtUtil) {

        this.userRepository = userRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.jwtUtil = jwtUtil;
    }

    public void joinProcess(JoinDTO joinDTO) {

        String email = joinDTO.getEmail();

        Boolean isExist = userRepository.existsByEmail(email);

        if (isExist) {

            System.out.println("이미 존재하는 휴먼");
            return;
        }

        User data = User.builder()
                        .email(email)
                        .password(bCryptPasswordEncoder.encode(joinDTO.getPassword()))
                        .nickname(joinDTO.getNickname())
                        .name(joinDTO.getName())
                        .birth(joinDTO.getBirth())
                        .role("ROLE_USER")
                        .build();


        userRepository.save(data);
    }

    @Override
    public LoginDTO getInfo(String accessToken) {

        LoginDTO dto = new LoginDTO();
        dto.setEmail(jwtUtil.getEmail(accessToken));

        return dto;
    }

    @Override
    public JoinDTO setSocialInfo() {
        //OAuth2User
        SecurityContext context = SecurityContextHolder.getContext();
        Authentication authentication = context.getAuthentication();
        CustomOAuth2User customUserDetails = (CustomOAuth2User) authentication.getPrincipal();

        if(customUserDetails.getProvider().equals("kakao")) {
            JoinDTO joinDTO = new JoinDTO();
            joinDTO.setEmail(customUserDetails.getEmail());
            joinDTO.setProvider(customUserDetails.getProvider());
            joinDTO.setName(customUserDetails.getName());
            return joinDTO;
        }
        return null;
    }

    public String reissue(Cookie[] cookies) {

        //get refresh token
        String refresh = null;
        for (Cookie cookie : cookies) {

            if (cookie.getName().equals("refresh")) {

                refresh = cookie.getValue();
            }
        }

        if (refresh == null) {

            //response status code
            return "refresh token null";
        }

        //expired check
        try {
            jwtUtil.isExpired(refresh);
        } catch (ExpiredJwtException e) {

            //response status code
            return "refresh token expired";
        }

        // 토큰이 refresh인지 확인 (발급시 페이로드에 명시)
        String category = jwtUtil.getCategory(refresh);

        if (!category.equals("refresh")) {

            //response status code
            return "invalid refresh token";
        }

        String email = jwtUtil.getEmail(refresh);
        String role = jwtUtil.getRole(refresh);

        //make new JWT 5분
        return jwtUtil.createJwt("access", email, role, 300000L);
    }

    @Override
    public int duplicationNicknameCheck(String nickname) {
        if( nickname.equals("부적절한 이름의 리스트")) {
            return 2;
        } else if (userRepository.existsByNickname(nickname)){
            return 1;
        } else {
            return 0;
        }
    }

    public InfoDTO userInfo(long userId) {

        Optional<User> optionalUser = userRepository.findById(userId);
        InfoDTO infoDTO = userRepository.findInfoDTOById(userId);
        if(infoDTO != null) {
            System.out.println(infoDTO.toString());
            return infoDTO;
        } else {
            System.out.println("존재하지 않는 사용자");
            return null;
        }
    }
}
