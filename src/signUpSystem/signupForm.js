// import React from "react";
// import { useLazyQuery, gql } from "@apollo/client";

// export function SignupForm() {
//   let userName = React.useRef();
//   let password = React.useRef();
//   let email = React.useRef();
//   const signUpQuery = gql`
//     query signUp($userName: String!, $email: String!, $password: String!) {
//       signUp(userName: $userName, emailAdress: $email, password: $password)
//     }
//   `;
//   const [signUp, { data }] = useLazyQuery(signUpQuery);
//   const handleSubmit = async () => {
//     userName = userName.current.value;
//     password = password.current.value;
//     email = email.current.value;
//     signUp({
//       variables: {
//         userName: userName,
//         email: email,
//         password: password,
//       },
//     });
//     console.log(await data);
//   };

//   return (
//     <div>
//       <label>
//         Name:
//         <input type="text" ref={userName} />
//       </label>
//       <label>
//         Password:
//         <input type="password" ref={password} />
//       </label>
//       <label>
//         Email:
//         <input type="text" ref={email} />
//       </label>
//       <button onClick={() => handleSubmit()}>Submit</button>
//     </div>
//   );
// }
