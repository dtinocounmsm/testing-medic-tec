Feature: Iniciar sesión

  Scenario: Iniciar sesión satisfactoriamente
    Given Un usuario que desea iniciar sesion accede a ruta "http://localhost:5173/login"
    And Ingresa el usuario: "djoelplay@gmail.com" y la contraseña: "123456"
    When Haga clic en el botón "Ingresar"
    Then El usuario debe ser redirigido a la ruta "http://localhost:5173/users/list"

  Scenario: Iniciar sesión sin ingresar datos
    Given Un usuario que desea iniciar sesion accede a ruta "http://localhost:5173/login"
    When Haga clic en el botón "Ingresar"
    Then El usuario debe permanecer la misma ruta "http://localhost:5173/login"
    And Debería ver los mensajes "Correo es requerido" y "Contraseña es requerida" debajo de su correspondiente input

  Scenario: Iniciar sesión ingresando solo el correo
    Given Un usuario que desea iniciar sesion accede a ruta "http://localhost:5173/login"
    And Ingresa el usuario: "djoelplay@gmail.com"
    When Haga clic en el botón "Ingresar"
    Then El usuario debe permanecer la misma ruta "http://localhost:5173/login"
    And Debería ver el mensaje "Contraseña es requerida" debajo del campo de contraseña

  Scenario: Iniciar sesión ingresando solo la contraseña
    Given Un usuario que desea iniciar sesion accede a ruta "http://localhost:5173/login"
    And Ingresa la contraseña "123456"
    When Haga clic en el botón "Ingresar"
    Then El usuario debe permanecer la misma ruta "http://localhost:5173/login"
    And Debería ver el mensaje "Correo es requerido" debajo del campo de correo

  Scenario: Iniciar sesión con datos Usuario o Contraseña incorrectos
    Given Un usuario que desea iniciar sesion accede a ruta "http://localhost:5173/login"
    And Ingresa el usuario: "fake_email@gmail.com" y la contraseña: "Password"
    When Haga clic en el botón "Ingresar"
    Then El usuario debe permanecer la misma ruta "http://localhost:5173/login"
    And Debería ver el mensaje de error "Usuario o Contraseña incorrectos"
