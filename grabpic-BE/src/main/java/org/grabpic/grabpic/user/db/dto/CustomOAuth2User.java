package org.grabpic.grabpic.user.db.dto;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;

@RequiredArgsConstructor
public class CustomOAuth2User implements OAuth2User {

    private final OAuth2Response oAuth2Response;
    private final String role;
    @Getter
    private final long userId;

    @Override
    public Map<String, Object> getAttributes() {

        return oAuth2Response.getAttribute();
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {

        Collection<GrantedAuthority> collection = new ArrayList<>();

        collection.add(new GrantedAuthority() {

            @Override
            public String getAuthority() {

                return role;
            }
        });

        return collection;
    }

    @Override
    public String getName() {

        return oAuth2Response.getName();
    }


    public String getEmail() {
        return  oAuth2Response.getEmail();
    }

    public String getUsername() {

        return oAuth2Response.getProvider() + " " + oAuth2Response.getProviderId();
    }

    public String getProvider() {
        return oAuth2Response.getProvider();
    }

    public String getProviderId() {
        return oAuth2Response.getProviderId();
    }
}
