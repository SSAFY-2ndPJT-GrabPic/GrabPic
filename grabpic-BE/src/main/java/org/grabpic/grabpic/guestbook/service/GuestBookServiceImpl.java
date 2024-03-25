package org.grabpic.grabpic.guestbook.service;

import lombok.RequiredArgsConstructor;
import org.grabpic.grabpic.guestbook.db.dto.LoadBookDTO;
import org.grabpic.grabpic.guestbook.db.dto.SaveBookDTO;
import org.grabpic.grabpic.guestbook.db.entity.GuestBookEntity;
import org.grabpic.grabpic.guestbook.db.repository.GuestBookRepository;
import org.grabpic.grabpic.user.config.JWTUtil;
import org.grabpic.grabpic.user.db.entity.UserEntity;
import org.grabpic.grabpic.user.db.repository.UserRepository;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GuestBookServiceImpl implements GuestBookService {

    private final GuestBookRepository guestBookRepository;
    private final UserRepository userRepository;
    private final JWTUtil jwtUtil;

    // 방명록 리스트 조회
    @Override
    public List<LoadBookDTO> loadBookList(long ownerId, int page, int limit) {

        Pageable pageable = PageRequest.of(page-1, limit, Sort.by(Sort.Direction.DESC, "registDateTime"));
        List<GuestBookEntity> guestBookEntityList = guestBookRepository.findByOwner_UserId(ownerId, pageable);
        List<LoadBookDTO> loadBookDTOList = new ArrayList<>();

        for (GuestBookEntity guestBookEntity : guestBookEntityList) {
            LoadBookDTO loadBookDTO = new LoadBookDTO();
            loadBookDTO.setWriterId(guestBookEntity.getWriter().getUserId());
            loadBookDTO.setGuestBookId(guestBookEntity.getGuestBookId());
            loadBookDTO.setWriterNickName(guestBookEntity.getWriter().getNickname());
            loadBookDTO.setContent(guestBookEntity.getContent());
            loadBookDTO.setRegistDateTime(guestBookEntity.getRegistDateTime());

            loadBookDTOList.add(loadBookDTO);
        }
        return loadBookDTOList;
    }

    @Override
    public long countBookList(long ownerId) {
        return guestBookRepository.countByOwner_UserId(ownerId);
    }

    //방명록 등록하기
    @Override
    public SaveBookDTO registBook(SaveBookDTO saveBookDTO, String token) {

        saveBookDTO.setRegistDateTime(LocalDateTime.now(ZoneId.of("Asia/Seoul")));
        UserEntity user = userRepository.findByEmail(jwtUtil.getEmail(token));
        GuestBookEntity guestBookEntity = GuestBookEntity.builder()
                .owner(UserEntity.builder().userId(saveBookDTO.getOwnerId()).build())
                .writer(UserEntity.builder().userId(user.getUserId()).build())
                .content(saveBookDTO.getContent())
                .registDateTime(saveBookDTO.getRegistDateTime())
                .build();
        guestBookEntity = guestBookRepository.save(guestBookEntity);
        saveBookDTO.setGuestBookId(guestBookEntity.getGuestBookId());
        saveBookDTO.setWriterId(user.getUserId());
        return saveBookDTO;
    }

    @Override
    public void modifyBook(SaveBookDTO saveBookDTO, String token) {

        UserEntity user = userRepository.findByEmail(jwtUtil.getEmail(token));
        if( user.getUserId() != saveBookDTO.getWriterId() ) {
            //작성자와 로그인유저가 불일치한 상황
            return;
        }

        GuestBookEntity guestBookEntity = GuestBookEntity.builder()
                .guestBookId(saveBookDTO.getGuestBookId())
                .owner(UserEntity.builder().userId(saveBookDTO.getOwnerId()).build())
                .writer(UserEntity.builder().userId(saveBookDTO.getWriterId()).build())
                .content(saveBookDTO.getContent())
                .registDateTime(LocalDateTime.now())
                .build();
        guestBookRepository.save(guestBookEntity);
    }

    @Override
    public int deleteBook(long guestBookId, String token) {

        UserEntity user = userRepository.findByEmail(jwtUtil.getEmail(token));

        if (guestBookId != user.getUserId()) {
            // 삭제하려는 글과 로그인 유저가 불일치
            return 1;
        }

        guestBookRepository.deleteById(guestBookId);
        return 0;
    }
}
