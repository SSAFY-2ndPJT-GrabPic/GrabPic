package org.grabpic.grabpic.user.service;

import org.grabpic.grabpic.user.db.dto.CustomUserDetails;
import org.grabpic.grabpic.user.db.entity.User;
import org.grabpic.grabpic.user.db.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {

        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        //DB에서 조회
        User userData = userRepository.findByEmail(username);
        System.out.println("혹시 여기로 오니 ?");
        if (userData != null) {

            System.out.println("유저 정보 있음" + userData.toString());

            //UserDetails에 담아서 return하면 AutneticationManager가 검증 함
            return new CustomUserDetails(userData);
        }

        return null;
    }
}
