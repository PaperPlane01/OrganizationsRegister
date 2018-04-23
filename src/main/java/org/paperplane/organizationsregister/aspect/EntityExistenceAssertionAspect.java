package org.paperplane.organizationsregister.aspect;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.reflect.MethodSignature;
import org.paperplane.organizationsregister.annotation.AssertEntityExists;
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

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

@Component
@Aspect
public class EntityExistenceAssertionAspect {

    @Autowired
    private EntityNotFoundExceptionFactory entityNotFoundExceptionFactory;

    @Around("@annotation(assertEntityExistsById) && args(..)")
    public Object assertEntitiesExits(ProceedingJoinPoint proceedingJoinPoint, AssertEntityExists assertEntityExistsById) throws Throwable {
        Map<Class, Object> entityIdentifiers = new LinkedHashMap<>();
        MethodSignature methodSignature = (MethodSignature) proceedingJoinPoint.getSignature();
        List<Object> arguments = Arrays.asList(proceedingJoinPoint.getArgs());
        List<Parameter> parameters = Arrays.asList(methodSignature.getMethod().getParameters());
        Repositories repositories = RepositoriesSingleton.getInstance();

        for (int index = 0; index < parameters.size(); index++) {
            Parameter parameter = parameters.get(index);
            List<Annotation> parameterAnnotations = Arrays.asList(parameter.getAnnotations());

            for (Annotation annotation: parameterAnnotations) {
                if (annotation instanceof EntityIdentifier) {
                    entityIdentifiers.put(((EntityIdentifier) annotation).entityClass(), arguments.get(index));
                }
            }
        }

        for (Map.Entry<Class, Object> entryWithID : entityIdentifiers.entrySet()) {
            JpaRepository jpaRepository = (JpaRepository) repositories.getRepositoryFor(entryWithID.getKey()).get();

            if (!jpaRepository.existsById(entryWithID.getValue())) {
                throw entityNotFoundExceptionFactory.createForEntityClass(entryWithID.getKey());
            }
        }

        return proceedingJoinPoint.proceed();
    }
}