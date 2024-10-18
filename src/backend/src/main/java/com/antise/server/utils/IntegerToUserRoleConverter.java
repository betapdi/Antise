package com.antise.server.utils;

import org.springframework.core.convert.converter.Converter;
import org.springframework.data.convert.ReadingConverter;
import org.springframework.lang.NonNull;

import com.antise.server.auth.entities.UserRole;

@ReadingConverter
public class IntegerToUserRoleConverter implements Converter<Integer, UserRole> {
    @Override
    public UserRole convert(@NonNull Integer source) {
        return UserRole.values()[source];
    }
}
