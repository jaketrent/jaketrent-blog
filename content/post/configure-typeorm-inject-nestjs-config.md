---
categories:
  - "Code"
comments: true
description: "How to use the @nestjs/config package to configure the TypeOrm module"
image: "https://i.imgur.com/vAd44J3.jpg"
layout: post
metaKeywords: "nestjs, js, typeorm, nestjs/config, dependency injection, inject module config"
draft: false
tags:
  - "js"
  - "nestjs"
title: "Configure TypeORM by Injecting NestJS Config"
date: "2020-01-16"
---

NestJS comes with nice integration with [TypeORM](https://typeorm.io/#/) and with a nice [@nestjs/config](https://docs.nestjs.com/techniques/configuration) package.  But getting them to work well together using dependency injection was a bit of a trick.

<!--more-->

The docs make it look easy, and in the end it does look easy.  For some reason, the docs seem incomplete and the solution not obvious.  Here's one solution that worked for us.

## Configure TypeORM

TypeORM is a little ORM that works well with Nest.  It's configured in the `app.modules.ts`.  One includes it in the `imports` like so:

```typescript
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'test',
    }),
  ],
})
export class AppModule {}
```

## Values from Environment Variables

But one does not want to put static database connection strings into the committed code.  Some of those things are secret or at least can change.  So we want to pull them from the environment variables.

NestJS has a [@nestjs/config](https://docs.nestjs.com/techniques/configuration) package for that.  Once it's setup, the NestJS docs taunt you with the nice usage of [dependency-injected ConfigService](https://docs.nestjs.com/techniques/configuration#using-the-configservice):

```typescript
const dbUser = this.configService.get<string>('DATABASE_USER');
```

The issue is how to get the `ConfigService` available to the TypeORM config that's in the `AppModule` decorator.

## Injected ConfigService for TypeORM 

Here's what worked for us, in `app.module.ts`:

```typescript
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres' as 'postgres',
        host: configService.get('DATABASE_HOST', 'localhost'),
        port: configService.get<number>('DATABASE_PORT', 5432),
        username: configService.get('DATABASE_USER', 'postgres'),
        password: configService.get('DATABASE_PASS', 'postgres'),
        database: configService.get('DATABASE_SCHEMA', 'prism'),
      }),
    }),
  ],
})
export class AppModule {}
```

A few things are important here that weren't readily apparent from my naive reading of the docs:

- The `type: 'postgres' as 'postgres'` cast is important to specify [which polymorphic type of TypeOrmModuleOptions](https://github.com/nestjs/nest/issues/1119#issuecomment-424504139) you're returning from `useFactory`.
- `import { ConfigService } from '@nestjs/config'` is the class that you need to `inject` and is the type of the `useFactory` argument.  The docs were unclear on where this was imported from or possibly custom-implemented.
- The typing of number for `configService.get<number>()` and a number (5432) as fallback are important to get right as type for the `port` property, otherwise the TypeScript compiler is not happy with the `useFactory` implementation.

There are so many other examples on the web of people having to create their own `ConfigService` implementations.  The above solution avoids that (even though we ended up going to a custom implementation later ourselves in order to share config with migrations).

Hopefully this simple solution (which we hoped against hope existed!) saves someone some time.
