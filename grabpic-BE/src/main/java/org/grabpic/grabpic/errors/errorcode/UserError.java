package org.grabpic.grabpic.errors.errorcode;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;

@Getter
@RequiredArgsConstructor
public enum UserError implements ErrorCode{
    INACTIVE_USER(HttpStatus.FORBIDDEN, "User is inactive"),
    EXPIRED_MAIL_CODE(HttpStatus.UNAUTHORIZED, "Mail Code is Expired")
    ;

    private final HttpStatus httpStatus;
    private final String message;
}
