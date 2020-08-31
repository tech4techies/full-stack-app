/** @format */

export function getMngrCredentialsTemplate(
  name: string,
  userName: string,
  password: string
) {
  return `
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
}

export function getSchoolRegistrationTemplate(
  userName: string,
  schoolId: string,
  password: string,
  schoolName: string
) {
  return `
  <html>
  <head>
    <style>
        @import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");
    </style>
  </head>
  <body style="font-family: Roboto;">
    <p> 
      <strong> Welcome ${schoolName}! </strong>
    </p>
    <p>
      Greetings from Chaathra. This is an email regarding the successful registration of your school with our platform.
      All the further communication regarding to the platform service will be communicated through this email only.
      <br/> 
      <div style="justify-content: left; width: 150px;">
      <strong>Here are the details:</strong>
      <p style="background-color: yellow;"><strong>School ID : ${schoolId}</strong></p>
      <p style="background-color: yellow;"><strong>Admin UserName : ${userName}</strong></p>
      <p style="background-color: yellow;"><strong>Admin Password : ${password}</strong></p>
      </div>
    </p>
    <footer style="justify-content:left;">
        * The above credentials are confidential and generate by the server with no human intervention, strictly not to be shared with anyone with in the organization or outside.    
    </footer>
  </body>
  </html>
  `;
}
