// src/components/Register.js
import React, { useState } from 'react';

const Register = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    phoneNumber: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');


  const handleChange = (e) => {
    const { name, value } = e.target;

    // Eğer değiştirilen alan 'phoneNumber' ise özel kontrol yap
    if (name === 'phoneNumber') {
      // Girilen değerin içinden RAKAM OLMAYAN her şeyi sil
      const onlyNums = value.replace(/[^0-9]/g, ''); //veritabanına temiz veri gitmesini sağlıyor

      // Maksimum 11 karakter sınırı (Örn: 05551234567)
      if (onlyNums.length <= 11) {
        setFormData({ ...formData, [name]: onlyNums });
      }
    } 
    // Diğer alanlar (isim, email vs.) için normal davran
    else {
      setFormData({ ...formData, [name]: value });
    }
  };
  // -------------------------------

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch('http://localhost:8080/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const responseText = await response.text();

      if (response.ok) {
        setSuccess('Kayıt başarılı! Giriş ekranına yönlendiriliyorsunuz...');
        setTimeout(() => {
          onSwitchToLogin(); 
        }, 2000);
      } else {
        setError(responseText || 'Kayıt başarısız. Bilgileri kontrol edin.');
      }
    } catch (err) {
      console.error(err);
      setError('Sunucuya bağlanılamadı.');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <h1 className="login-title">Kayıt Ol</h1>
        <p className="login-subtitle">CampusMarket ailesine katıl</p>

        {error && <div className="error-message">{error}</div>}
        {success && <div className="success-message" style={{ color: 'green', marginBottom: '10px' }}>{success}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Ad Soyad</label>
            <input 
              type="text" 
              name="fullName" 
              value={formData.fullName} 
              onChange={handleChange} 
              required 
              placeholder="Örn: Ali Yılmaz"
            />
          </div>

          <div className="form-group">
            <label>Email (Okul E-postası)</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange} 
              required 
              placeholder="ogrenci@uni.edu.tr"
            />
          </div>

          <div className="form-group">
            <label>Telefon Numarası</label>
            <input 
              type="tel" // Mobilde numara klavyesi açılsın diye
              name="phoneNumber" 
              value={formData.phoneNumber} 
              onChange={handleChange} 
              required 
              placeholder="05XXXXXXXXX" 
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

          <button type="submit" className="btn-submit">Hesap Oluştur</button>
        </form>
        
        <div className="login-footer">
           Zaten hesabın var mı? <span onClick={onSwitchToLogin}>Giriş Yap</span>
        </div>
      </div>
    </div>
  );
};

export default Register;