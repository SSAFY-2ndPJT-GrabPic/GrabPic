package org.grabpic.grabpic.user.config;

import lombok.Getter;

@Getter
public class BusinessLogicException extends RuntimeException {

    private final ExceptionCode exceptionCode;

    public BusinessLogicException(ExceptionCode exceptionCode) {
        super(exceptionCode.getMessage());
        this.exceptionCode = exceptionCode;
    }

    public BusinessLogicException(ExceptionCode exceptionCode, Throwable cause) {
        super(exceptionCode.getMessage(), cause);
        this.exceptionCode = exceptionCode;
    }

    @Getter
    public enum ExceptionCode {
        UNABLE_TO_SEND_EMAIL("Unable to send email. Please try again later."),
        MEMBER_EXISTS("MEMBER_EXISTS"),
        NO_SUCH_ALGORITHM("NO_SUCH_ALGORITHM");
        // 다른 예외 코드들...

        private final String message;

        ExceptionCode(String message) {
            this.message = message;
        }

    }

}
