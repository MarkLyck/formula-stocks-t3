import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

const Login = () => {
  const router = useRouter();
  const email = "test2@test.com";
  const password = "Testing01!";

  const submit = async () => {
    const result = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });
    if (result?.ok) {
      router.push("/");
    }
  };

  return (
    <div>
      <button onClick={submit}>Login USER</button>
    </div>
  );
};
export default Login;
