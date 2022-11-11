"use client";
import { trpc } from "../../utils/trpc";

const SignUp = () => {
  // const hello = trpc.example.hello.useQuery({ text: "from tRPC" });
  const test = trpc.auth.createUser.useMutation({
    onSuccess: (data) => {
      console.log("🔈 ~ onSuccess", data);
    },
  });

  const submit = async () => {
    const result = test.mutate({
      email: "trpc@test.com",
      password: "Testing01!",
    });
    console.log("🔈 ~ result", result);
  };

  return (
    <div>
      <button onClick={submit}>Register USER</button>
    </div>
  );
};
export default SignUp;
