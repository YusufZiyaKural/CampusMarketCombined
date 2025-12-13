// src/components/Login.js
import React, { useState } from 'react';

const Login = ({ onLogin, onSwitchToRegister }) => {
  // DEĞİŞİKLİK 1: 'username' yerine 'email' yazdık
  const [formData, setFormData] = useState({
    email: '', 
    password: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:8080/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        // Backend kullanıcı bilgisini döndüğü için direkt alıyoruz
        onLogin(data); 
      } else {
        // Backend'den gelen hatayı (Şifre yanlış vs.) okumaya çalışalım
        const errorMessage = await response.text(); 
        setError(errorMessage || 'Kullanıcı adı veya şifre hatalı!');
      }
    } catch (err) {
      console.error(err);
      setError('Sunucuya bağlanılamadı.');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h1 className="login-title">CampusMarket</h1>
        <p className="login-subtitle">Kampüs hesabınla giriş yap</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Adresi</label>
            {/* DEĞİŞİKLİK 2: name="email" ve value={formData.email} yaptık */}
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
              placeholder="ornek@dogus.edu.tr"
            />
          </div>

          <div className="form-group">
            <label>Şifre</label>
            <input 
              type="password" 
              name="password" 
              value={formData.password} 
              onChange={handleChange} 
              required 
              placeholder="******"
            />
          </div>

          <button type="submit" className="btn-submit">Giriş Yap</button>
        </form>
        
        <div className="login-footer">
           Hesabın yok mu? <span onClick={onSwitchToRegister}>Kayıt Ol</span>
        </div>
      </div>
    </div>
  );
};

export default Login;