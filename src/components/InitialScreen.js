import styled from "styled-components";
import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo-trackit.png";
import axios from "axios";

import Loading from "./Loading";
import UserContext from "../context/UserContext";

function LoginInput({ dataInput, handleFormChange, login, blockInput }) {
    return (
        <Forms onSubmit={login} blockInput={blockInput}>
            <input type="email" name="email" placeholder="email" onChange={(e) => handleFormChange(e)} value={dataInput.email} required />
            <input type="password" name="password" placeholder="senha" onChange={(e) => handleFormChange(e)} value={dataInput.password} required />
            <Button blockInput={blockInput} type="submit">{blockInput ? <Loading /> : "Entrar"}</Button>
        </Forms>
    );
}

export default function InitialScreen() {
    const [dataInput, setDataInput] = useState({
        email: "",
        password: ""
    });
    const [blockInput, setBlockInput] = useState(false);
    const { setUserInfo } = useContext(UserContext);

    const navigate = useNavigate();

    function handleFormChange(e) {
        let data = { ...dataInput };
        data[e.target.name] = e.target.value;
        setDataInput(data);
    }

    function login(e) {
        e.preventDefault();
        setBlockInput(true);

        let promise = axios.post("https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login", dataInput);
        promise.then(response => {
            setUserInfo(response.data);
            navigate("/hoje");
        });

        promise.catch(err => {
            alert(err.response.data.message);
            setBlockInput(false);
        });
    }

    return (
        <Box>
            <img src={logo} alt="logo" />
            <LoginInput dataInput={dataInput} handleFormChange={handleFormChange} login={login} blockInput={blockInput} />
            <Link to="/cadastro"><p>Não tem uma conta? Cadastre-se!</p></Link>
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
    }
`;

const Forms = styled.form`
    display: flex;
    flex-direction: column;
    margin: 30px 0 0 0;

    input[type=email], input[type=password] {
        width: 295px;
        height: 45px;
        pointer-events: ${props => props.blockInput ? "none" : ""};
        background-color: ${props => props.blockInput ? "#F2F2F2" : "#FFFFFF"};
        color: ${props => props.blockInput ? "#AFAFAF" : ""};
        border: 1px solid #D5D5D5;
        border-radius: 5px;
        margin: 5px 0 0 0;
        padding: 0 0 0 10px;

        ::placeholder{
            font-size: 20px;
            color: #DBDBDB;
        }
    }
`;

const Button = styled.button`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 306px;
    height: 50px;
    background: #52B6FF;
    border-radius: 4px;
    margin: 5px 0 0 0;
    color: white;
    font-size: 20px;
    border: none;
    pointer-events: ${props => props.blockInput ? "none" : ""};
`;