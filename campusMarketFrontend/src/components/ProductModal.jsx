// src/components/ProductModal.js
import React from 'react';

const ProductModal = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        
        {/* Kapatma Butonu */}
        <button className="modal-close-btn" onClick={onClose}>&times;</button>

        <div className="modal-body">
          {/* Sol Taraf: Büyük Resim */}
          <div className="modal-image-container">
            <img 
              src={product.imageUrl || "https://via.placeholder.com/500?text=Resim+Yok"} 
              alt={product.title} 
              className="modal-image"
            />
          </div>

          {/* Sağ Taraf: Detaylar */}
          <div className="modal-details">
            <span className="badge-lg">{product.category?.name || 'Kategori Yok'}</span>
            <h2 className="modal-title">{product.title}</h2>
            <p className="modal-desc">{product.description}</p>
            
            <h3 className="modal-price">{product.price} TL</h3>

            <hr />

            <div className="modal-seller-info">
              <h4>Satıcı Bilgileri</h4>
              <p><strong>Ad Soyad:</strong> {product.seller?.fullName}</p>
              <p><strong>Email:</strong> {product.seller?.email}</p>
              
              <div className="phone-box">
                <span className="phone-icon">📞</span>
                {/* BURADA TELEFON NUMARASINI GÖSTERİYORUZ */}
                <span className="phone-number">
                    {product.seller?.phoneNumber || 'Numara eklenmemiş'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;