import React from 'react';
import { ShieldCheck } from 'lucide-react';
import Modal from '../common/Modal';

export default function AuthModal({
    mode,
    setMode,
    auth,
    setAuth,
    error,
    busy,
    onSubmit,
    onClose
}) {
    return (
        <Modal onClose={onClose}>
            <div className="modalIcon">
                <ShieldCheck />
            </div>

            <span className="eyebrow">
                SECURE ACCOUNT
            </span>

            <h2>
                {mode === 'login'
                    ? 'Welcome back'
                    : 'Create your account'}
            </h2>

            <p className="modalIntro">
                {mode === 'login'
                    ? 'Login to book verified workers and manage your bookings.'
                    : 'Choose whether you are hiring help or offering your skills.'}
            </p>

            <form className="form" onSubmit={onSubmit}>
                {mode === 'register' && (
                    <label>
                        Full name
                        <input
                            value={auth.name}
                            onChange={(e) =>
                                setAuth({
                                    ...auth,
                                    name: e.target.value
                                })
                            }
                            placeholder="Your name"
                            required
                        />
                    </label>
                )}

                <label>
                    Email
                    <input
                        type="email"
                        value={auth.email}
                        onChange={(e) =>
                            setAuth({
                                ...auth,
                                email: e.target.value
                            })
                        }
                        placeholder="you@example.com"
                        required
                    />
                </label>

                <label>
                    Password
                    <input
                        type="password"
                        value={auth.password}
                        onChange={(e) =>
                            setAuth({
                                ...auth,
                                password: e.target.value
                            })
                        }
                        placeholder="At least 6 characters"
                        minLength={6}
                        required
                    />
                </label>

                {mode === 'register' && (
                    <label>
                        Account type
                        <select
                            value={auth.role}
                            onChange={(e) =>
                                setAuth({
                                    ...auth,
                                    role: e.target.value
                                })
                            }
                        >
                            <option value="customer">
                                Customer — I need a service
                            </option>

                            <option value="worker">
                                Worker — I offer a service
                            </option>
                        </select>
                    </label>
                )}

                {error && (
                    <div className="errorBox">
                        {error}
                    </div>
                )}

                <button
                    className="primary full"
                    disabled={busy}
                >
                    {busy
                        ? 'Please wait…'
                        : mode === 'login'
                            ? 'Login'
                            : 'Create account'}
                </button>
            </form>

            <button
                className="switchBtn"
                onClick={() =>
                    setMode(
                        mode === 'login'
                            ? 'register'
                            : 'login'
                    )
                }
            >
                {mode === 'login'
                    ? "Don't have an account? Register"
                    : 'Already have an account? Login'}
            </button>
        </Modal>
    );
}