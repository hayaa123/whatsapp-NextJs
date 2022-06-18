import { Button } from "@material-ui/core";
import Head from "next/head";
import styled from "styled-components"
import { auth, provider } from "../firebase";
import {signInWithPopup} from "firebase/auth"
function Login() {

  const signIn = ()=>{
      signInWithPopup(auth,provider).catch(alert);
  }

  return (
    <Container>
        <Head>
            <title>login</title>
        </Head>

        <LoginContainer>
          <Logo
          src="https://conniescomfortsuites.com/wp-content/uploads/2018/03/WHATSAPP-LOGO.png"
          />

          <Button onClick={signIn} variant="outlined">Sign in with google</Button>
        </LoginContainer>
    </Container>
  )
}

export default Login

const Container = styled.div`
display:grid;
place-items: center;
height:100vh;
background-color:whitesmoke;

`;

const LoginContainer = styled.div`
  padding: 100px;
  display: flex;
  flex-direction:column;
  align-items:center;
  background-color:white;
  border-radius: 5px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
`;

const Logo = styled.img`
height:200px;
width:200px;
margin-bottom:50px;
`;