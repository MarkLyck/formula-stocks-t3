import { signIn } from "next-auth/react";

import { trpc } from "../../utils/trpc";

const SignUp = () => {
  const email = "test2@test.com";
  const password = "Testing01!";

  const { mutate } = trpc.auth.createUser.useMutation({
    onSuccess: () => {
      signIn("credentials", { email, password });
    },
  });

  const submit = async () => {
    mutate({
      email,
      password,
    });
  };

  return <button onClick={submit}>Register USER</button>;
};
export default SignUp;
