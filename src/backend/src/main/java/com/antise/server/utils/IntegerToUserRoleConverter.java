package com.server.cocoapp.utils;

import org.springframework.core.convert.converter.Converter;
import org.springframework.data.convert.ReadingConverter;
import org.springframework.lang.NonNull;

import com.server.cocoapp.auth.entities.UserRole;

@ReadingConverter
public class IntegerToUserRoleConverter implements Converter<Integer, UserRole> {
    @Override
    public UserRole convert(@NonNull Integer source) {
        return UserRole.values()[source];
    }
}
