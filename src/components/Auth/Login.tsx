"use client";

const Login = () => {
  const submit = async () => {
    console.log("submit");
  };

  return (
    <div>
      <button onClick={submit}>Login USER</button>
    </div>
  );
};
export default Login;
