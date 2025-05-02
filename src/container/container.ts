import { Container, InjectionToken } from "@decorators/di";

import {

  JwtMiddleware,
  ServerErrorMiddleware,
  ServerNotFoundMiddleware,
  SignInMiddleware,
  SignUpMiddleware,
  ValidateUserMiddleware,
  ValidateRolMiddleware,
  ValidateAnioMiddleware,

} from "@infrastructure/middlewares";

import { ERROR_MIDDLEWARE } from "@decorators/express";

import { 

  UserRepository,
  RolRepository,
  AnioRepository

 } from "@core/domain/repositories";

import {

  HelloWorld,

  CreateUserUseCase,
  DeleteUserUseCase,
  GetAllUserUseCase,
  GetUserUseCase,
  UpdateUserUseCase,

  CreateRolUseCase,
  DeleteRolUseCase,
  GetAllRolUseCase,
  GetRolUseCase,
  UpdateRolUseCase,

  CreateAnioUseCase,
  DeleteAnioUseCase,
  GetAllAnioUseCase,
  GetAnioUseCase,
  UpdateAnioUseCase,

} from "@core/use-case";

// Middlewares
export const NOT_FOUND_MIDDLEWARE = new InjectionToken("NOT_FOUND_MIDDLEWARE");
export const PASSPORT_SIGNUP_MIDDLEWARE = new InjectionToken("PASSPORT_SIGNUP_MIDDLEWARE");
export const PASSPORT_SIGNIN_MIDDLEWARE = new InjectionToken("PASSPORT_SIGNIN_MIDDLEWARE");
export const JWT_MIDDLEWARE = new InjectionToken("JWT_MIDDLEWARE");

export const VALIDATE_USER_MIDDLEWARE = new InjectionToken("VALIDATE_USER_MIDDLEWARE");
export const VALIDATE_ROL_MIDDLEWARE = new InjectionToken("VALIDATE_ROL_MIDDLEWARE");
export const VALIDATE_ANIO_MIDDLEWARE = new InjectionToken("VALIDATE_ANIO_MIDDLEWARE");

// USE CASE
export const HELLO_USE_CASE = new InjectionToken("HELLO_USE_CASE");

//USER
export const CREATE_USER_USE_CASE = new InjectionToken("CREATE_USER_USE_CASE");
export const DELETE_USER_USE_CASE = new InjectionToken("DELETE_USER_USE_CASE");
export const GET_ALL_USER_USE_CASE = new InjectionToken("GET_ALL_USER_USE_CASE");
export const GET_USER_USE_CASE = new InjectionToken("GET_USER_USE_CASE");
export const UPDATE_USER_USE_CASE = new InjectionToken("UPDATE_USER_USE_CASE");

//ROL
export const CREATE_ROL_USE_CASE = new InjectionToken("CREATE_ROL_USE_CASE");
export const DELETE_ROL_USE_CASE = new InjectionToken("DELETE_ROL_USE_CASE");
export const GET_ALL_ROL_USE_CASE = new InjectionToken("GET_ALL_ROL_USE_CASE");
export const GET_ROL_USE_CASE = new InjectionToken("GET_ROL_USE_CASE");
export const UPDATE_ROL_USE_CASE = new InjectionToken("UPDATE_ROL_USE_CASE");

//ANIO
export const CREATE_ANIO_USE_CASE = new InjectionToken("CREATE_ANIO_USE_CASE");
export const DELETE_ANIO_USE_CASE = new InjectionToken("DELETE_ANIO_USE_CASE");
export const GET_ALL_ANIO_USE_CASE = new InjectionToken("GET_ALL_ANIO_USE_CASE");
export const GET_ANIO_USE_CASE = new InjectionToken("GET_ANIO_USE_CASE");
export const UPDATE_ANIO_USE_CASE = new InjectionToken("UPDATE_ANIO_USE_CASE");

// Repository
export const USER_REPOSITORY = new InjectionToken("USER_REPOSITORY");
export const ROL_REPOSITORY = new InjectionToken("ROL_REPOSITORY");
export const ANIO_REPOSITORY = new InjectionToken("ANIO_REPOSITORY");

// Container of dependency
Container.provide([
  { provide: NOT_FOUND_MIDDLEWARE, useClass: ServerNotFoundMiddleware },
  { provide: ERROR_MIDDLEWARE, useClass: ServerErrorMiddleware },
  { provide: PASSPORT_SIGNUP_MIDDLEWARE, useClass: SignUpMiddleware },
  { provide: PASSPORT_SIGNIN_MIDDLEWARE, useClass: SignInMiddleware },
  { provide: JWT_MIDDLEWARE, useClass: JwtMiddleware },

  { provide: VALIDATE_USER_MIDDLEWARE, useClass: ValidateUserMiddleware },
  { provide: VALIDATE_ROL_MIDDLEWARE, useClass: ValidateRolMiddleware },
  { provide: VALIDATE_ANIO_MIDDLEWARE, useClass: ValidateAnioMiddleware },

  { provide: HELLO_USE_CASE, useClass: HelloWorld },

  { provide: CREATE_USER_USE_CASE, useClass: CreateUserUseCase },
  { provide: DELETE_USER_USE_CASE, useClass: DeleteUserUseCase },
  { provide: GET_ALL_USER_USE_CASE, useClass: GetAllUserUseCase },
  { provide: GET_USER_USE_CASE, useClass: GetUserUseCase },
  { provide: UPDATE_USER_USE_CASE, useClass: UpdateUserUseCase },

  { provide: CREATE_ROL_USE_CASE, useClass: CreateRolUseCase },
  { provide: DELETE_ROL_USE_CASE, useClass: DeleteRolUseCase },
  { provide: GET_ALL_ROL_USE_CASE, useClass: GetAllRolUseCase },
  { provide: GET_ROL_USE_CASE, useClass: GetRolUseCase },
  { provide: UPDATE_ROL_USE_CASE, useClass: UpdateRolUseCase },

  { provide: CREATE_ANIO_USE_CASE, useClass: CreateAnioUseCase },
  { provide: DELETE_ANIO_USE_CASE, useClass: DeleteAnioUseCase },
  { provide: GET_ALL_ANIO_USE_CASE, useClass: GetAllAnioUseCase },
  { provide: GET_ANIO_USE_CASE, useClass: GetAnioUseCase },
  { provide: UPDATE_ANIO_USE_CASE, useClass: UpdateAnioUseCase },

  { provide: USER_REPOSITORY, useClass: UserRepository },
  { provide: ROL_REPOSITORY, useClass: RolRepository },
  { provide: ANIO_REPOSITORY, useClass: AnioRepository },
  
]);
