package org.paperplane.organizationsregister.config;

import org.apache.commons.dbcp2.BasicDataSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.*;
import org.springframework.core.env.Environment;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.persistence.EntityManagerFactory;
import javax.sql.DataSource;
import java.util.Collection;
import java.util.Properties;

@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(basePackages = "org.paperplane.organizationsregister.data")
@PropertySource("classpath:database.properties")
@ComponentScans(value = {
        @ComponentScan("org.paperplane.organizationsregister.data"),
        @ComponentScan("org.paperplane.organizationsregister.service")
})
public class DatabaseConfig {

    @Autowired
    private Environment environment;

    @Bean
    public DataSource dataSource() {
        BasicDataSource basicDataSource = new BasicDataSource();
        basicDataSource.setDriverClassName(environment.getProperty("database.driver"));
        basicDataSource.setUsername(environment.getProperty("database.username"));
        basicDataSource.setPassword(environment.getProperty("database.password"));
        basicDataSource.setUrl(environment.getProperty("database.url"));
        basicDataSource.setInitialSize(Integer.valueOf(environment.getProperty("database.initial_number_of_connections")));
        basicDataSource.setMaxTotal(Integer.valueOf(environment.getProperty("database.max_number_of_connections")));
        return basicDataSource;
    }

    @Bean
    public LocalContainerEntityManagerFactoryBean entityManagerFactory() {
        LocalContainerEntityManagerFactoryBean entityManagerFactoryBean =
                new LocalContainerEntityManagerFactoryBean();
        entityManagerFactoryBean.setDataSource(dataSource());
        entityManagerFactoryBean.setPackagesToScan("org.paperplane.organizationsregister.domain");
        entityManagerFactoryBean.setJpaProperties(properties());
        entityManagerFactoryBean.setJpaVendorAdapter(new HibernateJpaVendorAdapter());
        return entityManagerFactoryBean;
    }

    @Bean
    @Autowired
    public PlatformTransactionManager transactionManager(EntityManagerFactory entityManagerFactory){
        JpaTransactionManager transactionManager = new JpaTransactionManager();
        transactionManager.setEntityManagerFactory(entityManagerFactory);
        return transactionManager;
    }

    private Properties properties() {
        Properties properties = new Properties();
        properties.put("hibernate.show_sql", environment.getProperty("hibernate.show_sql"));
        properties.put("hibernate.hbm2ddl.auto", environment.getProperty("hibernate.hbm2ddl.auto"));
        properties.put("hibernate.dialect", environment.getProperty("hibernate.dialect"));
        properties.put("hibernate.enable_lazy_load_no_trans", environment.getProperty("hibernate.enable_lazy_load_no_trans"));
        properties.put("hibernate.connection.autocommit", environment.getProperty("hibernate.connection.autocommit"));
        properties.put("hibernate.event.merge.entity_copy_observer", environment.getProperty("hibernate.event.merge.entity_copy_observer"));
        return properties;
    }
}
