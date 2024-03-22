package org.grabpic.grabpic.user.controller;

import org.grabpic.grabpic.errors.errorcode.UserError;
import org.grabpic.grabpic.errors.exception.RestApiException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class MainController {

    @GetMapping("/")
    public String mainP() {
        return "main Controller";
    }

    @GetMapping("/error")
    public String error(){
        throw new RestApiException(UserError.INACTIVE_USER);
    }
}