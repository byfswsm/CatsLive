import {signInWithGoogle, signOut, useAuthState} from "../utilities/firebase"
import {Button} from "react-bootstrap"

const SignInButton = () => (
  <Button onClick={signInWithGoogle}>Sign in</Button>
);

const SignOutButton = () => (
  <Button onClick={signOut}>Sign out</Button>
);

const Login = () => {
  const [user] = useAuthState();
  return user ? <SignOutButton /> : <SignInButton />;
};

export default Login;
