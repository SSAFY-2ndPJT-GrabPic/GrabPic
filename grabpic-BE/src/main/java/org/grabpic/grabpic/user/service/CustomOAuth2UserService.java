package org.grabpic.grabpic.user.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.grabpic.grabpic.user.db.dto.CustomOAuth2User;
import org.grabpic.grabpic.user.db.dto.GoogleResponse;
import org.grabpic.grabpic.user.db.dto.KakaoResponse;
import org.grabpic.grabpic.user.db.dto.OAuth2Response;
import org.grabpic.grabpic.user.db.entity.UserEntity;
import org.grabpic.grabpic.user.db.repository.UserRepository;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

        OAuth2User oAuth2User = super.loadUser(userRequest);

        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        OAuth2Response oAuth2Response = null;
        UserEntity user;

        if (registrationId.equals("kakao")) {
            oAuth2Response = new KakaoResponse(oAuth2User.getAttributes());
            user = loginAndJoin(oAuth2Response);
        } else if (registrationId.equals("google")) {
            oAuth2Response = new GoogleResponse(oAuth2User.getAttributes());
            user = loginAndJoin(oAuth2Response);
        } else {

            return null;
        }


        return new CustomOAuth2User(oAuth2Response, user.getRole(), user.getUserId());

    }


    private UserEntity loginAndJoin(OAuth2Response oAuth2Response) {
        String email = oAuth2Response.getEmail();
        UserEntity user = userRepository.findByEmail(email);
        //소셜로그인은 되었지만, 우리 사이트에 회원등록이 안된 상태 전달
        if( user == null) {
            UserEntity newUser = UserEntity.builder()
                    .provider(oAuth2Response.getProvider())
                    .providerId(oAuth2Response.getProviderId())
                    .name(oAuth2Response.getName() != null ? oAuth2Response.getName() : oAuth2Response.getProvider() + oAuth2Response.getProviderId())
                    .nickname(oAuth2Response.getNickName() != null ? oAuth2Response.getNickName() : oAuth2Response.getProvider() + oAuth2Response.getProviderId())
                    .email(oAuth2Response.getEmail())
                    .profileImage(oAuth2Response.getProfileImage())
                    .role("ROLE_USER")
                    .build();
            user = userRepository.save(newUser);
        }

        return user;
    }
}
