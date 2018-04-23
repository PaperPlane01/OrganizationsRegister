package org.paperplane.organizationsregister.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.context.annotation.FilterType;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@Configuration
@EnableAspectJAutoProxy
@ComponentScan(basePackages = "org.paperplane.organizationsregister", excludeFilters
        = {@ComponentScan.Filter(type = FilterType.ANNOTATION, value = {
                EnableWebMvc.class, Repository.class, Service.class, EnableTransactionManagement.class})}
)
public class RootConfig {
}
