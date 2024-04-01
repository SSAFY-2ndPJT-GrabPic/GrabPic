package org.grabpic.grabpic.user.db.dto;

import java.util.Map;

public class GoogleResponse implements OAuth2Response {

/* 예시
{sub=107280915300627517754, name=리들챌린저, given_name=리들챌린저, picture=https://lh3.googleusercontent.com/a/ACg8ocJ4dB9IXhs5UI-X_3dclyqvZWRwnxC4vfP-7sVNZR3sybM=s96-c, email=kij8025@gmail.com, email_verified=true, locale=ko}
 */

    private final Map<String, Object> attribute;

    public GoogleResponse(Map<String, Object> attribute) {

        this.attribute = attribute;
    }

    @Override
    public String getProvider() {

        return "google";
    }

    @Override
    public String getProviderId() {

        return attribute.get("sub").toString();
    }

    @Override
    public String getEmail() {

        return attribute.get("email").toString();
    }

    @Override
    public String getName() {

        return attribute.get("name").toString();
    }

    @Override
    public Map<String, Object> getAttribute() {
        return attribute;
    }
}
