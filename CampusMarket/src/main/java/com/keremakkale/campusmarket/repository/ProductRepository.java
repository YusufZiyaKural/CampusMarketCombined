package com.keremakkale.campusmarket.repository;

import com.keremakkale.campusmarket.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long> {

    // Özel İhtiyaç 1: Sadece satılmamış ürünleri listele
    // SQL yazmak yerine İngilizce cümle kurar gibi metod ismi yazıyoruz:
    List<Product> findByIsSoldFalse();

    // Özel İhtiyaç 2: Belirli bir kategorideki ürünleri getir
    List<Product> findByCategory_Id(Long categoryId);
}
