package org.grabpic.grabpic.subscribe.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.grabpic.grabpic.subscribe.service.SubscribeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/subscribe")
public class SubscribeController {

    private final SubscribeService subscribeService;

    @GetMapping("/add/{ownerId}")
    public ResponseEntity<?> subscribeAdd(@PathVariable long ownerId, HttpServletRequest request) {

        String result = subscribeService.subscribeAdd(ownerId,request.getHeader("access"));
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @GetMapping("/delete/{ownerId}")
    public ResponseEntity<?> subscribeDel(@PathVariable long ownerId, HttpServletRequest request) {

        String result = subscribeService.subscribeDel(ownerId,request.getHeader("access"));
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }
}
