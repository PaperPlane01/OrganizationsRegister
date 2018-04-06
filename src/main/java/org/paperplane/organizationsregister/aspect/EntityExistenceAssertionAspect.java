package org.paperplane.organizationsregister.aspect;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.paperplane.organizationsregister.annotation.AssertEntityExistsById;
import org.paperplane.organizationsregister.annotation.EntityIdentifier;
import org.paperplane.organizationsregister.data.RepositoriesSingleton;
import org.paperplane.organizationsregister.exception.entitynotfoundexception.EntityNotFoundExceptionFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.support.Repositories;
import org.springframework.stereotype.Component;

import java.lang.annotation.Annotation;
import java.lang.reflect.Parameter;
import java.util.Arrays;

import java.util.List;

@Component
@Aspect
public class EntityExistenceAssertionAspect {

    @Autowired
    private EntityNotFoundExceptionFactory entityNotFoundExceptionFactory;

    @Around("@annotation(assertEntityExistsById) && args(..)")
    public Object assertEntityExists(ProceedingJoinPoint proceedingJoinPoint, AssertEntityExistsById assertEntityExistsById) throws Throwable {
        MethodSignature methodSignature = (MethodSignature) proceedingJoinPoint.getSignature();
        Object[] arguments = proceedingJoinPoint.getArgs();
        Object id = null;

        List<Parameter> parameters = Arrays.asList(methodSignature.getMethod().getParameters());

        for (int index = 0; index < parameters.size(); index++) {
            Parameter parameter = parameters.get(index);
            List<Annotation> parameterAnnotations = Arrays.asList(parameter.getAnnotations());

            for (Annotation annotation: parameterAnnotations) {
                if (annotation instanceof EntityIdentifier) {
                  id = arguments[index];
                }
            }
        }

        Repositories repositories = RepositoriesSingleton.getInstance();
        JpaRepository jpaRepository = (JpaRepository) repositories.getRepositoryFor(assertEntityExistsById.entityClass()).get();

        if (!jpaRepository.existsById(id)) {
            throw entityNotFoundExceptionFactory.createForEntityClass(assertEntityExistsById.entityClass());
        }

        return proceedingJoinPoint.proceed();
    }
}