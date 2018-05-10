package org.paperplane.organizationsregister.data;

import org.paperplane.organizationsregister.domain.Token;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface TokenRepository extends JpaRepository<Token, Long> {
    Token save(Token token);
    Token findById(long id);
    Token findByValue(String value);

    @Modifying
    @Query("update Token set expired = true where id = :#{#token.id}")
    void markAsExpired(@Param("token") Token token);
}
