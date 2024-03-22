package org.grabpic.grabpic.guestbook.service;

import org.grabpic.grabpic.guestbook.db.dto.LoadBookDTO;
import org.grabpic.grabpic.guestbook.db.dto.SaveBookDTO;

import java.util.List;

public interface GuestBookService {

    public List<LoadBookDTO> loadBookList(long ownerId, int page, int limit);
    public long countBookList(long ownerId);
    public void registBook(SaveBookDTO saveBookDTO, String token);
    public void modifyBook(SaveBookDTO saveBookDTO, String token);
    public int deleteBook(long guestBookId, String token);
}
