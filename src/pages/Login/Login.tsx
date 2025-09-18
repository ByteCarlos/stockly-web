import { useState } from "react";
import type { UserLogin, AuthResponse } from "../../types/models";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash, faUser } from '@fortawesome/free-solid-svg-icons'
import axios from "axios";
import './Login.css';

interface LoginProps {
    onLogin: (token: string) => void;
}

export default function Login({ onLogin }: LoginProps) {
    const [form, setForm] = useState<UserLogin>({ username: "", password: "" });
    const [error, setError] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleShowPassword = () => {
        setShowPassword((prevState) => !prevState);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await axios.post<AuthResponse>(
            `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
            form,
            {
                headers: { "Content-Type": "application/json" },
            }
            );

            onLogin(res.data.token);
        } catch (err: unknown) {
            if (axios.isAxiosError(err)) {
                setError(err.response?.data?.message || "Erro de conexão");
            } else if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Erro inesperado");
            }
        }
    };

    return (
        <div className="login-page">
            <div className="logo-container"></div>
            <div className="form-container">
                <h2>Acesse sua conta</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-input">
                        <input
                            type="text"
                            name="username"
                            placeholder="Usuário"
                            value={form.username}
                            onChange={handleChange}
                            required
                        />
                        <FontAwesomeIcon icon={faUser} />
                    </div>
                    <div className="form-input input-password">
                        <input
                            type={!showPassword ? "password" : "text"}
                            name="password"
                            placeholder="Senha"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />
                        <FontAwesomeIcon icon={!showPassword ? faEyeSlash : faEye} onClick={handleShowPassword} style={{ cursor: 'pointer'}}/>
                    </div>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    <button type="submit">Acessar</button>
                </form>
            </div>
        </div>
    );
}
