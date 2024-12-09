import React from "react";
import { Authenticator, useTheme, Image, Heading, View } from '@aws-amplify/ui-react';
import "@aws-amplify/ui-react/styles.css";
import "./auth.css"; 

const components = {
    Header() {
      const { tokens } = useTheme();
  
      return (
        <View textAlign="center" padding={tokens.space.large}>
          <Image
            alt="Logo"
            src="/img/favicon.png"
            class='logo'
          />
        </View>
      );
    },

    SignIn: {
        Header() {
          const { tokens } = useTheme();
      
          return (
            <Heading
              level={3}
              style={{
                textAlign: 'center',
                padding: `${tokens.space.xl} 0 0 ${tokens.space.xl}`
              }}
            >
              Sign into your account
            </Heading>
          );
        },
      },
      
  
SignUp: {
    Header() {
      const { tokens } = useTheme();

      return (
        <Heading
          padding={`${tokens.space.xl} 0 0 ${tokens.space.xl}`}
          level={3}
        >
          Create a new account
        </Heading>
      );
    }
}
}


const SignInSignUp = () => {
    return (
        <div className="auth-container">
            <Authenticator components={components}>
                {({ signOut, user }) => (
                    <div className="welcome">
                        <h1>Welcome, {user.username}</h1>
                        <button onClick={signOut}>Sign Out</button>
                    </div>
                )}
            </Authenticator>
        </div>
    );
};

export default SignInSignUp;
