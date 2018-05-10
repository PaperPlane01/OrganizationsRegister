package org.paperplane.organizationsregister.data.dialect;

import org.hibernate.dialect.SQLServerDialect;

import java.sql.Types;

public class SQLServerCustomDialect extends SQLServerDialect {

    public SQLServerCustomDialect() {
        super();
        registerColumnType(Types.BIGINT, "bigint");
    }
}
