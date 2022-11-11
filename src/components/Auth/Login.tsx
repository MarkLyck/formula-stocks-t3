import { signIn } from "next-auth/react";

const Login = () => {
  const submit = async () => {
    signIn("credentials", { email: "trpc@test.com", password: "Testing01!" });
  };

  return (
    <div>
      <button onClick={submit}>Login USER</button>
    </div>
  );
};
export default Login;
