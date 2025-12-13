// src/components/ProductCard.js
import React, { useState } from 'react';
import ProductModal from './ProductModal'; // Modalı içe aktardık

const ProductCard = ({ product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal açık mı kapalı mı?

  return (
    <>
      {/* Karta tıklanınca Modalı AÇ */}
      <div className="product-card" onClick={() => setIsModalOpen(true)}>
        <img 
          src={product.imageUrl || "https://via.placeholder.com/300?text=Resim+Yok"} 
          alt={product.title} 
          className="card-image"
        />
        <div className="card-content">
          <span className="badge">{product.category?.name || 'Kategori Yok'}</span>
          <h3 className="card-title">{product.title}</h3>
          
          {/* Açıklamayı kartta kısa tutalım, detay modalda olsun */}
          <p className="card-desc">
            {product.description.length > 50 
                ? product.description.substring(0, 50) + "..." 
                : product.description}
          </p>
          
          <div className="card-footer">
            <span className="price-tag">{product.price} TL</span>
            <div className="seller-info">
              <strong>Satıcı:</strong><br/>
              {product.seller?.fullName}
            </div>
          </div>
        </div>
      </div>

      {/* Eğer state true ise Modalı Göster */}
      {isModalOpen && (
        <ProductModal 
          product={product} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </>
  );
};

export default ProductCard;