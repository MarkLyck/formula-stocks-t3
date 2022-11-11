"use client";

const SignUp = () => {
  const submit = async () => {
    console.log("submit");
  };

  return (
    <div>
      <button onClick={submit}>Register USER</button>
    </div>
  );
};
export default SignUp;
