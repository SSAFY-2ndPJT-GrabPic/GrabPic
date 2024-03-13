package org.grabpic.grabpic.encyclopedia.controller;

import lombok.extern.slf4j.Slf4j;
import org.grabpic.grabpic.encyclopedia.service.EncyclopediaService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Slf4j
@Controller
@ResponseBody
@RequestMapping("/encyclopedia")
public class EncyclopediaController {

    private final EncyclopediaService encyclopediaService;

    public EncyclopediaController(EncyclopediaService encyclopediaService) {
        this.encyclopediaService = encyclopediaService;
    }

}
