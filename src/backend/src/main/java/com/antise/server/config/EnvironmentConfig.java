package com.server.cocoapp.config;

import org.springframework.context.EnvironmentAware;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.lang.NonNull;

@Configuration
@PropertySource("classpath:application.properties")
public class EnvironmentConfig implements EnvironmentAware {

    private Environment env;

    @Override
    public void setEnvironment(@NonNull final Environment env) {
        this.env = env;
    }

    public String load(String key) {
        return env.getRequiredProperty(key);
    }

}
