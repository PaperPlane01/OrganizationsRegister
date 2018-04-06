package org.paperplane.organizationsregister.data.custom;

import org.paperplane.organizationsregister.domain.Token;

public interface TokenCustomQueriesCaller {
    Token update(Token token);
    int getUserIdByTokenValue(String value);
}
