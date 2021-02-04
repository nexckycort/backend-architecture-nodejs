export const confirmAccountHtml = (url: string): string => /* html */ `
  <h1 style="
  text-align: center;
  font-family: Arial, Helvetica;
  ">Confirmar tu Cuenta</h1>
  <p style="font-family: Arial, Helvetica;">Hola, estas a un paso de..., solo debes confirmar tu cuenta en el siguiente enlace:</p>

  <a style="
  display: block;
  font-family: Arial, Helvetica;
  padding: 1rem;
  background-color: #00C897;
  color: white;
  text-transform: uppercase;
  text-align: center;
  text-decoration: none;
  " href="${url}">Confirmar tu cuenta</a>

  <p style="font-family: Arial, Helvetica;">Sino puedes acceder a este enlace , vísita : ${url}</p>

  <p style="font-family: Arial, Helvetica;">Si no solicitaste este e-mail puedes ignorarlo</p>
`

export const confirmAccountText = (url: string): string => `
  Confirmar tu Cuenta

  
  Hola, estas a un paso de comenzar a crear una comunidad, solo debes confirmar tu cuenta en el siguiente enlace:

  Sino puedes acceder a este enlace , vísita : ${url}

  Si no solicitaste este e-mail puedes ignorarlo
`
