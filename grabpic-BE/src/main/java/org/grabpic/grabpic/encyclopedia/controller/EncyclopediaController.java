package org.grabpic.grabpic.encyclopedia.controller;

import lombok.extern.slf4j.Slf4j;
import org.grabpic.grabpic.encyclopedia.db.dto.InfoPreviewDTO;
import org.grabpic.grabpic.encyclopedia.service.EncyclopediaService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Slf4j
@Controller
@ResponseBody
@RequestMapping("/encyclopedia")
public class EncyclopediaController {

    private final EncyclopediaService encyclopediaService;

    public EncyclopediaController(EncyclopediaService encyclopediaService) {
        this.encyclopediaService = encyclopediaService;
    }


    @GetMapping("/preview/{userId}")
    public ResponseEntity<?> previewInfo(@PathVariable long userId) {
        try {
            List<InfoPreviewDTO> infoPreviewDTOList = encyclopediaService.previewInfo(userId);
            return ResponseEntity.status(HttpStatus.OK).body(infoPreviewDTOList);
        } catch (Exception e) {
            log.error(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
