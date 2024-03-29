/* eslint-disable no-unused-vars */
import styled from "styled-components";
import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import logo from "../../assets/images/logo-trackit.png";
import Loading from "../../shared/Loading";
import url from "../../services/api";

function LoginInput({ dataInput, handleFormChange, singup, blockInput }) {
  return (
    <Forms onSubmit={singup} blockInput={blockInput}>
      <input
        type="email"
        name="email"
        placeholder="email"
        onChange={(e) => handleFormChange(e)}
        value={dataInput.email}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="senha"
        onChange={(e) => handleFormChange(e)}
        value={dataInput.password}
        required
      />
      <input
        type="text"
        name="name"
        placeholder="nome"
        onChange={(e) => handleFormChange(e)}
        value={dataInput.name}
        required
      />
      <input
        type="url"
        name="image"
        placeholder="foto"
        onChange={(e) => handleFormChange(e)}
        value={dataInput.image}
        required
      />
      <Button blockInput={blockInput} type="submit">
        {blockInput ? <Loading /> : "Cadastrar"}
      </Button>
    </Forms>
  );
}

export default function SignupScreen() {
  const [dataInput, setDataInput] = useState({
    email: "",
    name: "",
    image: "",
    password: "",
  });
  const [blockInput, setBlockInput] = useState(false);
  const navigate = useNavigate();

  function handleFormChange(e) {
    let data = { ...dataInput };
    data[e.target.name] = e.target.value;
    setDataInput(data);
  }

  function singup(e) {
    e.preventDefault();
    setBlockInput(true);

    let promise = axios.post(url.signup, dataInput);
    // eslint-disable-next-line no-unused-vars
    promise.then(() => {
      navigate("/");
    });

    promise.catch((err) => {
      alert(err.response.data.message);
      setBlockInput(false);
    });
  }

  return (
    <Box>
      <img src={logo} alt="logo" />
      <LoginInput
        dataInput={dataInput}
        handleFormChange={handleFormChange}
        singup={singup}
        blockInput={blockInput}
      />
      <Link to="/">
        <p>Já tem uma conta? Faça login!</p>
      </Link>
    </Box>
  );
}

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 60px auto;

  img {
    width: 200px;
    height: 200px;
  }

  p {
    margin: 25px 0 0 0;
    font-size: 14px;
    color: #52b6ff;
  }
`;

const Forms = styled.form`
  display: flex;
  flex-direction: column;
  margin: 30px 0 0 0;

  input[type="email"],
  input[type="password"],
  input[type="text"],
  input[type="url"] {
    width: 295px;
    height: 45px;
    pointer-events: ${(props) => (props.blockInput ? "none" : "")};
    background-color: ${(props) => (props.blockInput ? "#F2F2F2" : "#FFFFFF")};
    color: ${(props) => (props.blockInput ? "#AFAFAF" : "")};
    border: 1px solid #d5d5d5;
    border-radius: 5px;
    margin: 5px 0 0 0;
    padding: 0 0 0 10px;

    ::placeholder {
      font-size: 20px;
      color: #dbdbdb;
    }
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 306px;
  height: 50px;
  background: #52b6ff;
  border-radius: 4px;
  margin: 5px 0 0 0;
  color: white;
  font-size: 20px;
  border: none;
  pointer-events: ${(props) => (props.blockInput ? "none" : "")};
`;
