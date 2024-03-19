package org.grabpic.grabpic.user.service;

import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.http.Cookie;
import lombok.RequiredArgsConstructor;
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

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final JWTUtil jwtUtil;

    @Value("${spring.jwt.proerties.smtp.access}")
    private long accessTime;

    @Override
    public void joinProcess(JoinDTO joinDTO) {

        String email = joinDTO.getEmail();

        Boolean isExist = userRepository.existsByEmail(email);

        if (isExist) {

            System.out.println("이미 존재하는 휴먼");
            return;
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
        String nickName = jwtUtil.getNickName(refresh);


        //make new JWT
        return jwtUtil.createJwt("access", email, role, nickName, accessTime);
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

    @Override
    public InfoDTO userInfo(long userId) {

        Optional<UserEntity> optionalUser = userRepository.findById(userId);

        if(optionalUser.isPresent()) {
            InfoDTO infoDTO = new InfoDTO();
            UserEntity user = optionalUser.get();
            infoDTO.setUserId(user.getUserId());
            infoDTO.setEmail(user.getEmail());
            infoDTO.setName(user.getName());
            infoDTO.setNickname(user.getNickname());
            infoDTO.setBirth(user.getBirth());
            infoDTO.setGender(user.getGender());
            infoDTO.setSubsCount(user.getSubsCount());
            infoDTO.setProfileImage(user.getProfileImage());
            System.out.println("정보조회 할때 반환할 것" + infoDTO.toString());
            return infoDTO;
        } else {
            System.out.println("존재하지 않는 사용자");
            return null;
        }
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
