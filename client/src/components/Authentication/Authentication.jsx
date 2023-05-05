import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./Authentication.module.scss";
import { useMutation } from "@apollo/client";
import LOGIN_MUTATION from "../../graphql/Mutations/Login";

const AUTH_TOKEN = "auth-token";

const Authentication = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [login] = useMutation(LOGIN_MUTATION);

  const onSubmit = (data) => {
    login({
      variables: { email: data.email, password: data.password },
      onCompleted: ({ login }) => {
        localStorage.setItem(AUTH_TOKEN, login.token);
        navigate("/home");
      },
    });
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <div className="login-box-1">
          <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <h2>Welcome to GraphQL Demo</h2>
              <h1 style={{ fontSize: "20px" }}>
                A query language for your API
              </h1>
            </div>
            <div>
              <label className="field-label">Email</label>
              <input
                className="input-box"
                type="text"
                name="email"
                {...register("email")}
              />
            </div>
            <div>
              <label className="field-label">Password</label>
              <input
                className="input-box"
                type="password"
                name="password"
                {...register("password")}
              />
            </div>

            <button className="login-form-button" type="submit">
              Login
            </button>
          </form>
        </div>

        <div className="login-box-2">
          <img src="/graphql.png" alt="graphql" width={600} />
        </div>
      </div>
    </div>
  );
};

export default Authentication;
