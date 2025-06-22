
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Salas
 * 
 */
export type Salas = $Result.DefaultSelection<Prisma.$SalasPayload>
/**
 * Model Salas_Usuarios
 * 
 */
export type Salas_Usuarios = $Result.DefaultSelection<Prisma.$Salas_UsuariosPayload>
/**
 * Model Mensagens
 * 
 */
export type Mensagens = $Result.DefaultSelection<Prisma.$MensagensPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Salas
 * const salas = await prisma.salas.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Salas
   * const salas = await prisma.salas.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.salas`: Exposes CRUD operations for the **Salas** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Salas
    * const salas = await prisma.salas.findMany()
    * ```
    */
  get salas(): Prisma.SalasDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.salas_Usuarios`: Exposes CRUD operations for the **Salas_Usuarios** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Salas_Usuarios
    * const salas_Usuarios = await prisma.salas_Usuarios.findMany()
    * ```
    */
  get salas_Usuarios(): Prisma.Salas_UsuariosDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.mensagens`: Exposes CRUD operations for the **Mensagens** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Mensagens
    * const mensagens = await prisma.mensagens.findMany()
    * ```
    */
  get mensagens(): Prisma.MensagensDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.10.1
   * Query Engine version: 9b628578b3b7cae625e8c927178f15a170e74a9c
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Salas: 'Salas',
    Salas_Usuarios: 'Salas_Usuarios',
    Mensagens: 'Mensagens'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "salas" | "salas_Usuarios" | "mensagens"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Salas: {
        payload: Prisma.$SalasPayload<ExtArgs>
        fields: Prisma.SalasFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SalasFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalasPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SalasFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalasPayload>
          }
          findFirst: {
            args: Prisma.SalasFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalasPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SalasFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalasPayload>
          }
          findMany: {
            args: Prisma.SalasFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalasPayload>[]
          }
          create: {
            args: Prisma.SalasCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalasPayload>
          }
          createMany: {
            args: Prisma.SalasCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.SalasDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalasPayload>
          }
          update: {
            args: Prisma.SalasUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalasPayload>
          }
          deleteMany: {
            args: Prisma.SalasDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SalasUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.SalasUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SalasPayload>
          }
          aggregate: {
            args: Prisma.SalasAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSalas>
          }
          groupBy: {
            args: Prisma.SalasGroupByArgs<ExtArgs>
            result: $Utils.Optional<SalasGroupByOutputType>[]
          }
          count: {
            args: Prisma.SalasCountArgs<ExtArgs>
            result: $Utils.Optional<SalasCountAggregateOutputType> | number
          }
        }
      }
      Salas_Usuarios: {
        payload: Prisma.$Salas_UsuariosPayload<ExtArgs>
        fields: Prisma.Salas_UsuariosFieldRefs
        operations: {
          findUnique: {
            args: Prisma.Salas_UsuariosFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Salas_UsuariosPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.Salas_UsuariosFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Salas_UsuariosPayload>
          }
          findFirst: {
            args: Prisma.Salas_UsuariosFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Salas_UsuariosPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.Salas_UsuariosFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Salas_UsuariosPayload>
          }
          findMany: {
            args: Prisma.Salas_UsuariosFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Salas_UsuariosPayload>[]
          }
          create: {
            args: Prisma.Salas_UsuariosCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Salas_UsuariosPayload>
          }
          createMany: {
            args: Prisma.Salas_UsuariosCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.Salas_UsuariosDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Salas_UsuariosPayload>
          }
          update: {
            args: Prisma.Salas_UsuariosUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Salas_UsuariosPayload>
          }
          deleteMany: {
            args: Prisma.Salas_UsuariosDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.Salas_UsuariosUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.Salas_UsuariosUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$Salas_UsuariosPayload>
          }
          aggregate: {
            args: Prisma.Salas_UsuariosAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSalas_Usuarios>
          }
          groupBy: {
            args: Prisma.Salas_UsuariosGroupByArgs<ExtArgs>
            result: $Utils.Optional<Salas_UsuariosGroupByOutputType>[]
          }
          count: {
            args: Prisma.Salas_UsuariosCountArgs<ExtArgs>
            result: $Utils.Optional<Salas_UsuariosCountAggregateOutputType> | number
          }
        }
      }
      Mensagens: {
        payload: Prisma.$MensagensPayload<ExtArgs>
        fields: Prisma.MensagensFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MensagensFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MensagensPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MensagensFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MensagensPayload>
          }
          findFirst: {
            args: Prisma.MensagensFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MensagensPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MensagensFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MensagensPayload>
          }
          findMany: {
            args: Prisma.MensagensFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MensagensPayload>[]
          }
          create: {
            args: Prisma.MensagensCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MensagensPayload>
          }
          createMany: {
            args: Prisma.MensagensCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.MensagensDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MensagensPayload>
          }
          update: {
            args: Prisma.MensagensUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MensagensPayload>
          }
          deleteMany: {
            args: Prisma.MensagensDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MensagensUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.MensagensUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MensagensPayload>
          }
          aggregate: {
            args: Prisma.MensagensAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMensagens>
          }
          groupBy: {
            args: Prisma.MensagensGroupByArgs<ExtArgs>
            result: $Utils.Optional<MensagensGroupByOutputType>[]
          }
          count: {
            args: Prisma.MensagensCountArgs<ExtArgs>
            result: $Utils.Optional<MensagensCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    salas?: SalasOmit
    salas_Usuarios?: Salas_UsuariosOmit
    mensagens?: MensagensOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type SalasCountOutputType
   */

  export type SalasCountOutputType = {
    Mensagens: number
    Salas_Usuarios: number
  }

  export type SalasCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Mensagens?: boolean | SalasCountOutputTypeCountMensagensArgs
    Salas_Usuarios?: boolean | SalasCountOutputTypeCountSalas_UsuariosArgs
  }

  // Custom InputTypes
  /**
   * SalasCountOutputType without action
   */
  export type SalasCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SalasCountOutputType
     */
    select?: SalasCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * SalasCountOutputType without action
   */
  export type SalasCountOutputTypeCountMensagensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MensagensWhereInput
  }

  /**
   * SalasCountOutputType without action
   */
  export type SalasCountOutputTypeCountSalas_UsuariosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: Salas_UsuariosWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Salas
   */

  export type AggregateSalas = {
    _count: SalasCountAggregateOutputType | null
    _avg: SalasAvgAggregateOutputType | null
    _sum: SalasSumAggregateOutputType | null
    _min: SalasMinAggregateOutputType | null
    _max: SalasMaxAggregateOutputType | null
  }

  export type SalasAvgAggregateOutputType = {
    pessoasConectadas: number | null
  }

  export type SalasSumAggregateOutputType = {
    pessoasConectadas: number | null
  }

  export type SalasMinAggregateOutputType = {
    codigoSala: string | null
    pessoasConectadas: number | null
    updateAt: Date | null
    token: string | null
    hostToken: string | null
  }

  export type SalasMaxAggregateOutputType = {
    codigoSala: string | null
    pessoasConectadas: number | null
    updateAt: Date | null
    token: string | null
    hostToken: string | null
  }

  export type SalasCountAggregateOutputType = {
    codigoSala: number
    pessoasConectadas: number
    updateAt: number
    token: number
    hostToken: number
    _all: number
  }


  export type SalasAvgAggregateInputType = {
    pessoasConectadas?: true
  }

  export type SalasSumAggregateInputType = {
    pessoasConectadas?: true
  }

  export type SalasMinAggregateInputType = {
    codigoSala?: true
    pessoasConectadas?: true
    updateAt?: true
    token?: true
    hostToken?: true
  }

  export type SalasMaxAggregateInputType = {
    codigoSala?: true
    pessoasConectadas?: true
    updateAt?: true
    token?: true
    hostToken?: true
  }

  export type SalasCountAggregateInputType = {
    codigoSala?: true
    pessoasConectadas?: true
    updateAt?: true
    token?: true
    hostToken?: true
    _all?: true
  }

  export type SalasAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Salas to aggregate.
     */
    where?: SalasWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Salas to fetch.
     */
    orderBy?: SalasOrderByWithRelationInput | SalasOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SalasWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Salas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Salas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Salas
    **/
    _count?: true | SalasCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SalasAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SalasSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SalasMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SalasMaxAggregateInputType
  }

  export type GetSalasAggregateType<T extends SalasAggregateArgs> = {
        [P in keyof T & keyof AggregateSalas]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSalas[P]>
      : GetScalarType<T[P], AggregateSalas[P]>
  }




  export type SalasGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SalasWhereInput
    orderBy?: SalasOrderByWithAggregationInput | SalasOrderByWithAggregationInput[]
    by: SalasScalarFieldEnum[] | SalasScalarFieldEnum
    having?: SalasScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SalasCountAggregateInputType | true
    _avg?: SalasAvgAggregateInputType
    _sum?: SalasSumAggregateInputType
    _min?: SalasMinAggregateInputType
    _max?: SalasMaxAggregateInputType
  }

  export type SalasGroupByOutputType = {
    codigoSala: string
    pessoasConectadas: number
    updateAt: Date
    token: string
    hostToken: string
    _count: SalasCountAggregateOutputType | null
    _avg: SalasAvgAggregateOutputType | null
    _sum: SalasSumAggregateOutputType | null
    _min: SalasMinAggregateOutputType | null
    _max: SalasMaxAggregateOutputType | null
  }

  type GetSalasGroupByPayload<T extends SalasGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SalasGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SalasGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SalasGroupByOutputType[P]>
            : GetScalarType<T[P], SalasGroupByOutputType[P]>
        }
      >
    >


  export type SalasSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    codigoSala?: boolean
    pessoasConectadas?: boolean
    updateAt?: boolean
    token?: boolean
    hostToken?: boolean
    Mensagens?: boolean | Salas$MensagensArgs<ExtArgs>
    Salas_Usuarios?: boolean | Salas$Salas_UsuariosArgs<ExtArgs>
    _count?: boolean | SalasCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["salas"]>



  export type SalasSelectScalar = {
    codigoSala?: boolean
    pessoasConectadas?: boolean
    updateAt?: boolean
    token?: boolean
    hostToken?: boolean
  }

  export type SalasOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"codigoSala" | "pessoasConectadas" | "updateAt" | "token" | "hostToken", ExtArgs["result"]["salas"]>
  export type SalasInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Mensagens?: boolean | Salas$MensagensArgs<ExtArgs>
    Salas_Usuarios?: boolean | Salas$Salas_UsuariosArgs<ExtArgs>
    _count?: boolean | SalasCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $SalasPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Salas"
    objects: {
      Mensagens: Prisma.$MensagensPayload<ExtArgs>[]
      Salas_Usuarios: Prisma.$Salas_UsuariosPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      codigoSala: string
      pessoasConectadas: number
      updateAt: Date
      token: string
      hostToken: string
    }, ExtArgs["result"]["salas"]>
    composites: {}
  }

  type SalasGetPayload<S extends boolean | null | undefined | SalasDefaultArgs> = $Result.GetResult<Prisma.$SalasPayload, S>

  type SalasCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SalasFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SalasCountAggregateInputType | true
    }

  export interface SalasDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Salas'], meta: { name: 'Salas' } }
    /**
     * Find zero or one Salas that matches the filter.
     * @param {SalasFindUniqueArgs} args - Arguments to find a Salas
     * @example
     * // Get one Salas
     * const salas = await prisma.salas.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SalasFindUniqueArgs>(args: SelectSubset<T, SalasFindUniqueArgs<ExtArgs>>): Prisma__SalasClient<$Result.GetResult<Prisma.$SalasPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Salas that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SalasFindUniqueOrThrowArgs} args - Arguments to find a Salas
     * @example
     * // Get one Salas
     * const salas = await prisma.salas.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SalasFindUniqueOrThrowArgs>(args: SelectSubset<T, SalasFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SalasClient<$Result.GetResult<Prisma.$SalasPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Salas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SalasFindFirstArgs} args - Arguments to find a Salas
     * @example
     * // Get one Salas
     * const salas = await prisma.salas.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SalasFindFirstArgs>(args?: SelectSubset<T, SalasFindFirstArgs<ExtArgs>>): Prisma__SalasClient<$Result.GetResult<Prisma.$SalasPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Salas that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SalasFindFirstOrThrowArgs} args - Arguments to find a Salas
     * @example
     * // Get one Salas
     * const salas = await prisma.salas.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SalasFindFirstOrThrowArgs>(args?: SelectSubset<T, SalasFindFirstOrThrowArgs<ExtArgs>>): Prisma__SalasClient<$Result.GetResult<Prisma.$SalasPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Salas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SalasFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Salas
     * const salas = await prisma.salas.findMany()
     * 
     * // Get first 10 Salas
     * const salas = await prisma.salas.findMany({ take: 10 })
     * 
     * // Only select the `codigoSala`
     * const salasWithCodigoSalaOnly = await prisma.salas.findMany({ select: { codigoSala: true } })
     * 
     */
    findMany<T extends SalasFindManyArgs>(args?: SelectSubset<T, SalasFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SalasPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Salas.
     * @param {SalasCreateArgs} args - Arguments to create a Salas.
     * @example
     * // Create one Salas
     * const Salas = await prisma.salas.create({
     *   data: {
     *     // ... data to create a Salas
     *   }
     * })
     * 
     */
    create<T extends SalasCreateArgs>(args: SelectSubset<T, SalasCreateArgs<ExtArgs>>): Prisma__SalasClient<$Result.GetResult<Prisma.$SalasPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Salas.
     * @param {SalasCreateManyArgs} args - Arguments to create many Salas.
     * @example
     * // Create many Salas
     * const salas = await prisma.salas.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SalasCreateManyArgs>(args?: SelectSubset<T, SalasCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Salas.
     * @param {SalasDeleteArgs} args - Arguments to delete one Salas.
     * @example
     * // Delete one Salas
     * const Salas = await prisma.salas.delete({
     *   where: {
     *     // ... filter to delete one Salas
     *   }
     * })
     * 
     */
    delete<T extends SalasDeleteArgs>(args: SelectSubset<T, SalasDeleteArgs<ExtArgs>>): Prisma__SalasClient<$Result.GetResult<Prisma.$SalasPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Salas.
     * @param {SalasUpdateArgs} args - Arguments to update one Salas.
     * @example
     * // Update one Salas
     * const salas = await prisma.salas.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SalasUpdateArgs>(args: SelectSubset<T, SalasUpdateArgs<ExtArgs>>): Prisma__SalasClient<$Result.GetResult<Prisma.$SalasPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Salas.
     * @param {SalasDeleteManyArgs} args - Arguments to filter Salas to delete.
     * @example
     * // Delete a few Salas
     * const { count } = await prisma.salas.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SalasDeleteManyArgs>(args?: SelectSubset<T, SalasDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Salas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SalasUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Salas
     * const salas = await prisma.salas.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SalasUpdateManyArgs>(args: SelectSubset<T, SalasUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Salas.
     * @param {SalasUpsertArgs} args - Arguments to update or create a Salas.
     * @example
     * // Update or create a Salas
     * const salas = await prisma.salas.upsert({
     *   create: {
     *     // ... data to create a Salas
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Salas we want to update
     *   }
     * })
     */
    upsert<T extends SalasUpsertArgs>(args: SelectSubset<T, SalasUpsertArgs<ExtArgs>>): Prisma__SalasClient<$Result.GetResult<Prisma.$SalasPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Salas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SalasCountArgs} args - Arguments to filter Salas to count.
     * @example
     * // Count the number of Salas
     * const count = await prisma.salas.count({
     *   where: {
     *     // ... the filter for the Salas we want to count
     *   }
     * })
    **/
    count<T extends SalasCountArgs>(
      args?: Subset<T, SalasCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SalasCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Salas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SalasAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SalasAggregateArgs>(args: Subset<T, SalasAggregateArgs>): Prisma.PrismaPromise<GetSalasAggregateType<T>>

    /**
     * Group by Salas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SalasGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SalasGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SalasGroupByArgs['orderBy'] }
        : { orderBy?: SalasGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SalasGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSalasGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Salas model
   */
  readonly fields: SalasFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Salas.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SalasClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Mensagens<T extends Salas$MensagensArgs<ExtArgs> = {}>(args?: Subset<T, Salas$MensagensArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MensagensPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    Salas_Usuarios<T extends Salas$Salas_UsuariosArgs<ExtArgs> = {}>(args?: Subset<T, Salas$Salas_UsuariosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$Salas_UsuariosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Salas model
   */
  interface SalasFieldRefs {
    readonly codigoSala: FieldRef<"Salas", 'String'>
    readonly pessoasConectadas: FieldRef<"Salas", 'Int'>
    readonly updateAt: FieldRef<"Salas", 'DateTime'>
    readonly token: FieldRef<"Salas", 'String'>
    readonly hostToken: FieldRef<"Salas", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Salas findUnique
   */
  export type SalasFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Salas
     */
    select?: SalasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Salas
     */
    omit?: SalasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SalasInclude<ExtArgs> | null
    /**
     * Filter, which Salas to fetch.
     */
    where: SalasWhereUniqueInput
  }

  /**
   * Salas findUniqueOrThrow
   */
  export type SalasFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Salas
     */
    select?: SalasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Salas
     */
    omit?: SalasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SalasInclude<ExtArgs> | null
    /**
     * Filter, which Salas to fetch.
     */
    where: SalasWhereUniqueInput
  }

  /**
   * Salas findFirst
   */
  export type SalasFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Salas
     */
    select?: SalasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Salas
     */
    omit?: SalasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SalasInclude<ExtArgs> | null
    /**
     * Filter, which Salas to fetch.
     */
    where?: SalasWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Salas to fetch.
     */
    orderBy?: SalasOrderByWithRelationInput | SalasOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Salas.
     */
    cursor?: SalasWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Salas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Salas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Salas.
     */
    distinct?: SalasScalarFieldEnum | SalasScalarFieldEnum[]
  }

  /**
   * Salas findFirstOrThrow
   */
  export type SalasFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Salas
     */
    select?: SalasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Salas
     */
    omit?: SalasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SalasInclude<ExtArgs> | null
    /**
     * Filter, which Salas to fetch.
     */
    where?: SalasWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Salas to fetch.
     */
    orderBy?: SalasOrderByWithRelationInput | SalasOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Salas.
     */
    cursor?: SalasWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Salas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Salas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Salas.
     */
    distinct?: SalasScalarFieldEnum | SalasScalarFieldEnum[]
  }

  /**
   * Salas findMany
   */
  export type SalasFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Salas
     */
    select?: SalasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Salas
     */
    omit?: SalasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SalasInclude<ExtArgs> | null
    /**
     * Filter, which Salas to fetch.
     */
    where?: SalasWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Salas to fetch.
     */
    orderBy?: SalasOrderByWithRelationInput | SalasOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Salas.
     */
    cursor?: SalasWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Salas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Salas.
     */
    skip?: number
    distinct?: SalasScalarFieldEnum | SalasScalarFieldEnum[]
  }

  /**
   * Salas create
   */
  export type SalasCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Salas
     */
    select?: SalasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Salas
     */
    omit?: SalasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SalasInclude<ExtArgs> | null
    /**
     * The data needed to create a Salas.
     */
    data: XOR<SalasCreateInput, SalasUncheckedCreateInput>
  }

  /**
   * Salas createMany
   */
  export type SalasCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Salas.
     */
    data: SalasCreateManyInput | SalasCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Salas update
   */
  export type SalasUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Salas
     */
    select?: SalasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Salas
     */
    omit?: SalasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SalasInclude<ExtArgs> | null
    /**
     * The data needed to update a Salas.
     */
    data: XOR<SalasUpdateInput, SalasUncheckedUpdateInput>
    /**
     * Choose, which Salas to update.
     */
    where: SalasWhereUniqueInput
  }

  /**
   * Salas updateMany
   */
  export type SalasUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Salas.
     */
    data: XOR<SalasUpdateManyMutationInput, SalasUncheckedUpdateManyInput>
    /**
     * Filter which Salas to update
     */
    where?: SalasWhereInput
    /**
     * Limit how many Salas to update.
     */
    limit?: number
  }

  /**
   * Salas upsert
   */
  export type SalasUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Salas
     */
    select?: SalasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Salas
     */
    omit?: SalasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SalasInclude<ExtArgs> | null
    /**
     * The filter to search for the Salas to update in case it exists.
     */
    where: SalasWhereUniqueInput
    /**
     * In case the Salas found by the `where` argument doesn't exist, create a new Salas with this data.
     */
    create: XOR<SalasCreateInput, SalasUncheckedCreateInput>
    /**
     * In case the Salas was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SalasUpdateInput, SalasUncheckedUpdateInput>
  }

  /**
   * Salas delete
   */
  export type SalasDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Salas
     */
    select?: SalasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Salas
     */
    omit?: SalasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SalasInclude<ExtArgs> | null
    /**
     * Filter which Salas to delete.
     */
    where: SalasWhereUniqueInput
  }

  /**
   * Salas deleteMany
   */
  export type SalasDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Salas to delete
     */
    where?: SalasWhereInput
    /**
     * Limit how many Salas to delete.
     */
    limit?: number
  }

  /**
   * Salas.Mensagens
   */
  export type Salas$MensagensArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mensagens
     */
    select?: MensagensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mensagens
     */
    omit?: MensagensOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MensagensInclude<ExtArgs> | null
    where?: MensagensWhereInput
    orderBy?: MensagensOrderByWithRelationInput | MensagensOrderByWithRelationInput[]
    cursor?: MensagensWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MensagensScalarFieldEnum | MensagensScalarFieldEnum[]
  }

  /**
   * Salas.Salas_Usuarios
   */
  export type Salas$Salas_UsuariosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Salas_Usuarios
     */
    select?: Salas_UsuariosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Salas_Usuarios
     */
    omit?: Salas_UsuariosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Salas_UsuariosInclude<ExtArgs> | null
    where?: Salas_UsuariosWhereInput
    orderBy?: Salas_UsuariosOrderByWithRelationInput | Salas_UsuariosOrderByWithRelationInput[]
    cursor?: Salas_UsuariosWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Salas_UsuariosScalarFieldEnum | Salas_UsuariosScalarFieldEnum[]
  }

  /**
   * Salas without action
   */
  export type SalasDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Salas
     */
    select?: SalasSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Salas
     */
    omit?: SalasOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SalasInclude<ExtArgs> | null
  }


  /**
   * Model Salas_Usuarios
   */

  export type AggregateSalas_Usuarios = {
    _count: Salas_UsuariosCountAggregateOutputType | null
    _avg: Salas_UsuariosAvgAggregateOutputType | null
    _sum: Salas_UsuariosSumAggregateOutputType | null
    _min: Salas_UsuariosMinAggregateOutputType | null
    _max: Salas_UsuariosMaxAggregateOutputType | null
  }

  export type Salas_UsuariosAvgAggregateOutputType = {
    id: number | null
  }

  export type Salas_UsuariosSumAggregateOutputType = {
    id: number | null
  }

  export type Salas_UsuariosMinAggregateOutputType = {
    id: number | null
    codigoSala: string | null
    userData: string | null
    userHash: string | null
    host: boolean | null
  }

  export type Salas_UsuariosMaxAggregateOutputType = {
    id: number | null
    codigoSala: string | null
    userData: string | null
    userHash: string | null
    host: boolean | null
  }

  export type Salas_UsuariosCountAggregateOutputType = {
    id: number
    codigoSala: number
    userData: number
    userHash: number
    host: number
    _all: number
  }


  export type Salas_UsuariosAvgAggregateInputType = {
    id?: true
  }

  export type Salas_UsuariosSumAggregateInputType = {
    id?: true
  }

  export type Salas_UsuariosMinAggregateInputType = {
    id?: true
    codigoSala?: true
    userData?: true
    userHash?: true
    host?: true
  }

  export type Salas_UsuariosMaxAggregateInputType = {
    id?: true
    codigoSala?: true
    userData?: true
    userHash?: true
    host?: true
  }

  export type Salas_UsuariosCountAggregateInputType = {
    id?: true
    codigoSala?: true
    userData?: true
    userHash?: true
    host?: true
    _all?: true
  }

  export type Salas_UsuariosAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Salas_Usuarios to aggregate.
     */
    where?: Salas_UsuariosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Salas_Usuarios to fetch.
     */
    orderBy?: Salas_UsuariosOrderByWithRelationInput | Salas_UsuariosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: Salas_UsuariosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Salas_Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Salas_Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Salas_Usuarios
    **/
    _count?: true | Salas_UsuariosCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: Salas_UsuariosAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: Salas_UsuariosSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Salas_UsuariosMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Salas_UsuariosMaxAggregateInputType
  }

  export type GetSalas_UsuariosAggregateType<T extends Salas_UsuariosAggregateArgs> = {
        [P in keyof T & keyof AggregateSalas_Usuarios]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSalas_Usuarios[P]>
      : GetScalarType<T[P], AggregateSalas_Usuarios[P]>
  }




  export type Salas_UsuariosGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: Salas_UsuariosWhereInput
    orderBy?: Salas_UsuariosOrderByWithAggregationInput | Salas_UsuariosOrderByWithAggregationInput[]
    by: Salas_UsuariosScalarFieldEnum[] | Salas_UsuariosScalarFieldEnum
    having?: Salas_UsuariosScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Salas_UsuariosCountAggregateInputType | true
    _avg?: Salas_UsuariosAvgAggregateInputType
    _sum?: Salas_UsuariosSumAggregateInputType
    _min?: Salas_UsuariosMinAggregateInputType
    _max?: Salas_UsuariosMaxAggregateInputType
  }

  export type Salas_UsuariosGroupByOutputType = {
    id: number
    codigoSala: string
    userData: string
    userHash: string
    host: boolean
    _count: Salas_UsuariosCountAggregateOutputType | null
    _avg: Salas_UsuariosAvgAggregateOutputType | null
    _sum: Salas_UsuariosSumAggregateOutputType | null
    _min: Salas_UsuariosMinAggregateOutputType | null
    _max: Salas_UsuariosMaxAggregateOutputType | null
  }

  type GetSalas_UsuariosGroupByPayload<T extends Salas_UsuariosGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Salas_UsuariosGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Salas_UsuariosGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Salas_UsuariosGroupByOutputType[P]>
            : GetScalarType<T[P], Salas_UsuariosGroupByOutputType[P]>
        }
      >
    >


  export type Salas_UsuariosSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    codigoSala?: boolean
    userData?: boolean
    userHash?: boolean
    host?: boolean
    sala?: boolean | SalasDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["salas_Usuarios"]>



  export type Salas_UsuariosSelectScalar = {
    id?: boolean
    codigoSala?: boolean
    userData?: boolean
    userHash?: boolean
    host?: boolean
  }

  export type Salas_UsuariosOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "codigoSala" | "userData" | "userHash" | "host", ExtArgs["result"]["salas_Usuarios"]>
  export type Salas_UsuariosInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sala?: boolean | SalasDefaultArgs<ExtArgs>
  }

  export type $Salas_UsuariosPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Salas_Usuarios"
    objects: {
      sala: Prisma.$SalasPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      codigoSala: string
      userData: string
      userHash: string
      host: boolean
    }, ExtArgs["result"]["salas_Usuarios"]>
    composites: {}
  }

  type Salas_UsuariosGetPayload<S extends boolean | null | undefined | Salas_UsuariosDefaultArgs> = $Result.GetResult<Prisma.$Salas_UsuariosPayload, S>

  type Salas_UsuariosCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<Salas_UsuariosFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Salas_UsuariosCountAggregateInputType | true
    }

  export interface Salas_UsuariosDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Salas_Usuarios'], meta: { name: 'Salas_Usuarios' } }
    /**
     * Find zero or one Salas_Usuarios that matches the filter.
     * @param {Salas_UsuariosFindUniqueArgs} args - Arguments to find a Salas_Usuarios
     * @example
     * // Get one Salas_Usuarios
     * const salas_Usuarios = await prisma.salas_Usuarios.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends Salas_UsuariosFindUniqueArgs>(args: SelectSubset<T, Salas_UsuariosFindUniqueArgs<ExtArgs>>): Prisma__Salas_UsuariosClient<$Result.GetResult<Prisma.$Salas_UsuariosPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Salas_Usuarios that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {Salas_UsuariosFindUniqueOrThrowArgs} args - Arguments to find a Salas_Usuarios
     * @example
     * // Get one Salas_Usuarios
     * const salas_Usuarios = await prisma.salas_Usuarios.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends Salas_UsuariosFindUniqueOrThrowArgs>(args: SelectSubset<T, Salas_UsuariosFindUniqueOrThrowArgs<ExtArgs>>): Prisma__Salas_UsuariosClient<$Result.GetResult<Prisma.$Salas_UsuariosPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Salas_Usuarios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Salas_UsuariosFindFirstArgs} args - Arguments to find a Salas_Usuarios
     * @example
     * // Get one Salas_Usuarios
     * const salas_Usuarios = await prisma.salas_Usuarios.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends Salas_UsuariosFindFirstArgs>(args?: SelectSubset<T, Salas_UsuariosFindFirstArgs<ExtArgs>>): Prisma__Salas_UsuariosClient<$Result.GetResult<Prisma.$Salas_UsuariosPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Salas_Usuarios that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Salas_UsuariosFindFirstOrThrowArgs} args - Arguments to find a Salas_Usuarios
     * @example
     * // Get one Salas_Usuarios
     * const salas_Usuarios = await prisma.salas_Usuarios.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends Salas_UsuariosFindFirstOrThrowArgs>(args?: SelectSubset<T, Salas_UsuariosFindFirstOrThrowArgs<ExtArgs>>): Prisma__Salas_UsuariosClient<$Result.GetResult<Prisma.$Salas_UsuariosPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Salas_Usuarios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Salas_UsuariosFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Salas_Usuarios
     * const salas_Usuarios = await prisma.salas_Usuarios.findMany()
     * 
     * // Get first 10 Salas_Usuarios
     * const salas_Usuarios = await prisma.salas_Usuarios.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const salas_UsuariosWithIdOnly = await prisma.salas_Usuarios.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends Salas_UsuariosFindManyArgs>(args?: SelectSubset<T, Salas_UsuariosFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$Salas_UsuariosPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Salas_Usuarios.
     * @param {Salas_UsuariosCreateArgs} args - Arguments to create a Salas_Usuarios.
     * @example
     * // Create one Salas_Usuarios
     * const Salas_Usuarios = await prisma.salas_Usuarios.create({
     *   data: {
     *     // ... data to create a Salas_Usuarios
     *   }
     * })
     * 
     */
    create<T extends Salas_UsuariosCreateArgs>(args: SelectSubset<T, Salas_UsuariosCreateArgs<ExtArgs>>): Prisma__Salas_UsuariosClient<$Result.GetResult<Prisma.$Salas_UsuariosPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Salas_Usuarios.
     * @param {Salas_UsuariosCreateManyArgs} args - Arguments to create many Salas_Usuarios.
     * @example
     * // Create many Salas_Usuarios
     * const salas_Usuarios = await prisma.salas_Usuarios.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends Salas_UsuariosCreateManyArgs>(args?: SelectSubset<T, Salas_UsuariosCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Salas_Usuarios.
     * @param {Salas_UsuariosDeleteArgs} args - Arguments to delete one Salas_Usuarios.
     * @example
     * // Delete one Salas_Usuarios
     * const Salas_Usuarios = await prisma.salas_Usuarios.delete({
     *   where: {
     *     // ... filter to delete one Salas_Usuarios
     *   }
     * })
     * 
     */
    delete<T extends Salas_UsuariosDeleteArgs>(args: SelectSubset<T, Salas_UsuariosDeleteArgs<ExtArgs>>): Prisma__Salas_UsuariosClient<$Result.GetResult<Prisma.$Salas_UsuariosPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Salas_Usuarios.
     * @param {Salas_UsuariosUpdateArgs} args - Arguments to update one Salas_Usuarios.
     * @example
     * // Update one Salas_Usuarios
     * const salas_Usuarios = await prisma.salas_Usuarios.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends Salas_UsuariosUpdateArgs>(args: SelectSubset<T, Salas_UsuariosUpdateArgs<ExtArgs>>): Prisma__Salas_UsuariosClient<$Result.GetResult<Prisma.$Salas_UsuariosPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Salas_Usuarios.
     * @param {Salas_UsuariosDeleteManyArgs} args - Arguments to filter Salas_Usuarios to delete.
     * @example
     * // Delete a few Salas_Usuarios
     * const { count } = await prisma.salas_Usuarios.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends Salas_UsuariosDeleteManyArgs>(args?: SelectSubset<T, Salas_UsuariosDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Salas_Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Salas_UsuariosUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Salas_Usuarios
     * const salas_Usuarios = await prisma.salas_Usuarios.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends Salas_UsuariosUpdateManyArgs>(args: SelectSubset<T, Salas_UsuariosUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Salas_Usuarios.
     * @param {Salas_UsuariosUpsertArgs} args - Arguments to update or create a Salas_Usuarios.
     * @example
     * // Update or create a Salas_Usuarios
     * const salas_Usuarios = await prisma.salas_Usuarios.upsert({
     *   create: {
     *     // ... data to create a Salas_Usuarios
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Salas_Usuarios we want to update
     *   }
     * })
     */
    upsert<T extends Salas_UsuariosUpsertArgs>(args: SelectSubset<T, Salas_UsuariosUpsertArgs<ExtArgs>>): Prisma__Salas_UsuariosClient<$Result.GetResult<Prisma.$Salas_UsuariosPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Salas_Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Salas_UsuariosCountArgs} args - Arguments to filter Salas_Usuarios to count.
     * @example
     * // Count the number of Salas_Usuarios
     * const count = await prisma.salas_Usuarios.count({
     *   where: {
     *     // ... the filter for the Salas_Usuarios we want to count
     *   }
     * })
    **/
    count<T extends Salas_UsuariosCountArgs>(
      args?: Subset<T, Salas_UsuariosCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Salas_UsuariosCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Salas_Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Salas_UsuariosAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Salas_UsuariosAggregateArgs>(args: Subset<T, Salas_UsuariosAggregateArgs>): Prisma.PrismaPromise<GetSalas_UsuariosAggregateType<T>>

    /**
     * Group by Salas_Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Salas_UsuariosGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends Salas_UsuariosGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: Salas_UsuariosGroupByArgs['orderBy'] }
        : { orderBy?: Salas_UsuariosGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, Salas_UsuariosGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSalas_UsuariosGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Salas_Usuarios model
   */
  readonly fields: Salas_UsuariosFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Salas_Usuarios.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__Salas_UsuariosClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sala<T extends SalasDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SalasDefaultArgs<ExtArgs>>): Prisma__SalasClient<$Result.GetResult<Prisma.$SalasPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Salas_Usuarios model
   */
  interface Salas_UsuariosFieldRefs {
    readonly id: FieldRef<"Salas_Usuarios", 'Int'>
    readonly codigoSala: FieldRef<"Salas_Usuarios", 'String'>
    readonly userData: FieldRef<"Salas_Usuarios", 'String'>
    readonly userHash: FieldRef<"Salas_Usuarios", 'String'>
    readonly host: FieldRef<"Salas_Usuarios", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Salas_Usuarios findUnique
   */
  export type Salas_UsuariosFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Salas_Usuarios
     */
    select?: Salas_UsuariosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Salas_Usuarios
     */
    omit?: Salas_UsuariosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Salas_UsuariosInclude<ExtArgs> | null
    /**
     * Filter, which Salas_Usuarios to fetch.
     */
    where: Salas_UsuariosWhereUniqueInput
  }

  /**
   * Salas_Usuarios findUniqueOrThrow
   */
  export type Salas_UsuariosFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Salas_Usuarios
     */
    select?: Salas_UsuariosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Salas_Usuarios
     */
    omit?: Salas_UsuariosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Salas_UsuariosInclude<ExtArgs> | null
    /**
     * Filter, which Salas_Usuarios to fetch.
     */
    where: Salas_UsuariosWhereUniqueInput
  }

  /**
   * Salas_Usuarios findFirst
   */
  export type Salas_UsuariosFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Salas_Usuarios
     */
    select?: Salas_UsuariosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Salas_Usuarios
     */
    omit?: Salas_UsuariosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Salas_UsuariosInclude<ExtArgs> | null
    /**
     * Filter, which Salas_Usuarios to fetch.
     */
    where?: Salas_UsuariosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Salas_Usuarios to fetch.
     */
    orderBy?: Salas_UsuariosOrderByWithRelationInput | Salas_UsuariosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Salas_Usuarios.
     */
    cursor?: Salas_UsuariosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Salas_Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Salas_Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Salas_Usuarios.
     */
    distinct?: Salas_UsuariosScalarFieldEnum | Salas_UsuariosScalarFieldEnum[]
  }

  /**
   * Salas_Usuarios findFirstOrThrow
   */
  export type Salas_UsuariosFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Salas_Usuarios
     */
    select?: Salas_UsuariosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Salas_Usuarios
     */
    omit?: Salas_UsuariosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Salas_UsuariosInclude<ExtArgs> | null
    /**
     * Filter, which Salas_Usuarios to fetch.
     */
    where?: Salas_UsuariosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Salas_Usuarios to fetch.
     */
    orderBy?: Salas_UsuariosOrderByWithRelationInput | Salas_UsuariosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Salas_Usuarios.
     */
    cursor?: Salas_UsuariosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Salas_Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Salas_Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Salas_Usuarios.
     */
    distinct?: Salas_UsuariosScalarFieldEnum | Salas_UsuariosScalarFieldEnum[]
  }

  /**
   * Salas_Usuarios findMany
   */
  export type Salas_UsuariosFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Salas_Usuarios
     */
    select?: Salas_UsuariosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Salas_Usuarios
     */
    omit?: Salas_UsuariosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Salas_UsuariosInclude<ExtArgs> | null
    /**
     * Filter, which Salas_Usuarios to fetch.
     */
    where?: Salas_UsuariosWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Salas_Usuarios to fetch.
     */
    orderBy?: Salas_UsuariosOrderByWithRelationInput | Salas_UsuariosOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Salas_Usuarios.
     */
    cursor?: Salas_UsuariosWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Salas_Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Salas_Usuarios.
     */
    skip?: number
    distinct?: Salas_UsuariosScalarFieldEnum | Salas_UsuariosScalarFieldEnum[]
  }

  /**
   * Salas_Usuarios create
   */
  export type Salas_UsuariosCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Salas_Usuarios
     */
    select?: Salas_UsuariosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Salas_Usuarios
     */
    omit?: Salas_UsuariosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Salas_UsuariosInclude<ExtArgs> | null
    /**
     * The data needed to create a Salas_Usuarios.
     */
    data: XOR<Salas_UsuariosCreateInput, Salas_UsuariosUncheckedCreateInput>
  }

  /**
   * Salas_Usuarios createMany
   */
  export type Salas_UsuariosCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Salas_Usuarios.
     */
    data: Salas_UsuariosCreateManyInput | Salas_UsuariosCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Salas_Usuarios update
   */
  export type Salas_UsuariosUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Salas_Usuarios
     */
    select?: Salas_UsuariosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Salas_Usuarios
     */
    omit?: Salas_UsuariosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Salas_UsuariosInclude<ExtArgs> | null
    /**
     * The data needed to update a Salas_Usuarios.
     */
    data: XOR<Salas_UsuariosUpdateInput, Salas_UsuariosUncheckedUpdateInput>
    /**
     * Choose, which Salas_Usuarios to update.
     */
    where: Salas_UsuariosWhereUniqueInput
  }

  /**
   * Salas_Usuarios updateMany
   */
  export type Salas_UsuariosUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Salas_Usuarios.
     */
    data: XOR<Salas_UsuariosUpdateManyMutationInput, Salas_UsuariosUncheckedUpdateManyInput>
    /**
     * Filter which Salas_Usuarios to update
     */
    where?: Salas_UsuariosWhereInput
    /**
     * Limit how many Salas_Usuarios to update.
     */
    limit?: number
  }

  /**
   * Salas_Usuarios upsert
   */
  export type Salas_UsuariosUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Salas_Usuarios
     */
    select?: Salas_UsuariosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Salas_Usuarios
     */
    omit?: Salas_UsuariosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Salas_UsuariosInclude<ExtArgs> | null
    /**
     * The filter to search for the Salas_Usuarios to update in case it exists.
     */
    where: Salas_UsuariosWhereUniqueInput
    /**
     * In case the Salas_Usuarios found by the `where` argument doesn't exist, create a new Salas_Usuarios with this data.
     */
    create: XOR<Salas_UsuariosCreateInput, Salas_UsuariosUncheckedCreateInput>
    /**
     * In case the Salas_Usuarios was found with the provided `where` argument, update it with this data.
     */
    update: XOR<Salas_UsuariosUpdateInput, Salas_UsuariosUncheckedUpdateInput>
  }

  /**
   * Salas_Usuarios delete
   */
  export type Salas_UsuariosDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Salas_Usuarios
     */
    select?: Salas_UsuariosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Salas_Usuarios
     */
    omit?: Salas_UsuariosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Salas_UsuariosInclude<ExtArgs> | null
    /**
     * Filter which Salas_Usuarios to delete.
     */
    where: Salas_UsuariosWhereUniqueInput
  }

  /**
   * Salas_Usuarios deleteMany
   */
  export type Salas_UsuariosDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Salas_Usuarios to delete
     */
    where?: Salas_UsuariosWhereInput
    /**
     * Limit how many Salas_Usuarios to delete.
     */
    limit?: number
  }

  /**
   * Salas_Usuarios without action
   */
  export type Salas_UsuariosDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Salas_Usuarios
     */
    select?: Salas_UsuariosSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Salas_Usuarios
     */
    omit?: Salas_UsuariosOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Salas_UsuariosInclude<ExtArgs> | null
  }


  /**
   * Model Mensagens
   */

  export type AggregateMensagens = {
    _count: MensagensCountAggregateOutputType | null
    _avg: MensagensAvgAggregateOutputType | null
    _sum: MensagensSumAggregateOutputType | null
    _min: MensagensMinAggregateOutputType | null
    _max: MensagensMaxAggregateOutputType | null
  }

  export type MensagensAvgAggregateOutputType = {
    id: number | null
  }

  export type MensagensSumAggregateOutputType = {
    id: number | null
  }

  export type MensagensMinAggregateOutputType = {
    id: number | null
    mensagem: string | null
    mensagemTraduzida: string | null
    usuario: string | null
    dataEnvio: Date | null
    codigoSala: string | null
    apelido: string | null
    avatar: string | null
    linguaOriginal: string | null
  }

  export type MensagensMaxAggregateOutputType = {
    id: number | null
    mensagem: string | null
    mensagemTraduzida: string | null
    usuario: string | null
    dataEnvio: Date | null
    codigoSala: string | null
    apelido: string | null
    avatar: string | null
    linguaOriginal: string | null
  }

  export type MensagensCountAggregateOutputType = {
    id: number
    mensagem: number
    mensagemTraduzida: number
    usuario: number
    dataEnvio: number
    codigoSala: number
    apelido: number
    avatar: number
    linguaOriginal: number
    _all: number
  }


  export type MensagensAvgAggregateInputType = {
    id?: true
  }

  export type MensagensSumAggregateInputType = {
    id?: true
  }

  export type MensagensMinAggregateInputType = {
    id?: true
    mensagem?: true
    mensagemTraduzida?: true
    usuario?: true
    dataEnvio?: true
    codigoSala?: true
    apelido?: true
    avatar?: true
    linguaOriginal?: true
  }

  export type MensagensMaxAggregateInputType = {
    id?: true
    mensagem?: true
    mensagemTraduzida?: true
    usuario?: true
    dataEnvio?: true
    codigoSala?: true
    apelido?: true
    avatar?: true
    linguaOriginal?: true
  }

  export type MensagensCountAggregateInputType = {
    id?: true
    mensagem?: true
    mensagemTraduzida?: true
    usuario?: true
    dataEnvio?: true
    codigoSala?: true
    apelido?: true
    avatar?: true
    linguaOriginal?: true
    _all?: true
  }

  export type MensagensAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Mensagens to aggregate.
     */
    where?: MensagensWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Mensagens to fetch.
     */
    orderBy?: MensagensOrderByWithRelationInput | MensagensOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MensagensWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Mensagens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Mensagens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Mensagens
    **/
    _count?: true | MensagensCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MensagensAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MensagensSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MensagensMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MensagensMaxAggregateInputType
  }

  export type GetMensagensAggregateType<T extends MensagensAggregateArgs> = {
        [P in keyof T & keyof AggregateMensagens]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMensagens[P]>
      : GetScalarType<T[P], AggregateMensagens[P]>
  }




  export type MensagensGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MensagensWhereInput
    orderBy?: MensagensOrderByWithAggregationInput | MensagensOrderByWithAggregationInput[]
    by: MensagensScalarFieldEnum[] | MensagensScalarFieldEnum
    having?: MensagensScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MensagensCountAggregateInputType | true
    _avg?: MensagensAvgAggregateInputType
    _sum?: MensagensSumAggregateInputType
    _min?: MensagensMinAggregateInputType
    _max?: MensagensMaxAggregateInputType
  }

  export type MensagensGroupByOutputType = {
    id: number
    mensagem: string
    mensagemTraduzida: string | null
    usuario: string
    dataEnvio: Date
    codigoSala: string
    apelido: string | null
    avatar: string | null
    linguaOriginal: string | null
    _count: MensagensCountAggregateOutputType | null
    _avg: MensagensAvgAggregateOutputType | null
    _sum: MensagensSumAggregateOutputType | null
    _min: MensagensMinAggregateOutputType | null
    _max: MensagensMaxAggregateOutputType | null
  }

  type GetMensagensGroupByPayload<T extends MensagensGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MensagensGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MensagensGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MensagensGroupByOutputType[P]>
            : GetScalarType<T[P], MensagensGroupByOutputType[P]>
        }
      >
    >


  export type MensagensSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    mensagem?: boolean
    mensagemTraduzida?: boolean
    usuario?: boolean
    dataEnvio?: boolean
    codigoSala?: boolean
    apelido?: boolean
    avatar?: boolean
    linguaOriginal?: boolean
    sala?: boolean | SalasDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mensagens"]>



  export type MensagensSelectScalar = {
    id?: boolean
    mensagem?: boolean
    mensagemTraduzida?: boolean
    usuario?: boolean
    dataEnvio?: boolean
    codigoSala?: boolean
    apelido?: boolean
    avatar?: boolean
    linguaOriginal?: boolean
  }

  export type MensagensOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "mensagem" | "mensagemTraduzida" | "usuario" | "dataEnvio" | "codigoSala" | "apelido" | "avatar" | "linguaOriginal", ExtArgs["result"]["mensagens"]>
  export type MensagensInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    sala?: boolean | SalasDefaultArgs<ExtArgs>
  }

  export type $MensagensPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Mensagens"
    objects: {
      sala: Prisma.$SalasPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      mensagem: string
      mensagemTraduzida: string | null
      usuario: string
      dataEnvio: Date
      codigoSala: string
      apelido: string | null
      avatar: string | null
      linguaOriginal: string | null
    }, ExtArgs["result"]["mensagens"]>
    composites: {}
  }

  type MensagensGetPayload<S extends boolean | null | undefined | MensagensDefaultArgs> = $Result.GetResult<Prisma.$MensagensPayload, S>

  type MensagensCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MensagensFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MensagensCountAggregateInputType | true
    }

  export interface MensagensDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Mensagens'], meta: { name: 'Mensagens' } }
    /**
     * Find zero or one Mensagens that matches the filter.
     * @param {MensagensFindUniqueArgs} args - Arguments to find a Mensagens
     * @example
     * // Get one Mensagens
     * const mensagens = await prisma.mensagens.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MensagensFindUniqueArgs>(args: SelectSubset<T, MensagensFindUniqueArgs<ExtArgs>>): Prisma__MensagensClient<$Result.GetResult<Prisma.$MensagensPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Mensagens that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MensagensFindUniqueOrThrowArgs} args - Arguments to find a Mensagens
     * @example
     * // Get one Mensagens
     * const mensagens = await prisma.mensagens.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MensagensFindUniqueOrThrowArgs>(args: SelectSubset<T, MensagensFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MensagensClient<$Result.GetResult<Prisma.$MensagensPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Mensagens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MensagensFindFirstArgs} args - Arguments to find a Mensagens
     * @example
     * // Get one Mensagens
     * const mensagens = await prisma.mensagens.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MensagensFindFirstArgs>(args?: SelectSubset<T, MensagensFindFirstArgs<ExtArgs>>): Prisma__MensagensClient<$Result.GetResult<Prisma.$MensagensPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Mensagens that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MensagensFindFirstOrThrowArgs} args - Arguments to find a Mensagens
     * @example
     * // Get one Mensagens
     * const mensagens = await prisma.mensagens.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MensagensFindFirstOrThrowArgs>(args?: SelectSubset<T, MensagensFindFirstOrThrowArgs<ExtArgs>>): Prisma__MensagensClient<$Result.GetResult<Prisma.$MensagensPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Mensagens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MensagensFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Mensagens
     * const mensagens = await prisma.mensagens.findMany()
     * 
     * // Get first 10 Mensagens
     * const mensagens = await prisma.mensagens.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const mensagensWithIdOnly = await prisma.mensagens.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MensagensFindManyArgs>(args?: SelectSubset<T, MensagensFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MensagensPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Mensagens.
     * @param {MensagensCreateArgs} args - Arguments to create a Mensagens.
     * @example
     * // Create one Mensagens
     * const Mensagens = await prisma.mensagens.create({
     *   data: {
     *     // ... data to create a Mensagens
     *   }
     * })
     * 
     */
    create<T extends MensagensCreateArgs>(args: SelectSubset<T, MensagensCreateArgs<ExtArgs>>): Prisma__MensagensClient<$Result.GetResult<Prisma.$MensagensPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Mensagens.
     * @param {MensagensCreateManyArgs} args - Arguments to create many Mensagens.
     * @example
     * // Create many Mensagens
     * const mensagens = await prisma.mensagens.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MensagensCreateManyArgs>(args?: SelectSubset<T, MensagensCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Mensagens.
     * @param {MensagensDeleteArgs} args - Arguments to delete one Mensagens.
     * @example
     * // Delete one Mensagens
     * const Mensagens = await prisma.mensagens.delete({
     *   where: {
     *     // ... filter to delete one Mensagens
     *   }
     * })
     * 
     */
    delete<T extends MensagensDeleteArgs>(args: SelectSubset<T, MensagensDeleteArgs<ExtArgs>>): Prisma__MensagensClient<$Result.GetResult<Prisma.$MensagensPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Mensagens.
     * @param {MensagensUpdateArgs} args - Arguments to update one Mensagens.
     * @example
     * // Update one Mensagens
     * const mensagens = await prisma.mensagens.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MensagensUpdateArgs>(args: SelectSubset<T, MensagensUpdateArgs<ExtArgs>>): Prisma__MensagensClient<$Result.GetResult<Prisma.$MensagensPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Mensagens.
     * @param {MensagensDeleteManyArgs} args - Arguments to filter Mensagens to delete.
     * @example
     * // Delete a few Mensagens
     * const { count } = await prisma.mensagens.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MensagensDeleteManyArgs>(args?: SelectSubset<T, MensagensDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Mensagens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MensagensUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Mensagens
     * const mensagens = await prisma.mensagens.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MensagensUpdateManyArgs>(args: SelectSubset<T, MensagensUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Mensagens.
     * @param {MensagensUpsertArgs} args - Arguments to update or create a Mensagens.
     * @example
     * // Update or create a Mensagens
     * const mensagens = await prisma.mensagens.upsert({
     *   create: {
     *     // ... data to create a Mensagens
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Mensagens we want to update
     *   }
     * })
     */
    upsert<T extends MensagensUpsertArgs>(args: SelectSubset<T, MensagensUpsertArgs<ExtArgs>>): Prisma__MensagensClient<$Result.GetResult<Prisma.$MensagensPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Mensagens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MensagensCountArgs} args - Arguments to filter Mensagens to count.
     * @example
     * // Count the number of Mensagens
     * const count = await prisma.mensagens.count({
     *   where: {
     *     // ... the filter for the Mensagens we want to count
     *   }
     * })
    **/
    count<T extends MensagensCountArgs>(
      args?: Subset<T, MensagensCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MensagensCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Mensagens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MensagensAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MensagensAggregateArgs>(args: Subset<T, MensagensAggregateArgs>): Prisma.PrismaPromise<GetMensagensAggregateType<T>>

    /**
     * Group by Mensagens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MensagensGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MensagensGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MensagensGroupByArgs['orderBy'] }
        : { orderBy?: MensagensGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MensagensGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMensagensGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Mensagens model
   */
  readonly fields: MensagensFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Mensagens.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MensagensClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    sala<T extends SalasDefaultArgs<ExtArgs> = {}>(args?: Subset<T, SalasDefaultArgs<ExtArgs>>): Prisma__SalasClient<$Result.GetResult<Prisma.$SalasPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Mensagens model
   */
  interface MensagensFieldRefs {
    readonly id: FieldRef<"Mensagens", 'Int'>
    readonly mensagem: FieldRef<"Mensagens", 'String'>
    readonly mensagemTraduzida: FieldRef<"Mensagens", 'String'>
    readonly usuario: FieldRef<"Mensagens", 'String'>
    readonly dataEnvio: FieldRef<"Mensagens", 'DateTime'>
    readonly codigoSala: FieldRef<"Mensagens", 'String'>
    readonly apelido: FieldRef<"Mensagens", 'String'>
    readonly avatar: FieldRef<"Mensagens", 'String'>
    readonly linguaOriginal: FieldRef<"Mensagens", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Mensagens findUnique
   */
  export type MensagensFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mensagens
     */
    select?: MensagensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mensagens
     */
    omit?: MensagensOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MensagensInclude<ExtArgs> | null
    /**
     * Filter, which Mensagens to fetch.
     */
    where: MensagensWhereUniqueInput
  }

  /**
   * Mensagens findUniqueOrThrow
   */
  export type MensagensFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mensagens
     */
    select?: MensagensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mensagens
     */
    omit?: MensagensOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MensagensInclude<ExtArgs> | null
    /**
     * Filter, which Mensagens to fetch.
     */
    where: MensagensWhereUniqueInput
  }

  /**
   * Mensagens findFirst
   */
  export type MensagensFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mensagens
     */
    select?: MensagensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mensagens
     */
    omit?: MensagensOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MensagensInclude<ExtArgs> | null
    /**
     * Filter, which Mensagens to fetch.
     */
    where?: MensagensWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Mensagens to fetch.
     */
    orderBy?: MensagensOrderByWithRelationInput | MensagensOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Mensagens.
     */
    cursor?: MensagensWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Mensagens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Mensagens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Mensagens.
     */
    distinct?: MensagensScalarFieldEnum | MensagensScalarFieldEnum[]
  }

  /**
   * Mensagens findFirstOrThrow
   */
  export type MensagensFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mensagens
     */
    select?: MensagensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mensagens
     */
    omit?: MensagensOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MensagensInclude<ExtArgs> | null
    /**
     * Filter, which Mensagens to fetch.
     */
    where?: MensagensWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Mensagens to fetch.
     */
    orderBy?: MensagensOrderByWithRelationInput | MensagensOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Mensagens.
     */
    cursor?: MensagensWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Mensagens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Mensagens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Mensagens.
     */
    distinct?: MensagensScalarFieldEnum | MensagensScalarFieldEnum[]
  }

  /**
   * Mensagens findMany
   */
  export type MensagensFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mensagens
     */
    select?: MensagensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mensagens
     */
    omit?: MensagensOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MensagensInclude<ExtArgs> | null
    /**
     * Filter, which Mensagens to fetch.
     */
    where?: MensagensWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Mensagens to fetch.
     */
    orderBy?: MensagensOrderByWithRelationInput | MensagensOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Mensagens.
     */
    cursor?: MensagensWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Mensagens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Mensagens.
     */
    skip?: number
    distinct?: MensagensScalarFieldEnum | MensagensScalarFieldEnum[]
  }

  /**
   * Mensagens create
   */
  export type MensagensCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mensagens
     */
    select?: MensagensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mensagens
     */
    omit?: MensagensOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MensagensInclude<ExtArgs> | null
    /**
     * The data needed to create a Mensagens.
     */
    data: XOR<MensagensCreateInput, MensagensUncheckedCreateInput>
  }

  /**
   * Mensagens createMany
   */
  export type MensagensCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Mensagens.
     */
    data: MensagensCreateManyInput | MensagensCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Mensagens update
   */
  export type MensagensUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mensagens
     */
    select?: MensagensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mensagens
     */
    omit?: MensagensOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MensagensInclude<ExtArgs> | null
    /**
     * The data needed to update a Mensagens.
     */
    data: XOR<MensagensUpdateInput, MensagensUncheckedUpdateInput>
    /**
     * Choose, which Mensagens to update.
     */
    where: MensagensWhereUniqueInput
  }

  /**
   * Mensagens updateMany
   */
  export type MensagensUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Mensagens.
     */
    data: XOR<MensagensUpdateManyMutationInput, MensagensUncheckedUpdateManyInput>
    /**
     * Filter which Mensagens to update
     */
    where?: MensagensWhereInput
    /**
     * Limit how many Mensagens to update.
     */
    limit?: number
  }

  /**
   * Mensagens upsert
   */
  export type MensagensUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mensagens
     */
    select?: MensagensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mensagens
     */
    omit?: MensagensOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MensagensInclude<ExtArgs> | null
    /**
     * The filter to search for the Mensagens to update in case it exists.
     */
    where: MensagensWhereUniqueInput
    /**
     * In case the Mensagens found by the `where` argument doesn't exist, create a new Mensagens with this data.
     */
    create: XOR<MensagensCreateInput, MensagensUncheckedCreateInput>
    /**
     * In case the Mensagens was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MensagensUpdateInput, MensagensUncheckedUpdateInput>
  }

  /**
   * Mensagens delete
   */
  export type MensagensDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mensagens
     */
    select?: MensagensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mensagens
     */
    omit?: MensagensOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MensagensInclude<ExtArgs> | null
    /**
     * Filter which Mensagens to delete.
     */
    where: MensagensWhereUniqueInput
  }

  /**
   * Mensagens deleteMany
   */
  export type MensagensDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Mensagens to delete
     */
    where?: MensagensWhereInput
    /**
     * Limit how many Mensagens to delete.
     */
    limit?: number
  }

  /**
   * Mensagens without action
   */
  export type MensagensDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mensagens
     */
    select?: MensagensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mensagens
     */
    omit?: MensagensOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MensagensInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const SalasScalarFieldEnum: {
    codigoSala: 'codigoSala',
    pessoasConectadas: 'pessoasConectadas',
    updateAt: 'updateAt',
    token: 'token',
    hostToken: 'hostToken'
  };

  export type SalasScalarFieldEnum = (typeof SalasScalarFieldEnum)[keyof typeof SalasScalarFieldEnum]


  export const Salas_UsuariosScalarFieldEnum: {
    id: 'id',
    codigoSala: 'codigoSala',
    userData: 'userData',
    userHash: 'userHash',
    host: 'host'
  };

  export type Salas_UsuariosScalarFieldEnum = (typeof Salas_UsuariosScalarFieldEnum)[keyof typeof Salas_UsuariosScalarFieldEnum]


  export const MensagensScalarFieldEnum: {
    id: 'id',
    mensagem: 'mensagem',
    mensagemTraduzida: 'mensagemTraduzida',
    usuario: 'usuario',
    dataEnvio: 'dataEnvio',
    codigoSala: 'codigoSala',
    apelido: 'apelido',
    avatar: 'avatar',
    linguaOriginal: 'linguaOriginal'
  };

  export type MensagensScalarFieldEnum = (typeof MensagensScalarFieldEnum)[keyof typeof MensagensScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const SalasOrderByRelevanceFieldEnum: {
    codigoSala: 'codigoSala',
    token: 'token',
    hostToken: 'hostToken'
  };

  export type SalasOrderByRelevanceFieldEnum = (typeof SalasOrderByRelevanceFieldEnum)[keyof typeof SalasOrderByRelevanceFieldEnum]


  export const Salas_UsuariosOrderByRelevanceFieldEnum: {
    codigoSala: 'codigoSala',
    userData: 'userData',
    userHash: 'userHash'
  };

  export type Salas_UsuariosOrderByRelevanceFieldEnum = (typeof Salas_UsuariosOrderByRelevanceFieldEnum)[keyof typeof Salas_UsuariosOrderByRelevanceFieldEnum]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const MensagensOrderByRelevanceFieldEnum: {
    mensagem: 'mensagem',
    mensagemTraduzida: 'mensagemTraduzida',
    usuario: 'usuario',
    codigoSala: 'codigoSala',
    apelido: 'apelido',
    avatar: 'avatar',
    linguaOriginal: 'linguaOriginal'
  };

  export type MensagensOrderByRelevanceFieldEnum = (typeof MensagensOrderByRelevanceFieldEnum)[keyof typeof MensagensOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type SalasWhereInput = {
    AND?: SalasWhereInput | SalasWhereInput[]
    OR?: SalasWhereInput[]
    NOT?: SalasWhereInput | SalasWhereInput[]
    codigoSala?: StringFilter<"Salas"> | string
    pessoasConectadas?: IntFilter<"Salas"> | number
    updateAt?: DateTimeFilter<"Salas"> | Date | string
    token?: StringFilter<"Salas"> | string
    hostToken?: StringFilter<"Salas"> | string
    Mensagens?: MensagensListRelationFilter
    Salas_Usuarios?: Salas_UsuariosListRelationFilter
  }

  export type SalasOrderByWithRelationInput = {
    codigoSala?: SortOrder
    pessoasConectadas?: SortOrder
    updateAt?: SortOrder
    token?: SortOrder
    hostToken?: SortOrder
    Mensagens?: MensagensOrderByRelationAggregateInput
    Salas_Usuarios?: Salas_UsuariosOrderByRelationAggregateInput
    _relevance?: SalasOrderByRelevanceInput
  }

  export type SalasWhereUniqueInput = Prisma.AtLeast<{
    codigoSala?: string
    AND?: SalasWhereInput | SalasWhereInput[]
    OR?: SalasWhereInput[]
    NOT?: SalasWhereInput | SalasWhereInput[]
    pessoasConectadas?: IntFilter<"Salas"> | number
    updateAt?: DateTimeFilter<"Salas"> | Date | string
    token?: StringFilter<"Salas"> | string
    hostToken?: StringFilter<"Salas"> | string
    Mensagens?: MensagensListRelationFilter
    Salas_Usuarios?: Salas_UsuariosListRelationFilter
  }, "codigoSala" | "codigoSala">

  export type SalasOrderByWithAggregationInput = {
    codigoSala?: SortOrder
    pessoasConectadas?: SortOrder
    updateAt?: SortOrder
    token?: SortOrder
    hostToken?: SortOrder
    _count?: SalasCountOrderByAggregateInput
    _avg?: SalasAvgOrderByAggregateInput
    _max?: SalasMaxOrderByAggregateInput
    _min?: SalasMinOrderByAggregateInput
    _sum?: SalasSumOrderByAggregateInput
  }

  export type SalasScalarWhereWithAggregatesInput = {
    AND?: SalasScalarWhereWithAggregatesInput | SalasScalarWhereWithAggregatesInput[]
    OR?: SalasScalarWhereWithAggregatesInput[]
    NOT?: SalasScalarWhereWithAggregatesInput | SalasScalarWhereWithAggregatesInput[]
    codigoSala?: StringWithAggregatesFilter<"Salas"> | string
    pessoasConectadas?: IntWithAggregatesFilter<"Salas"> | number
    updateAt?: DateTimeWithAggregatesFilter<"Salas"> | Date | string
    token?: StringWithAggregatesFilter<"Salas"> | string
    hostToken?: StringWithAggregatesFilter<"Salas"> | string
  }

  export type Salas_UsuariosWhereInput = {
    AND?: Salas_UsuariosWhereInput | Salas_UsuariosWhereInput[]
    OR?: Salas_UsuariosWhereInput[]
    NOT?: Salas_UsuariosWhereInput | Salas_UsuariosWhereInput[]
    id?: IntFilter<"Salas_Usuarios"> | number
    codigoSala?: StringFilter<"Salas_Usuarios"> | string
    userData?: StringFilter<"Salas_Usuarios"> | string
    userHash?: StringFilter<"Salas_Usuarios"> | string
    host?: BoolFilter<"Salas_Usuarios"> | boolean
    sala?: XOR<SalasScalarRelationFilter, SalasWhereInput>
  }

  export type Salas_UsuariosOrderByWithRelationInput = {
    id?: SortOrder
    codigoSala?: SortOrder
    userData?: SortOrder
    userHash?: SortOrder
    host?: SortOrder
    sala?: SalasOrderByWithRelationInput
    _relevance?: Salas_UsuariosOrderByRelevanceInput
  }

  export type Salas_UsuariosWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    codigoSala_userHash?: Salas_UsuariosCodigoSalaUserHashCompoundUniqueInput
    AND?: Salas_UsuariosWhereInput | Salas_UsuariosWhereInput[]
    OR?: Salas_UsuariosWhereInput[]
    NOT?: Salas_UsuariosWhereInput | Salas_UsuariosWhereInput[]
    codigoSala?: StringFilter<"Salas_Usuarios"> | string
    userData?: StringFilter<"Salas_Usuarios"> | string
    userHash?: StringFilter<"Salas_Usuarios"> | string
    host?: BoolFilter<"Salas_Usuarios"> | boolean
    sala?: XOR<SalasScalarRelationFilter, SalasWhereInput>
  }, "id" | "codigoSala_userHash">

  export type Salas_UsuariosOrderByWithAggregationInput = {
    id?: SortOrder
    codigoSala?: SortOrder
    userData?: SortOrder
    userHash?: SortOrder
    host?: SortOrder
    _count?: Salas_UsuariosCountOrderByAggregateInput
    _avg?: Salas_UsuariosAvgOrderByAggregateInput
    _max?: Salas_UsuariosMaxOrderByAggregateInput
    _min?: Salas_UsuariosMinOrderByAggregateInput
    _sum?: Salas_UsuariosSumOrderByAggregateInput
  }

  export type Salas_UsuariosScalarWhereWithAggregatesInput = {
    AND?: Salas_UsuariosScalarWhereWithAggregatesInput | Salas_UsuariosScalarWhereWithAggregatesInput[]
    OR?: Salas_UsuariosScalarWhereWithAggregatesInput[]
    NOT?: Salas_UsuariosScalarWhereWithAggregatesInput | Salas_UsuariosScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Salas_Usuarios"> | number
    codigoSala?: StringWithAggregatesFilter<"Salas_Usuarios"> | string
    userData?: StringWithAggregatesFilter<"Salas_Usuarios"> | string
    userHash?: StringWithAggregatesFilter<"Salas_Usuarios"> | string
    host?: BoolWithAggregatesFilter<"Salas_Usuarios"> | boolean
  }

  export type MensagensWhereInput = {
    AND?: MensagensWhereInput | MensagensWhereInput[]
    OR?: MensagensWhereInput[]
    NOT?: MensagensWhereInput | MensagensWhereInput[]
    id?: IntFilter<"Mensagens"> | number
    mensagem?: StringFilter<"Mensagens"> | string
    mensagemTraduzida?: StringNullableFilter<"Mensagens"> | string | null
    usuario?: StringFilter<"Mensagens"> | string
    dataEnvio?: DateTimeFilter<"Mensagens"> | Date | string
    codigoSala?: StringFilter<"Mensagens"> | string
    apelido?: StringNullableFilter<"Mensagens"> | string | null
    avatar?: StringNullableFilter<"Mensagens"> | string | null
    linguaOriginal?: StringNullableFilter<"Mensagens"> | string | null
    sala?: XOR<SalasScalarRelationFilter, SalasWhereInput>
  }

  export type MensagensOrderByWithRelationInput = {
    id?: SortOrder
    mensagem?: SortOrder
    mensagemTraduzida?: SortOrderInput | SortOrder
    usuario?: SortOrder
    dataEnvio?: SortOrder
    codigoSala?: SortOrder
    apelido?: SortOrderInput | SortOrder
    avatar?: SortOrderInput | SortOrder
    linguaOriginal?: SortOrderInput | SortOrder
    sala?: SalasOrderByWithRelationInput
    _relevance?: MensagensOrderByRelevanceInput
  }

  export type MensagensWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: MensagensWhereInput | MensagensWhereInput[]
    OR?: MensagensWhereInput[]
    NOT?: MensagensWhereInput | MensagensWhereInput[]
    mensagem?: StringFilter<"Mensagens"> | string
    mensagemTraduzida?: StringNullableFilter<"Mensagens"> | string | null
    usuario?: StringFilter<"Mensagens"> | string
    dataEnvio?: DateTimeFilter<"Mensagens"> | Date | string
    codigoSala?: StringFilter<"Mensagens"> | string
    apelido?: StringNullableFilter<"Mensagens"> | string | null
    avatar?: StringNullableFilter<"Mensagens"> | string | null
    linguaOriginal?: StringNullableFilter<"Mensagens"> | string | null
    sala?: XOR<SalasScalarRelationFilter, SalasWhereInput>
  }, "id">

  export type MensagensOrderByWithAggregationInput = {
    id?: SortOrder
    mensagem?: SortOrder
    mensagemTraduzida?: SortOrderInput | SortOrder
    usuario?: SortOrder
    dataEnvio?: SortOrder
    codigoSala?: SortOrder
    apelido?: SortOrderInput | SortOrder
    avatar?: SortOrderInput | SortOrder
    linguaOriginal?: SortOrderInput | SortOrder
    _count?: MensagensCountOrderByAggregateInput
    _avg?: MensagensAvgOrderByAggregateInput
    _max?: MensagensMaxOrderByAggregateInput
    _min?: MensagensMinOrderByAggregateInput
    _sum?: MensagensSumOrderByAggregateInput
  }

  export type MensagensScalarWhereWithAggregatesInput = {
    AND?: MensagensScalarWhereWithAggregatesInput | MensagensScalarWhereWithAggregatesInput[]
    OR?: MensagensScalarWhereWithAggregatesInput[]
    NOT?: MensagensScalarWhereWithAggregatesInput | MensagensScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Mensagens"> | number
    mensagem?: StringWithAggregatesFilter<"Mensagens"> | string
    mensagemTraduzida?: StringNullableWithAggregatesFilter<"Mensagens"> | string | null
    usuario?: StringWithAggregatesFilter<"Mensagens"> | string
    dataEnvio?: DateTimeWithAggregatesFilter<"Mensagens"> | Date | string
    codigoSala?: StringWithAggregatesFilter<"Mensagens"> | string
    apelido?: StringNullableWithAggregatesFilter<"Mensagens"> | string | null
    avatar?: StringNullableWithAggregatesFilter<"Mensagens"> | string | null
    linguaOriginal?: StringNullableWithAggregatesFilter<"Mensagens"> | string | null
  }

  export type SalasCreateInput = {
    codigoSala: string
    pessoasConectadas?: number
    updateAt?: Date | string
    token: string
    hostToken: string
    Mensagens?: MensagensCreateNestedManyWithoutSalaInput
    Salas_Usuarios?: Salas_UsuariosCreateNestedManyWithoutSalaInput
  }

  export type SalasUncheckedCreateInput = {
    codigoSala: string
    pessoasConectadas?: number
    updateAt?: Date | string
    token: string
    hostToken: string
    Mensagens?: MensagensUncheckedCreateNestedManyWithoutSalaInput
    Salas_Usuarios?: Salas_UsuariosUncheckedCreateNestedManyWithoutSalaInput
  }

  export type SalasUpdateInput = {
    codigoSala?: StringFieldUpdateOperationsInput | string
    pessoasConectadas?: IntFieldUpdateOperationsInput | number
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    hostToken?: StringFieldUpdateOperationsInput | string
    Mensagens?: MensagensUpdateManyWithoutSalaNestedInput
    Salas_Usuarios?: Salas_UsuariosUpdateManyWithoutSalaNestedInput
  }

  export type SalasUncheckedUpdateInput = {
    codigoSala?: StringFieldUpdateOperationsInput | string
    pessoasConectadas?: IntFieldUpdateOperationsInput | number
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    hostToken?: StringFieldUpdateOperationsInput | string
    Mensagens?: MensagensUncheckedUpdateManyWithoutSalaNestedInput
    Salas_Usuarios?: Salas_UsuariosUncheckedUpdateManyWithoutSalaNestedInput
  }

  export type SalasCreateManyInput = {
    codigoSala: string
    pessoasConectadas?: number
    updateAt?: Date | string
    token: string
    hostToken: string
  }

  export type SalasUpdateManyMutationInput = {
    codigoSala?: StringFieldUpdateOperationsInput | string
    pessoasConectadas?: IntFieldUpdateOperationsInput | number
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    hostToken?: StringFieldUpdateOperationsInput | string
  }

  export type SalasUncheckedUpdateManyInput = {
    codigoSala?: StringFieldUpdateOperationsInput | string
    pessoasConectadas?: IntFieldUpdateOperationsInput | number
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    hostToken?: StringFieldUpdateOperationsInput | string
  }

  export type Salas_UsuariosCreateInput = {
    userData: string
    userHash: string
    host?: boolean
    sala: SalasCreateNestedOneWithoutSalas_UsuariosInput
  }

  export type Salas_UsuariosUncheckedCreateInput = {
    id?: number
    codigoSala: string
    userData: string
    userHash: string
    host?: boolean
  }

  export type Salas_UsuariosUpdateInput = {
    userData?: StringFieldUpdateOperationsInput | string
    userHash?: StringFieldUpdateOperationsInput | string
    host?: BoolFieldUpdateOperationsInput | boolean
    sala?: SalasUpdateOneRequiredWithoutSalas_UsuariosNestedInput
  }

  export type Salas_UsuariosUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    codigoSala?: StringFieldUpdateOperationsInput | string
    userData?: StringFieldUpdateOperationsInput | string
    userHash?: StringFieldUpdateOperationsInput | string
    host?: BoolFieldUpdateOperationsInput | boolean
  }

  export type Salas_UsuariosCreateManyInput = {
    id?: number
    codigoSala: string
    userData: string
    userHash: string
    host?: boolean
  }

  export type Salas_UsuariosUpdateManyMutationInput = {
    userData?: StringFieldUpdateOperationsInput | string
    userHash?: StringFieldUpdateOperationsInput | string
    host?: BoolFieldUpdateOperationsInput | boolean
  }

  export type Salas_UsuariosUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    codigoSala?: StringFieldUpdateOperationsInput | string
    userData?: StringFieldUpdateOperationsInput | string
    userHash?: StringFieldUpdateOperationsInput | string
    host?: BoolFieldUpdateOperationsInput | boolean
  }

  export type MensagensCreateInput = {
    mensagem: string
    mensagemTraduzida?: string | null
    usuario: string
    dataEnvio: Date | string
    apelido?: string | null
    avatar?: string | null
    linguaOriginal?: string | null
    sala: SalasCreateNestedOneWithoutMensagensInput
  }

  export type MensagensUncheckedCreateInput = {
    id?: number
    mensagem: string
    mensagemTraduzida?: string | null
    usuario: string
    dataEnvio: Date | string
    codigoSala: string
    apelido?: string | null
    avatar?: string | null
    linguaOriginal?: string | null
  }

  export type MensagensUpdateInput = {
    mensagem?: StringFieldUpdateOperationsInput | string
    mensagemTraduzida?: NullableStringFieldUpdateOperationsInput | string | null
    usuario?: StringFieldUpdateOperationsInput | string
    dataEnvio?: DateTimeFieldUpdateOperationsInput | Date | string
    apelido?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    linguaOriginal?: NullableStringFieldUpdateOperationsInput | string | null
    sala?: SalasUpdateOneRequiredWithoutMensagensNestedInput
  }

  export type MensagensUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    mensagem?: StringFieldUpdateOperationsInput | string
    mensagemTraduzida?: NullableStringFieldUpdateOperationsInput | string | null
    usuario?: StringFieldUpdateOperationsInput | string
    dataEnvio?: DateTimeFieldUpdateOperationsInput | Date | string
    codigoSala?: StringFieldUpdateOperationsInput | string
    apelido?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    linguaOriginal?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MensagensCreateManyInput = {
    id?: number
    mensagem: string
    mensagemTraduzida?: string | null
    usuario: string
    dataEnvio: Date | string
    codigoSala: string
    apelido?: string | null
    avatar?: string | null
    linguaOriginal?: string | null
  }

  export type MensagensUpdateManyMutationInput = {
    mensagem?: StringFieldUpdateOperationsInput | string
    mensagemTraduzida?: NullableStringFieldUpdateOperationsInput | string | null
    usuario?: StringFieldUpdateOperationsInput | string
    dataEnvio?: DateTimeFieldUpdateOperationsInput | Date | string
    apelido?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    linguaOriginal?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MensagensUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    mensagem?: StringFieldUpdateOperationsInput | string
    mensagemTraduzida?: NullableStringFieldUpdateOperationsInput | string | null
    usuario?: StringFieldUpdateOperationsInput | string
    dataEnvio?: DateTimeFieldUpdateOperationsInput | Date | string
    codigoSala?: StringFieldUpdateOperationsInput | string
    apelido?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    linguaOriginal?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type MensagensListRelationFilter = {
    every?: MensagensWhereInput
    some?: MensagensWhereInput
    none?: MensagensWhereInput
  }

  export type Salas_UsuariosListRelationFilter = {
    every?: Salas_UsuariosWhereInput
    some?: Salas_UsuariosWhereInput
    none?: Salas_UsuariosWhereInput
  }

  export type MensagensOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type Salas_UsuariosOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SalasOrderByRelevanceInput = {
    fields: SalasOrderByRelevanceFieldEnum | SalasOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type SalasCountOrderByAggregateInput = {
    codigoSala?: SortOrder
    pessoasConectadas?: SortOrder
    updateAt?: SortOrder
    token?: SortOrder
    hostToken?: SortOrder
  }

  export type SalasAvgOrderByAggregateInput = {
    pessoasConectadas?: SortOrder
  }

  export type SalasMaxOrderByAggregateInput = {
    codigoSala?: SortOrder
    pessoasConectadas?: SortOrder
    updateAt?: SortOrder
    token?: SortOrder
    hostToken?: SortOrder
  }

  export type SalasMinOrderByAggregateInput = {
    codigoSala?: SortOrder
    pessoasConectadas?: SortOrder
    updateAt?: SortOrder
    token?: SortOrder
    hostToken?: SortOrder
  }

  export type SalasSumOrderByAggregateInput = {
    pessoasConectadas?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type SalasScalarRelationFilter = {
    is?: SalasWhereInput
    isNot?: SalasWhereInput
  }

  export type Salas_UsuariosOrderByRelevanceInput = {
    fields: Salas_UsuariosOrderByRelevanceFieldEnum | Salas_UsuariosOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type Salas_UsuariosCodigoSalaUserHashCompoundUniqueInput = {
    codigoSala: string
    userHash: string
  }

  export type Salas_UsuariosCountOrderByAggregateInput = {
    id?: SortOrder
    codigoSala?: SortOrder
    userData?: SortOrder
    userHash?: SortOrder
    host?: SortOrder
  }

  export type Salas_UsuariosAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type Salas_UsuariosMaxOrderByAggregateInput = {
    id?: SortOrder
    codigoSala?: SortOrder
    userData?: SortOrder
    userHash?: SortOrder
    host?: SortOrder
  }

  export type Salas_UsuariosMinOrderByAggregateInput = {
    id?: SortOrder
    codigoSala?: SortOrder
    userData?: SortOrder
    userHash?: SortOrder
    host?: SortOrder
  }

  export type Salas_UsuariosSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type MensagensOrderByRelevanceInput = {
    fields: MensagensOrderByRelevanceFieldEnum | MensagensOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type MensagensCountOrderByAggregateInput = {
    id?: SortOrder
    mensagem?: SortOrder
    mensagemTraduzida?: SortOrder
    usuario?: SortOrder
    dataEnvio?: SortOrder
    codigoSala?: SortOrder
    apelido?: SortOrder
    avatar?: SortOrder
    linguaOriginal?: SortOrder
  }

  export type MensagensAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type MensagensMaxOrderByAggregateInput = {
    id?: SortOrder
    mensagem?: SortOrder
    mensagemTraduzida?: SortOrder
    usuario?: SortOrder
    dataEnvio?: SortOrder
    codigoSala?: SortOrder
    apelido?: SortOrder
    avatar?: SortOrder
    linguaOriginal?: SortOrder
  }

  export type MensagensMinOrderByAggregateInput = {
    id?: SortOrder
    mensagem?: SortOrder
    mensagemTraduzida?: SortOrder
    usuario?: SortOrder
    dataEnvio?: SortOrder
    codigoSala?: SortOrder
    apelido?: SortOrder
    avatar?: SortOrder
    linguaOriginal?: SortOrder
  }

  export type MensagensSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type MensagensCreateNestedManyWithoutSalaInput = {
    create?: XOR<MensagensCreateWithoutSalaInput, MensagensUncheckedCreateWithoutSalaInput> | MensagensCreateWithoutSalaInput[] | MensagensUncheckedCreateWithoutSalaInput[]
    connectOrCreate?: MensagensCreateOrConnectWithoutSalaInput | MensagensCreateOrConnectWithoutSalaInput[]
    createMany?: MensagensCreateManySalaInputEnvelope
    connect?: MensagensWhereUniqueInput | MensagensWhereUniqueInput[]
  }

  export type Salas_UsuariosCreateNestedManyWithoutSalaInput = {
    create?: XOR<Salas_UsuariosCreateWithoutSalaInput, Salas_UsuariosUncheckedCreateWithoutSalaInput> | Salas_UsuariosCreateWithoutSalaInput[] | Salas_UsuariosUncheckedCreateWithoutSalaInput[]
    connectOrCreate?: Salas_UsuariosCreateOrConnectWithoutSalaInput | Salas_UsuariosCreateOrConnectWithoutSalaInput[]
    createMany?: Salas_UsuariosCreateManySalaInputEnvelope
    connect?: Salas_UsuariosWhereUniqueInput | Salas_UsuariosWhereUniqueInput[]
  }

  export type MensagensUncheckedCreateNestedManyWithoutSalaInput = {
    create?: XOR<MensagensCreateWithoutSalaInput, MensagensUncheckedCreateWithoutSalaInput> | MensagensCreateWithoutSalaInput[] | MensagensUncheckedCreateWithoutSalaInput[]
    connectOrCreate?: MensagensCreateOrConnectWithoutSalaInput | MensagensCreateOrConnectWithoutSalaInput[]
    createMany?: MensagensCreateManySalaInputEnvelope
    connect?: MensagensWhereUniqueInput | MensagensWhereUniqueInput[]
  }

  export type Salas_UsuariosUncheckedCreateNestedManyWithoutSalaInput = {
    create?: XOR<Salas_UsuariosCreateWithoutSalaInput, Salas_UsuariosUncheckedCreateWithoutSalaInput> | Salas_UsuariosCreateWithoutSalaInput[] | Salas_UsuariosUncheckedCreateWithoutSalaInput[]
    connectOrCreate?: Salas_UsuariosCreateOrConnectWithoutSalaInput | Salas_UsuariosCreateOrConnectWithoutSalaInput[]
    createMany?: Salas_UsuariosCreateManySalaInputEnvelope
    connect?: Salas_UsuariosWhereUniqueInput | Salas_UsuariosWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type MensagensUpdateManyWithoutSalaNestedInput = {
    create?: XOR<MensagensCreateWithoutSalaInput, MensagensUncheckedCreateWithoutSalaInput> | MensagensCreateWithoutSalaInput[] | MensagensUncheckedCreateWithoutSalaInput[]
    connectOrCreate?: MensagensCreateOrConnectWithoutSalaInput | MensagensCreateOrConnectWithoutSalaInput[]
    upsert?: MensagensUpsertWithWhereUniqueWithoutSalaInput | MensagensUpsertWithWhereUniqueWithoutSalaInput[]
    createMany?: MensagensCreateManySalaInputEnvelope
    set?: MensagensWhereUniqueInput | MensagensWhereUniqueInput[]
    disconnect?: MensagensWhereUniqueInput | MensagensWhereUniqueInput[]
    delete?: MensagensWhereUniqueInput | MensagensWhereUniqueInput[]
    connect?: MensagensWhereUniqueInput | MensagensWhereUniqueInput[]
    update?: MensagensUpdateWithWhereUniqueWithoutSalaInput | MensagensUpdateWithWhereUniqueWithoutSalaInput[]
    updateMany?: MensagensUpdateManyWithWhereWithoutSalaInput | MensagensUpdateManyWithWhereWithoutSalaInput[]
    deleteMany?: MensagensScalarWhereInput | MensagensScalarWhereInput[]
  }

  export type Salas_UsuariosUpdateManyWithoutSalaNestedInput = {
    create?: XOR<Salas_UsuariosCreateWithoutSalaInput, Salas_UsuariosUncheckedCreateWithoutSalaInput> | Salas_UsuariosCreateWithoutSalaInput[] | Salas_UsuariosUncheckedCreateWithoutSalaInput[]
    connectOrCreate?: Salas_UsuariosCreateOrConnectWithoutSalaInput | Salas_UsuariosCreateOrConnectWithoutSalaInput[]
    upsert?: Salas_UsuariosUpsertWithWhereUniqueWithoutSalaInput | Salas_UsuariosUpsertWithWhereUniqueWithoutSalaInput[]
    createMany?: Salas_UsuariosCreateManySalaInputEnvelope
    set?: Salas_UsuariosWhereUniqueInput | Salas_UsuariosWhereUniqueInput[]
    disconnect?: Salas_UsuariosWhereUniqueInput | Salas_UsuariosWhereUniqueInput[]
    delete?: Salas_UsuariosWhereUniqueInput | Salas_UsuariosWhereUniqueInput[]
    connect?: Salas_UsuariosWhereUniqueInput | Salas_UsuariosWhereUniqueInput[]
    update?: Salas_UsuariosUpdateWithWhereUniqueWithoutSalaInput | Salas_UsuariosUpdateWithWhereUniqueWithoutSalaInput[]
    updateMany?: Salas_UsuariosUpdateManyWithWhereWithoutSalaInput | Salas_UsuariosUpdateManyWithWhereWithoutSalaInput[]
    deleteMany?: Salas_UsuariosScalarWhereInput | Salas_UsuariosScalarWhereInput[]
  }

  export type MensagensUncheckedUpdateManyWithoutSalaNestedInput = {
    create?: XOR<MensagensCreateWithoutSalaInput, MensagensUncheckedCreateWithoutSalaInput> | MensagensCreateWithoutSalaInput[] | MensagensUncheckedCreateWithoutSalaInput[]
    connectOrCreate?: MensagensCreateOrConnectWithoutSalaInput | MensagensCreateOrConnectWithoutSalaInput[]
    upsert?: MensagensUpsertWithWhereUniqueWithoutSalaInput | MensagensUpsertWithWhereUniqueWithoutSalaInput[]
    createMany?: MensagensCreateManySalaInputEnvelope
    set?: MensagensWhereUniqueInput | MensagensWhereUniqueInput[]
    disconnect?: MensagensWhereUniqueInput | MensagensWhereUniqueInput[]
    delete?: MensagensWhereUniqueInput | MensagensWhereUniqueInput[]
    connect?: MensagensWhereUniqueInput | MensagensWhereUniqueInput[]
    update?: MensagensUpdateWithWhereUniqueWithoutSalaInput | MensagensUpdateWithWhereUniqueWithoutSalaInput[]
    updateMany?: MensagensUpdateManyWithWhereWithoutSalaInput | MensagensUpdateManyWithWhereWithoutSalaInput[]
    deleteMany?: MensagensScalarWhereInput | MensagensScalarWhereInput[]
  }

  export type Salas_UsuariosUncheckedUpdateManyWithoutSalaNestedInput = {
    create?: XOR<Salas_UsuariosCreateWithoutSalaInput, Salas_UsuariosUncheckedCreateWithoutSalaInput> | Salas_UsuariosCreateWithoutSalaInput[] | Salas_UsuariosUncheckedCreateWithoutSalaInput[]
    connectOrCreate?: Salas_UsuariosCreateOrConnectWithoutSalaInput | Salas_UsuariosCreateOrConnectWithoutSalaInput[]
    upsert?: Salas_UsuariosUpsertWithWhereUniqueWithoutSalaInput | Salas_UsuariosUpsertWithWhereUniqueWithoutSalaInput[]
    createMany?: Salas_UsuariosCreateManySalaInputEnvelope
    set?: Salas_UsuariosWhereUniqueInput | Salas_UsuariosWhereUniqueInput[]
    disconnect?: Salas_UsuariosWhereUniqueInput | Salas_UsuariosWhereUniqueInput[]
    delete?: Salas_UsuariosWhereUniqueInput | Salas_UsuariosWhereUniqueInput[]
    connect?: Salas_UsuariosWhereUniqueInput | Salas_UsuariosWhereUniqueInput[]
    update?: Salas_UsuariosUpdateWithWhereUniqueWithoutSalaInput | Salas_UsuariosUpdateWithWhereUniqueWithoutSalaInput[]
    updateMany?: Salas_UsuariosUpdateManyWithWhereWithoutSalaInput | Salas_UsuariosUpdateManyWithWhereWithoutSalaInput[]
    deleteMany?: Salas_UsuariosScalarWhereInput | Salas_UsuariosScalarWhereInput[]
  }

  export type SalasCreateNestedOneWithoutSalas_UsuariosInput = {
    create?: XOR<SalasCreateWithoutSalas_UsuariosInput, SalasUncheckedCreateWithoutSalas_UsuariosInput>
    connectOrCreate?: SalasCreateOrConnectWithoutSalas_UsuariosInput
    connect?: SalasWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type SalasUpdateOneRequiredWithoutSalas_UsuariosNestedInput = {
    create?: XOR<SalasCreateWithoutSalas_UsuariosInput, SalasUncheckedCreateWithoutSalas_UsuariosInput>
    connectOrCreate?: SalasCreateOrConnectWithoutSalas_UsuariosInput
    upsert?: SalasUpsertWithoutSalas_UsuariosInput
    connect?: SalasWhereUniqueInput
    update?: XOR<XOR<SalasUpdateToOneWithWhereWithoutSalas_UsuariosInput, SalasUpdateWithoutSalas_UsuariosInput>, SalasUncheckedUpdateWithoutSalas_UsuariosInput>
  }

  export type SalasCreateNestedOneWithoutMensagensInput = {
    create?: XOR<SalasCreateWithoutMensagensInput, SalasUncheckedCreateWithoutMensagensInput>
    connectOrCreate?: SalasCreateOrConnectWithoutMensagensInput
    connect?: SalasWhereUniqueInput
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type SalasUpdateOneRequiredWithoutMensagensNestedInput = {
    create?: XOR<SalasCreateWithoutMensagensInput, SalasUncheckedCreateWithoutMensagensInput>
    connectOrCreate?: SalasCreateOrConnectWithoutMensagensInput
    upsert?: SalasUpsertWithoutMensagensInput
    connect?: SalasWhereUniqueInput
    update?: XOR<XOR<SalasUpdateToOneWithWhereWithoutMensagensInput, SalasUpdateWithoutMensagensInput>, SalasUncheckedUpdateWithoutMensagensInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type MensagensCreateWithoutSalaInput = {
    mensagem: string
    mensagemTraduzida?: string | null
    usuario: string
    dataEnvio: Date | string
    apelido?: string | null
    avatar?: string | null
    linguaOriginal?: string | null
  }

  export type MensagensUncheckedCreateWithoutSalaInput = {
    id?: number
    mensagem: string
    mensagemTraduzida?: string | null
    usuario: string
    dataEnvio: Date | string
    apelido?: string | null
    avatar?: string | null
    linguaOriginal?: string | null
  }

  export type MensagensCreateOrConnectWithoutSalaInput = {
    where: MensagensWhereUniqueInput
    create: XOR<MensagensCreateWithoutSalaInput, MensagensUncheckedCreateWithoutSalaInput>
  }

  export type MensagensCreateManySalaInputEnvelope = {
    data: MensagensCreateManySalaInput | MensagensCreateManySalaInput[]
    skipDuplicates?: boolean
  }

  export type Salas_UsuariosCreateWithoutSalaInput = {
    userData: string
    userHash: string
    host?: boolean
  }

  export type Salas_UsuariosUncheckedCreateWithoutSalaInput = {
    id?: number
    userData: string
    userHash: string
    host?: boolean
  }

  export type Salas_UsuariosCreateOrConnectWithoutSalaInput = {
    where: Salas_UsuariosWhereUniqueInput
    create: XOR<Salas_UsuariosCreateWithoutSalaInput, Salas_UsuariosUncheckedCreateWithoutSalaInput>
  }

  export type Salas_UsuariosCreateManySalaInputEnvelope = {
    data: Salas_UsuariosCreateManySalaInput | Salas_UsuariosCreateManySalaInput[]
    skipDuplicates?: boolean
  }

  export type MensagensUpsertWithWhereUniqueWithoutSalaInput = {
    where: MensagensWhereUniqueInput
    update: XOR<MensagensUpdateWithoutSalaInput, MensagensUncheckedUpdateWithoutSalaInput>
    create: XOR<MensagensCreateWithoutSalaInput, MensagensUncheckedCreateWithoutSalaInput>
  }

  export type MensagensUpdateWithWhereUniqueWithoutSalaInput = {
    where: MensagensWhereUniqueInput
    data: XOR<MensagensUpdateWithoutSalaInput, MensagensUncheckedUpdateWithoutSalaInput>
  }

  export type MensagensUpdateManyWithWhereWithoutSalaInput = {
    where: MensagensScalarWhereInput
    data: XOR<MensagensUpdateManyMutationInput, MensagensUncheckedUpdateManyWithoutSalaInput>
  }

  export type MensagensScalarWhereInput = {
    AND?: MensagensScalarWhereInput | MensagensScalarWhereInput[]
    OR?: MensagensScalarWhereInput[]
    NOT?: MensagensScalarWhereInput | MensagensScalarWhereInput[]
    id?: IntFilter<"Mensagens"> | number
    mensagem?: StringFilter<"Mensagens"> | string
    mensagemTraduzida?: StringNullableFilter<"Mensagens"> | string | null
    usuario?: StringFilter<"Mensagens"> | string
    dataEnvio?: DateTimeFilter<"Mensagens"> | Date | string
    codigoSala?: StringFilter<"Mensagens"> | string
    apelido?: StringNullableFilter<"Mensagens"> | string | null
    avatar?: StringNullableFilter<"Mensagens"> | string | null
    linguaOriginal?: StringNullableFilter<"Mensagens"> | string | null
  }

  export type Salas_UsuariosUpsertWithWhereUniqueWithoutSalaInput = {
    where: Salas_UsuariosWhereUniqueInput
    update: XOR<Salas_UsuariosUpdateWithoutSalaInput, Salas_UsuariosUncheckedUpdateWithoutSalaInput>
    create: XOR<Salas_UsuariosCreateWithoutSalaInput, Salas_UsuariosUncheckedCreateWithoutSalaInput>
  }

  export type Salas_UsuariosUpdateWithWhereUniqueWithoutSalaInput = {
    where: Salas_UsuariosWhereUniqueInput
    data: XOR<Salas_UsuariosUpdateWithoutSalaInput, Salas_UsuariosUncheckedUpdateWithoutSalaInput>
  }

  export type Salas_UsuariosUpdateManyWithWhereWithoutSalaInput = {
    where: Salas_UsuariosScalarWhereInput
    data: XOR<Salas_UsuariosUpdateManyMutationInput, Salas_UsuariosUncheckedUpdateManyWithoutSalaInput>
  }

  export type Salas_UsuariosScalarWhereInput = {
    AND?: Salas_UsuariosScalarWhereInput | Salas_UsuariosScalarWhereInput[]
    OR?: Salas_UsuariosScalarWhereInput[]
    NOT?: Salas_UsuariosScalarWhereInput | Salas_UsuariosScalarWhereInput[]
    id?: IntFilter<"Salas_Usuarios"> | number
    codigoSala?: StringFilter<"Salas_Usuarios"> | string
    userData?: StringFilter<"Salas_Usuarios"> | string
    userHash?: StringFilter<"Salas_Usuarios"> | string
    host?: BoolFilter<"Salas_Usuarios"> | boolean
  }

  export type SalasCreateWithoutSalas_UsuariosInput = {
    codigoSala: string
    pessoasConectadas?: number
    updateAt?: Date | string
    token: string
    hostToken: string
    Mensagens?: MensagensCreateNestedManyWithoutSalaInput
  }

  export type SalasUncheckedCreateWithoutSalas_UsuariosInput = {
    codigoSala: string
    pessoasConectadas?: number
    updateAt?: Date | string
    token: string
    hostToken: string
    Mensagens?: MensagensUncheckedCreateNestedManyWithoutSalaInput
  }

  export type SalasCreateOrConnectWithoutSalas_UsuariosInput = {
    where: SalasWhereUniqueInput
    create: XOR<SalasCreateWithoutSalas_UsuariosInput, SalasUncheckedCreateWithoutSalas_UsuariosInput>
  }

  export type SalasUpsertWithoutSalas_UsuariosInput = {
    update: XOR<SalasUpdateWithoutSalas_UsuariosInput, SalasUncheckedUpdateWithoutSalas_UsuariosInput>
    create: XOR<SalasCreateWithoutSalas_UsuariosInput, SalasUncheckedCreateWithoutSalas_UsuariosInput>
    where?: SalasWhereInput
  }

  export type SalasUpdateToOneWithWhereWithoutSalas_UsuariosInput = {
    where?: SalasWhereInput
    data: XOR<SalasUpdateWithoutSalas_UsuariosInput, SalasUncheckedUpdateWithoutSalas_UsuariosInput>
  }

  export type SalasUpdateWithoutSalas_UsuariosInput = {
    codigoSala?: StringFieldUpdateOperationsInput | string
    pessoasConectadas?: IntFieldUpdateOperationsInput | number
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    hostToken?: StringFieldUpdateOperationsInput | string
    Mensagens?: MensagensUpdateManyWithoutSalaNestedInput
  }

  export type SalasUncheckedUpdateWithoutSalas_UsuariosInput = {
    codigoSala?: StringFieldUpdateOperationsInput | string
    pessoasConectadas?: IntFieldUpdateOperationsInput | number
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    hostToken?: StringFieldUpdateOperationsInput | string
    Mensagens?: MensagensUncheckedUpdateManyWithoutSalaNestedInput
  }

  export type SalasCreateWithoutMensagensInput = {
    codigoSala: string
    pessoasConectadas?: number
    updateAt?: Date | string
    token: string
    hostToken: string
    Salas_Usuarios?: Salas_UsuariosCreateNestedManyWithoutSalaInput
  }

  export type SalasUncheckedCreateWithoutMensagensInput = {
    codigoSala: string
    pessoasConectadas?: number
    updateAt?: Date | string
    token: string
    hostToken: string
    Salas_Usuarios?: Salas_UsuariosUncheckedCreateNestedManyWithoutSalaInput
  }

  export type SalasCreateOrConnectWithoutMensagensInput = {
    where: SalasWhereUniqueInput
    create: XOR<SalasCreateWithoutMensagensInput, SalasUncheckedCreateWithoutMensagensInput>
  }

  export type SalasUpsertWithoutMensagensInput = {
    update: XOR<SalasUpdateWithoutMensagensInput, SalasUncheckedUpdateWithoutMensagensInput>
    create: XOR<SalasCreateWithoutMensagensInput, SalasUncheckedCreateWithoutMensagensInput>
    where?: SalasWhereInput
  }

  export type SalasUpdateToOneWithWhereWithoutMensagensInput = {
    where?: SalasWhereInput
    data: XOR<SalasUpdateWithoutMensagensInput, SalasUncheckedUpdateWithoutMensagensInput>
  }

  export type SalasUpdateWithoutMensagensInput = {
    codigoSala?: StringFieldUpdateOperationsInput | string
    pessoasConectadas?: IntFieldUpdateOperationsInput | number
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    hostToken?: StringFieldUpdateOperationsInput | string
    Salas_Usuarios?: Salas_UsuariosUpdateManyWithoutSalaNestedInput
  }

  export type SalasUncheckedUpdateWithoutMensagensInput = {
    codigoSala?: StringFieldUpdateOperationsInput | string
    pessoasConectadas?: IntFieldUpdateOperationsInput | number
    updateAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    hostToken?: StringFieldUpdateOperationsInput | string
    Salas_Usuarios?: Salas_UsuariosUncheckedUpdateManyWithoutSalaNestedInput
  }

  export type MensagensCreateManySalaInput = {
    id?: number
    mensagem: string
    mensagemTraduzida?: string | null
    usuario: string
    dataEnvio: Date | string
    apelido?: string | null
    avatar?: string | null
    linguaOriginal?: string | null
  }

  export type Salas_UsuariosCreateManySalaInput = {
    id?: number
    userData: string
    userHash: string
    host?: boolean
  }

  export type MensagensUpdateWithoutSalaInput = {
    mensagem?: StringFieldUpdateOperationsInput | string
    mensagemTraduzida?: NullableStringFieldUpdateOperationsInput | string | null
    usuario?: StringFieldUpdateOperationsInput | string
    dataEnvio?: DateTimeFieldUpdateOperationsInput | Date | string
    apelido?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    linguaOriginal?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MensagensUncheckedUpdateWithoutSalaInput = {
    id?: IntFieldUpdateOperationsInput | number
    mensagem?: StringFieldUpdateOperationsInput | string
    mensagemTraduzida?: NullableStringFieldUpdateOperationsInput | string | null
    usuario?: StringFieldUpdateOperationsInput | string
    dataEnvio?: DateTimeFieldUpdateOperationsInput | Date | string
    apelido?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    linguaOriginal?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type MensagensUncheckedUpdateManyWithoutSalaInput = {
    id?: IntFieldUpdateOperationsInput | number
    mensagem?: StringFieldUpdateOperationsInput | string
    mensagemTraduzida?: NullableStringFieldUpdateOperationsInput | string | null
    usuario?: StringFieldUpdateOperationsInput | string
    dataEnvio?: DateTimeFieldUpdateOperationsInput | Date | string
    apelido?: NullableStringFieldUpdateOperationsInput | string | null
    avatar?: NullableStringFieldUpdateOperationsInput | string | null
    linguaOriginal?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type Salas_UsuariosUpdateWithoutSalaInput = {
    userData?: StringFieldUpdateOperationsInput | string
    userHash?: StringFieldUpdateOperationsInput | string
    host?: BoolFieldUpdateOperationsInput | boolean
  }

  export type Salas_UsuariosUncheckedUpdateWithoutSalaInput = {
    id?: IntFieldUpdateOperationsInput | number
    userData?: StringFieldUpdateOperationsInput | string
    userHash?: StringFieldUpdateOperationsInput | string
    host?: BoolFieldUpdateOperationsInput | boolean
  }

  export type Salas_UsuariosUncheckedUpdateManyWithoutSalaInput = {
    id?: IntFieldUpdateOperationsInput | number
    userData?: StringFieldUpdateOperationsInput | string
    userHash?: StringFieldUpdateOperationsInput | string
    host?: BoolFieldUpdateOperationsInput | boolean
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}