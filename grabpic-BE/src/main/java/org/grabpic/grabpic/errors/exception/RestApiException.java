package org.grabpic.grabpic.errors.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.grabpic.grabpic.errors.errorcode.ErrorCode;

@Getter
@RequiredArgsConstructor
public class RestApiException extends RuntimeException{
    private final ErrorCode errorCode;
}
