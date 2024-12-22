Feature: Búsqueda de usuarios

  Scenario Outline: Buscar usuario por id
    Given Tengo el siguiente api: "<endpoint>"
    When Se busque por el usuario con id: "<id>"
    Then El estado de la respuesta del api debe ser: "<statusCode>"

    Examples:
      | endpoint           | id  | statusCode |
      | /v1/users/find?id= |   1 |        200 |
      | /v1/users/find?id= | 999 |        404 |
      | /v1/users/find?id= | n   |        400 |
