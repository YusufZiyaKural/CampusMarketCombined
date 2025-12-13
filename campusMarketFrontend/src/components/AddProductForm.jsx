// src/components/AddProductForm.js
import React, { useState } from 'react';

// currentUser prop'unu buraya ekledik!
const AddProductForm = ({ onProductAdded, currentUser }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    imageUrl: '',
    categoryId: '1' // Varsayılan: Ders Kitapları
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

const handleSubmit = async (e) => {
    e.preventDefault();

    // --- LOGLARI BURAYA KOYUYORUZ ---
    console.log("Forma Gelen currentUser:", currentUser);
    
    let sellerId = 1; 
    
    // currentUser varsa ID'sini al
    if (currentUser && currentUser.id) {
        sellerId = currentUser.id;
    } 
    // Yoksa localStorage'a bak
    else {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const parsedUser = JSON.parse(storedUser);
            sellerId = parsedUser.id;
        }
    }

    console.log("SEÇİLEN SATICI ID:", sellerId);

    const payload = {
      title: formData.title,
      description: formData.description,
      price: parseFloat(formData.price),
      imageUrl: formData.imageUrl,
      seller: {
        id: sellerId
      },
      category: {
        id: parseInt(formData.categoryId)
      }
    };

    try {
      // --- EKSİK OLAN KISIM BURASIYDI ---
      const response = await fetch('http://localhost:8080/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        const newProduct = await response.json();
        alert('İlan başarıyla yayınlandı! 🎉');
        
        // Formu temizle
        setFormData({
            title: '', description: '', price: '', imageUrl: '', categoryId: '1'
        });

        // Listeyi güncellemek için üst bileşene haber ver
        if (onProductAdded) {
            onProductAdded(newProduct);
        }
      } else {
        alert('İlan yayınlanırken bir hata oluştu.');
      }
    } catch (error) {
      console.error('Bağlantı Hatası:', error);
      alert('Sunucuya bağlanılamadı. Backend açık mı?');
    }
  };

  return (
    <div className="form-container">
      <h2>Yeni İlan Ver</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Ürün Başlığı</label>
          <input type="text" name="title" value={formData.title} onChange={handleChange} required placeholder="Örn: Calculus Kitabı" />
        </div>

        <div className="form-group">
          <label>Açıklama</label>
          <textarea name="description" value={formData.description} onChange={handleChange} rows="3" placeholder="Ürün detayları..." />
        </div>

        <div className="form-group">
          <label>Fiyat (TL)</label>
          <input type="number" name="price" value={formData.price} onChange={handleChange} required step="0.01" />
        </div>

        <div className="form-group">
          <label>Resim URL</label>
          <input type="text" name="imageUrl" value={formData.imageUrl} onChange={handleChange} placeholder="https://..." />
        </div>

        <div className="form-group">
          <label>Kategori</label>
          <select name="categoryId" value={formData.categoryId} onChange={handleChange}>
            <option value="1">Ders Kitapları</option>
            <option value="2">Elektronik</option>
            <option value="3">Ev Eşyası</option>
          </select>
        </div>

        <button type="submit" className="btn-submit">İlanı Yayınla</button>
      </form>
    </div>
  );
};

export default AddProductForm;