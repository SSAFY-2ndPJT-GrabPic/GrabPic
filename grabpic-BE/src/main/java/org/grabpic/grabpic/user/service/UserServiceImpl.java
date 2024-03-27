package org.grabpic.grabpic.user.service;

import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.grabpic.grabpic.user.config.BusinessLogicException;
import org.grabpic.grabpic.user.config.JWTUtil;
import org.grabpic.grabpic.user.db.dto.CustomOAuth2User;
import org.grabpic.grabpic.user.db.dto.InfoDTO;
import org.grabpic.grabpic.user.db.dto.JoinDTO;
import org.grabpic.grabpic.user.db.entity.UserEntity;
import org.grabpic.grabpic.user.db.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.PrintWriter;
import java.time.LocalDate;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final JWTUtil jwtUtil;

    @Value("${spring.jwt.access}")
    private long accessTime;

    @Override
    public boolean joinProcess(JoinDTO joinDTO) {

        String email = joinDTO.getEmail();

        Boolean isExist = userRepository.existsByEmail(email);

        // 2차검증
        if (isExist) {
            System.out.println("이미 존재하는 휴먼");
            return false;
        }

        UserEntity data = UserEntity.builder()
                        .email(email)
                        .password(bCryptPasswordEncoder.encode(joinDTO.getPassword()))
                        .nickname(joinDTO.getNickname())
                        .name(joinDTO.getName())
                        .birth(joinDTO.getBirth())
                        .role("ROLE_USER")
                        .build();

        userRepository.save(data);
        return true;
    }

    @Override
    public boolean duplicationEmailCheck(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public boolean changePassword(String password, String token, HttpServletResponse response) throws IOException {
        try {
            jwtUtil.isExpired(token);
        } catch (ExpiredJwtException e) {
            //response body
            PrintWriter writer = response.getWriter();
            writer.print("access token expired");
            //response status code
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return false;
        }
        UserEntity user = userRepository.findByEmail(jwtUtil.getEmail(token));
        user.setPassword(bCryptPasswordEncoder.encode(password));
        userRepository.save(user);
        return true;
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

    @Override
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
        long userId = jwtUtil.getUserId(refresh);


        //make new JWT
        return jwtUtil.createJwt("access", email, role, userId, accessTime);
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

    //사용자 정보를 가져옴, 이때는 이메일, 이름, 생일을 전달하지 않음
    @Override
    public InfoDTO userInfo(long userId) {

        Optional<UserEntity> optionalUser = userRepository.findById(userId);

        if(optionalUser.isPresent()) {
            InfoDTO infoDTO = new InfoDTO();
            UserEntity user = optionalUser.get();
            infoDTO.setUserId(user.getUserId());
            //닉네임
            infoDTO.setNickname(user.getNickname());
            //성별
            infoDTO.setGender(user.getGender());
            //구독자 수
            infoDTO.setSubsCount(user.getSubsCount());
            //구독한 수
            infoDTO.setMySubsCount(user.getMySubsCount());
            //수집 개체 수
            infoDTO.setCollectCount(user.getCollectCount());
            //프로필 사진
            infoDTO.setProfileImage(user.getProfileImage());
            return infoDTO;
        } else {
            System.out.println("존재하지 않는 사용자");
            return null;
        }
    }

    //내 정보를 조회
    @Override
    public InfoDTO myInfo(String token) {
        long userId = jwtUtil.getUserId(token);
        Optional<UserEntity> optionalUser = userRepository.findById(userId);
        if(optionalUser.isPresent()) {
            UserEntity user = optionalUser.get();
            InfoDTO infoDTO = new InfoDTO();
            //userPK
            infoDTO.setUserId(user.getUserId());
            //이메일
            infoDTO.setEmail(user.getEmail());
            //닉네임
            infoDTO.setNickname(user.getNickname());
            //이름
            infoDTO.setName(user.getName());
            //생일
            infoDTO.setBirth(user.getBirth());
            //성별
            infoDTO.setGender(user.getGender());
            //프로필 사진
            infoDTO.setProfileImage(user.getProfileImage());
            //구독자 수
            infoDTO.setSubsCount(user.getSubsCount());
            //구독한 수
            infoDTO.setMySubsCount(user.getMySubsCount());
            //수집 개체 수
            infoDTO.setCollectCount(user.getCollectCount());

            return infoDTO;
        }
        return null;
    }

    @Override
    public void changeMyInfo(InfoDTO infoDTO, String token) {
        Optional<UserEntity> optionalUser = userRepository.findById(jwtUtil.getUserId(token));
        if (optionalUser.isPresent()) {
            UserEntity user = optionalUser.get();
            // 닉네임, 이름, 생일, 성별
            user.setNickname(infoDTO.getNickname());
            user.setName(infoDTO.getName());
            user.setBirth(infoDTO.getBirth());
            user.setGender(infoDTO.getGender());
            userRepository.save(user);
        }
    }

    @Override
    public boolean logout(HttpServletRequest request, HttpServletResponse response) {
        String refresh = null;
        Cookie[] cookies = request.getCookies();
        // refresh 쿠키 찾기
        for (Cookie cookie : cookies) {
            if (cookie.getName().equals("refresh")) {
                refresh = cookie.getValue();
            }
        }
        if (refresh == null) {
            //response status code
//            return "refresh token null";
            return false;
        }
        //expired check
        try {
            jwtUtil.isExpired(refresh);
        } catch (ExpiredJwtException e) {

            //response status code
//            return "refresh token expired";
            return false;
        }
        // 토큰이 refresh인지 확인 (발급시 페이로드에 명시)
        String category = jwtUtil.getCategory(refresh);
        if (!category.equals("refresh")) {
            //response status code
//            return "invalid refresh token";
            return false;
        }

        if(jwtUtil.getUserId(request.getHeader("access")) != jwtUtil.getUserId(refresh)) {
            //로그인 정보 불일치
            return false;
        }

        Cookie cookie = new Cookie("refresh", null);
        cookie.setMaxAge(0);
        cookie.setPath("/");

        response.addCookie(cookie);
        response.setStatus(HttpServletResponse.SC_OK);
        return true;
    }


    //테스트용 코드
//    @Override
//    public LoginDTO getInfo(String accessToken) {
//
//        LoginDTO dto = new LoginDTO();
//        dto.setEmail(jwtUtil.getEmail(accessToken));
//
//        return dto;
//    }
}
