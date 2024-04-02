package org.grabpic.grabpic.gallery.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.grabpic.grabpic.encyclopedia.db.entity.EncyclopediaEntity;
import org.grabpic.grabpic.gallery.db.dto.GalleryPostDTO;
import org.grabpic.grabpic.gallery.service.GalleryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.HashSet;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/gallery")
public class GalleryController {

    private final GalleryService galleryService;

    @GetMapping("/log")
    public ResponseEntity<?> galleryLogAdd(HttpServletRequest request, @RequestParam("ency") long encyId) {
        try {
            galleryService.GalleryLogAdd(request.getHeader("access"), encyId);
        } catch (Exception e) {
            log.error(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/recommend")
    public ResponseEntity<?> recommendGalleryList(HttpServletRequest request, @RequestParam("page") int page, @RequestParam("limit") int limit) {
        try {
            HashSet<GalleryPostDTO> result = galleryService.recommendGalleryList(request.getHeader("access"), page, limit);
            return ResponseEntity.status(HttpStatus.OK).body(result);
        } catch (Exception e) {
            log.error(e.getMessage());
            return new ResponseEntity<>(HttpStatus.OK);
        }
    }

    @GetMapping("/test")
    public ResponseEntity<?> galleryTest() {
        return ResponseEntity.status(HttpStatus.OK).body(galleryService.galleryTest());
    }
}
