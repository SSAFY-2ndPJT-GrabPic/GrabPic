package org.grabpic.grabpic.guestbook.controller;


import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.grabpic.grabpic.guestbook.db.dto.LoadBookDTO;
import org.grabpic.grabpic.guestbook.db.dto.SaveBookDTO;
import org.grabpic.grabpic.guestbook.db.entity.GuestBookEntity;
import org.grabpic.grabpic.guestbook.service.GuestBookService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/guestbook")
public class GuestBookController {

    private final GuestBookService guestBookService;

    @GetMapping("/{ownerId}")
    public ResponseEntity<?> loadBookList(@PathVariable long ownerId, @RequestParam int page, @RequestParam int limit) {

        List<LoadBookDTO> loadBookDTOList = guestBookService.loadBookList(ownerId, page, limit);
        return ResponseEntity.status(HttpStatus.OK).body(loadBookDTOList);
    }

    @GetMapping("/count/{ownerId}")
    public ResponseEntity<?> countBookList(@PathVariable long ownerId) {
        long count = guestBookService.countBookList(ownerId);
        return ResponseEntity.status(HttpStatus.OK).body(count);
    }

    @PostMapping("/add")
    public ResponseEntity<?> registBook(@RequestBody SaveBookDTO saveBookDTO, HttpServletRequest request) {
        saveBookDTO = guestBookService.registBook(saveBookDTO, request.getHeader("access"));
        return ResponseEntity.status(HttpStatus.OK).body(saveBookDTO);
    }

    //수정과 삭제가 없대요 .............................................................................
//    @PostMapping("/modify")
//    public ResponseEntity<?> modifyBook(@RequestBody SaveBookDTO saveBookDTO, HttpServletRequest request) {
//        guestBookService.registBook(saveBookDTO, request.getHeader("access"));
//        return new ResponseEntity<>(HttpStatus.OK);
//    }
//
//    @GetMapping("/delete")
//    public ResponseEntity<?>

}
