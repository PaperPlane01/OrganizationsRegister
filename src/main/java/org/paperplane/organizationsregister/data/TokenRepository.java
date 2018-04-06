package org.paperplane.organizationsregister.data;

import org.paperplane.organizationsregister.data.custom.TokenCustomQueriesCaller;
import org.paperplane.organizationsregister.domain.Token;
import org.paperplane.organizationsregister.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TokenRepository extends JpaRepository<Token, Long>, TokenCustomQueriesCaller {

    Token save(Token token);
    Token update(Token token);
    Token findById(long id);
    Token findByValue(String value);
    List<Token> findAllByUser(User user);

    @Modifying
    @Query("update Token set expired = true where id = :#{#token.id}")
    void markAsExpired(@Param("token") Token token);

    int getUserIdByTokenValue(String value);
}
