package org.grabpic.grabpic.guestbook.service;

import lombok.RequiredArgsConstructor;
import org.grabpic.grabpic.guestbook.db.dto.LoadBookDTO;
import org.grabpic.grabpic.guestbook.db.dto.SaveBookDTO;
import org.grabpic.grabpic.guestbook.db.entity.GuestBookEntity;
import org.grabpic.grabpic.guestbook.db.repository.GuestBookRepository;
import org.grabpic.grabpic.user.db.entity.UserEntity;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GuestBookServiceImpl implements GuestBookService {

    private final GuestBookRepository guestBookRepository;
    @Override
    public List<LoadBookDTO> loadBooklist(long ownerId) {
        List<GuestBookEntity> guestBookEntityList = guestBookRepository.findByOwner_UserId(ownerId);

        List<LoadBookDTO> loadBookDTOList = new ArrayList<>();

        for (GuestBookEntity guestBookEntity : guestBookEntityList) {
            LoadBookDTO loadBookDTO = new LoadBookDTO();
            loadBookDTO.setGuestBookId(guestBookEntity.getGuestBookId());
            loadBookDTO.setWriterNickName(guestBookEntity.getWriter().getNickname());
            loadBookDTO.setContent(guestBookEntity.getContent());
            loadBookDTO.setRegistDate(guestBookEntity.getRegistDate());

            loadBookDTOList.add(loadBookDTO);
        }

        return loadBookDTOList;
    }

    @Override
    public void registBook(SaveBookDTO saveBookDTO, String token) {

        GuestBookEntity guestBookEntity = GuestBookEntity.builder()
                .owner(UserEntity.builder().userId(saveBookDTO.getOwnerId()).build())
                .content(saveBookDTO.getContent())
                .build();
        guestBookRepository.save(guestBookEntity);
    }

    @Override
    public void modifyBook(SaveBookDTO saveBookDTO, String token) {

        GuestBookEntity guestBookEntity = GuestBookEntity.builder()
                .guestBookId(saveBookDTO.getGuestBookId())
                .owner(UserEntity.builder().userId(saveBookDTO.getOwnerId()).build())
                .content(saveBookDTO.getContent())
                .build();
        guestBookRepository.save(guestBookEntity);
    }

    @Override
    public int deleteBook(long guestBookId, String token) {

        return 0;
    }
}
