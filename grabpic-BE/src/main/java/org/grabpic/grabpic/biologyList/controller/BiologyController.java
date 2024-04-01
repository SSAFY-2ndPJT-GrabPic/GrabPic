package org.grabpic.grabpic.biologyList.controller;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.grabpic.grabpic.biologyList.db.dto.RegistInfoDTO;
import org.grabpic.grabpic.biologyList.service.BiologyListService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/biology")
public class BiologyController {

    private final BiologyListService biologyListService;

    @GetMapping("/info/{biologyId}")
    public ResponseEntity<?> bioinfo(@PathVariable long biologyId) {
        RegistInfoDTO registInfoDTO = biologyListService.getInfo(biologyId);
        return ResponseEntity.status(HttpStatus.OK).body(registInfoDTO);
    }
}
