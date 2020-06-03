/** @format */

export function getMngrCredentialsTemplate(
  name: string,
  id: string,
  userName: string,
  password: string,
) {
  const html = `
  <html>
  <head>
    <style>
        @import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");
    </style>
  </head>
  <body style="font-family: Roboto;">
    <p>
      <strong>Welcome ${name}</strong>
    </p>
    <p> 
        <p style="justify-content: left;">Here are your <b>Login Credentials</b></p> 
        <div style="justify-content: left; width: 150px;">
            <strong>
                <p style="background-color: yellow;">Username: ${userName}</p>
                <p style="background-color: yellow;">Password: ${password}</p>
            </strong>
        </div>
        <div> Login  <a href="http://localhost:3000/manager/login" target="blank">Here</a> with above credentials.</div>
    </p>
    <footer style="justify-content:left; text-align: center;">
        * The above credentials are confidential and generate by the server with no human intervention, strictly not to be shared with anyone with in the organization or outside.    </footer>
  </body>
</html>
  `;
  return html;
}
