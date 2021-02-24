# Tok

## About

Simple Spring Boot rest application with Angular and MongoDB.

## How to execute

### Execute rest server

Execute gradle bootRun command line inside TokServer folder, it will start test server. Test server will be accesible in http://localhost:8080.

### Execute client

Execute ng serve command line inside tokwapp folder, it will start test server. Test server will be accesible in http://localhost:4200.

Username: ray

Password: pass

Note: if you will to use npx execute npx ng serve.

### Important

You will need mongod daemon executing in background.

## Requirements

Java:

openjdk 14.0.2 2020-07-14
OpenJDK Runtime Environment (build 14.0.2+12-Ubuntu-120.04)
OpenJDK 64-Bit Server VM (build 14.0.2+12-Ubuntu-120.04, mixed mode, sharing)

Spring Boot: 2.4.2

MongoDB:

MongoDB shell version v4.4.3

db version v4.4.3
Build Info: {
    "version": "4.4.3",
    "gitVersion": "913d6b62acfbb344dde1b116f4161360acd8fd13",
    "openSSLVersion": "OpenSSL 1.1.1f  31 Mar 2020",
    "modules": [],
    "allocator": "tcmalloc",
    "environment": {
        "distmod": "ubuntu2004",
        "distarch": "x86_64",
        "target_arch": "x86_64"
    }
}

Angular:

See package.json inside tokwapp folder.

jbcrypt: 0.4
