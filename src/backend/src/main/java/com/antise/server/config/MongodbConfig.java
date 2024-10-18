package com.antise.server.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.convert.MongoCustomConversions;

import com.antise.server.utils.IntegerToUserRoleConverter;
import com.antise.server.utils.UserRoleToIntegerConverter;

import java.util.Arrays;

@Configuration
public class MongodbConfig {
    @Bean
    public MongoCustomConversions customConversions() {
        return new MongoCustomConversions(Arrays.asList(
            new UserRoleToIntegerConverter(),
            new IntegerToUserRoleConverter()
        ));
    }
}