package org.grabpic.grabpic.encyclopedia.controller;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.grabpic.grabpic.encyclopedia.db.dto.CollectionRegistDTO;
import org.grabpic.grabpic.encyclopedia.db.dto.GalleryPostDTO;
import org.grabpic.grabpic.encyclopedia.db.dto.InfoDTO;
import org.grabpic.grabpic.encyclopedia.db.dto.InfoPreviewDTO;
import org.grabpic.grabpic.encyclopedia.service.EncyclopediaService;
import org.grabpic.grabpic.fileUpload.service.FileUploadService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/encyclopedia")
public class EncyclopediaController {

    private final EncyclopediaService encyclopediaService;
    private final FileUploadService fileUploadService;

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

    @PostMapping("/add")
    public ResponseEntity<?> collectionAdd(@RequestBody CollectionRegistDTO collectionRegistDTO, HttpServletRequest request) {
        try {
            encyclopediaService.collectionRegist(collectionRegistDTO, request.getHeader("access"));
            // 몽고 DB에 차트용 데이터 추가하는 서비스
            // AI 서버에 보간용 사진 덩어리 보내는 서비스
            // 메인 사진으로 썸네일용 사진 생성해서 S3에 저장하고 정보에 같이 등록하는 서비스 or S3에서 썸네일 생성
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            log.error(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/detail/{encyclopediaId}")
    public ResponseEntity<?> collectionInfoDetail(@PathVariable long encyclopediaId) {
        try {
            InfoDTO infoDTO = encyclopediaService.collectionInfo(encyclopediaId);
            return ResponseEntity.status(HttpStatus.OK).body(infoDTO);
        } catch (Exception e) {
            log.error(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/gallery/list")
    public ResponseEntity<?> galleryList( @RequestParam int page, @RequestParam int limit, HttpServletRequest request) {
        String token = request.getHeader("access");
        try {
            List<GalleryPostDTO> galleryPostDTOList = encyclopediaService.galleryList(token, page, limit);
            return ResponseEntity.status(HttpStatus.OK).body(galleryPostDTOList);
        } catch (Exception e) {
            log.error(e.getMessage());
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
