// src/App.js
import React, { useEffect, useState } from 'react';
import './App.css';
import ProductCard from './components/ProductCard';
import AddProductForm from './components/AddProductForm';
import Login from './components/Login';
import Register from './components/Register'; // Yeni ekledik

function App() {
  const [user, setUser] = useState(null); //user state ile kullanıcının giriş yapıp yapmadığını takip ediyoruz
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Login ekranında mı yoksa Register ekranında mı olduğunu tutan state
  const [isRegistering, setIsRegistering] = useState(false); 

  useEffect(() => {
    const storedUser = localStorage.getItem('campusUser');  // LocalStorage ı hatırlar
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      fetchProducts();
    }
  }, []);

  const fetchProducts = async () => {//Ürünleri backendden çekiyoruz
    setLoading(true);
    try {
      const response = await fetch('http://localhost:8080/api/products');
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (error) {
      console.error("Hata:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (userData) => {//Giriş yapıldığında kullanıcı verisini alıyoruz, Ana ekran
    setUser(userData);
    localStorage.setItem('campusUser', JSON.stringify(userData));
    fetchProducts();
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('campusUser');
    setProducts([]);
    setIsRegistering(false); // Çıkış yapınca login ekranına dönsün
  };


  // 1. Kullanıcı giriş yapmamışsa:
  if (!user) {
    if (isRegistering) {
      // Kayıt Ekranı
      return <Register onSwitchToLogin={() => setIsRegistering(false)} />;
    } else {
      // Giriş Ekranı
      return (
        <Login 
          onLogin={handleLogin} 
          onSwitchToRegister={() => setIsRegistering(true)} 
        />
      );
    }
  }


  // KULLANICI VARSA ANA UYGULAMAYI GÖSTER
  return (
    <div className="App">
      <nav className="navbar">
        <div className="container nav-container">
          <div className="logo">📘 CampusMarket</div>
          <div className="nav-links">
            {/* Kullanıcı adını gösterelim */}
            <span>Merhaba, {user.fullName || user.username || 'Öğrenci'}</span> 
            <button className="btn-nav logout" onClick={handleLogout}>Çıkış Yap</button>
          </div>
        </div>
      </nav>

      <div className="container main-layout">
        <aside className="sidebar">
          <div className="sticky-wrapper">
            {/* Login olan kullanıcının ID'sini forma gönderiyoruz */}
            <AddProductForm onProductAdded={fetchProducts} currentUser={user} />
          </div>
        </aside>

        <main className="content">
          <div className="content-header">
            <h2>Vitrin</h2>
            <span className="product-count">{products.length} ilan listeleniyor</span>
          </div>

          {loading ? (
            <div className="loading">Yükleniyor...</div>
          ) : (
            <div className="products-grid">
              {products.length > 0 ? (
                products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <div className="no-products">
                  <p>Henüz ilan yok.</p>
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;