package org.paperplane.organizationsregister.aspect;

import org.paperplane.organizationsregister.annotation.RequiresRole;
import org.paperplane.organizationsregister.domain.Token;
import org.paperplane.organizationsregister.domain.User;
import org.paperplane.organizationsregister.domain.UserRole;
import org.paperplane.organizationsregister.exception.NoAuthorityException;
import org.paperplane.organizationsregister.exception.UnauthorizedException;
import org.paperplane.organizationsregister.service.TokenService;
import org.paperplane.organizationsregister.service.UserService;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.*;

@Component
@Aspect
public class AuthorizationAspect {
    @Autowired
    private UserService userService;

    @Autowired
    private TokenService tokenService;

    @Around("@annotation(org.paperplane.organizationsregister.annotation.RequiresToken) && args(tokenValue,..)")
    public Object checkToken(ProceedingJoinPoint joinPoint, String tokenValue) throws Throwable {
        if (tokenValue == null || tokenValue.isEmpty()) {
            throw new UnauthorizedException();
        }

        tokenService.assertTokenExists(tokenValue);
        return joinPoint.proceed();
    }

    @Around("@annotation(requiresRole) && args(tokenValue,..)")
    public Object checkUserAuthorities(ProceedingJoinPoint joinPoint, String tokenValue, RequiresRole requiresRole)
            throws Throwable {
        Token token = tokenService.getTokenByValue(tokenValue);
        User user = token.getUser();

        List<String> rolesAsStrings = Arrays.asList(requiresRole.anyOf());
        List<UserRole> requiredRoles = new ArrayList<>();

        rolesAsStrings.forEach(roleAsString -> requiredRoles.add(userService.getRoleByName(roleAsString)));

        if (user.getRoles().stream().noneMatch(requiredRoles::contains)) {
            throw new NoAuthorityException();
        }

        return joinPoint.proceed();
    }
}