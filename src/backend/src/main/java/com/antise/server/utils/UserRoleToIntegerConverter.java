package com.antise.server.utils;

import org.springframework.core.convert.converter.Converter;
import org.springframework.data.convert.WritingConverter;
import org.springframework.lang.NonNull;

import com.antise.server.auth.entities.UserRole;

@WritingConverter
public class UserRoleToIntegerConverter implements Converter<UserRole, Integer> {
    @Override
    public Integer convert(@NonNull UserRole source) {
        return source.ordinal();
    }
}
