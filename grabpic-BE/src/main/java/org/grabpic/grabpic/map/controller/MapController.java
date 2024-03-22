package org.grabpic.grabpic.map.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.grabpic.grabpic.map.db.dto.AroundCheckDTO;
import org.grabpic.grabpic.map.db.dto.AroundInfoDTO;
import org.grabpic.grabpic.map.service.MapService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/map")
public class MapController {

    private final MapService mapService;

    @PostMapping("/search")
    public ResponseEntity<?> aroundInfo(@RequestBody AroundCheckDTO aroundCheckDTO) {
        try {
            List<AroundInfoDTO> aroundInfoDTOList = mapService.aroundInfo(aroundCheckDTO);
            return ResponseEntity.status(HttpStatus.OK).body(aroundInfoDTOList);
        } catch (Exception e) {
            log.error(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
