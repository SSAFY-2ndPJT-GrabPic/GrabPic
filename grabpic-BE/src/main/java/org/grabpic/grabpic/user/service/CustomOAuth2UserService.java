package org.grabpic.grabpic.user.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.grabpic.grabpic.user.db.dto.CustomOAuth2User;
import org.grabpic.grabpic.user.db.dto.KakaoResponse;
import org.grabpic.grabpic.user.db.dto.OAuth2Response;
import org.grabpic.grabpic.user.db.entity.UserEntity;
import org.grabpic.grabpic.user.db.repository.UserRepository;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

        OAuth2User oAuth2User = super.loadUser(userRequest);
        System.out.println("우리집왔나");
        System.out.println(oAuth2User.getAttributes());

        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        OAuth2Response oAuth2Response = null;

        if (registrationId.equals("kakao")) {
            oAuth2Response = new KakaoResponse(oAuth2User.getAttributes());
            String email = oAuth2Response.getEmail();
            System.out.println("이메일 추출 확인 " + email);
            UserEntity user = userRepository.findByEmail(email);
            //소셜로그인은 되었지만, 우리 사이트에 회원등록이 안된 상태 전달
            if( user == null) {
                return new CustomOAuth2User(oAuth2Response, "ROLE_UNKNOWN", null);
            } else {
                return new CustomOAuth2User(oAuth2Response, user.getRole(), user.getNickname());
            }

        }
//        else if (registrationId.equals("naver")) {
//
//            oAuth2Response = new NaverResponse(oAuth2User.getAttributes());
//
//        } else if (registrationId.equals("google")) {
//
//            oAuth2Response = new GoogleResponse(oAuth2User.getAttributes());
//
//        }
        else {
            System.out.println("망함 큰일남 어디서오는거임;;");
            return null;
        }


        //return new CustomOAuth2User(oAuth2Response, "ROLE_USER");

    }
}
