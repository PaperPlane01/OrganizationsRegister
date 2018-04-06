package org.paperplane.organizationsregister.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.MediaType;
import org.springframework.web.accept.ContentNegotiationManager;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.*;
import org.springframework.web.servlet.view.ContentNegotiatingViewResolver;
import org.springframework.web.servlet.view.InternalResourceViewResolver;
import org.springframework.web.servlet.view.json.MappingJackson2JsonView;

import java.util.Arrays;

@Configuration
@EnableWebMvc
@ComponentScan(value = "org.paperplane.organizationsregister.web")
public class WebConfig implements WebMvcConfigurer {

    @Bean
    public ViewResolver contentNegotiationViewResolver(ContentNegotiationManager contentNegotiationManager) {
        ContentNegotiatingViewResolver contentNegotiatingViewResolver = new ContentNegotiatingViewResolver();
        contentNegotiatingViewResolver.setContentNegotiationManager(contentNegotiationManager);
        contentNegotiatingViewResolver.setViewResolvers(Arrays.asList(internalResourceViewResolver(), (s, locale) -> {
            MappingJackson2JsonView view = new MappingJackson2JsonView();
            view.setPrettyPrint(true);
            return view;
        }));

        return contentNegotiatingViewResolver;
    }

    @Override
    public void configureContentNegotiation(ContentNegotiationConfigurer configurer) {
        configurer.defaultContentType(MediaType.APPLICATION_JSON);
    }

    @Bean
    public ViewResolver internalResourceViewResolver() {
        InternalResourceViewResolver resolver = new InternalResourceViewResolver();
        resolver.setPrefix("/static/html/");
        resolver.setSuffix(".jsp");
        return resolver;
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/resources/**")
                .addResourceLocations("/resources/");
    }
}