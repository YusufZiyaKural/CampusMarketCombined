package com.keremakkale.campusmarket.repository;

import com.keremakkale.campusmarket.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
// JpaRepository sayesinde .save(), .findAll(), .delete() gibi metodlar hazır gelir.
public interface ProductRepository extends JpaRepository<Product, Long> {

    // Sadece satılmamış ürünleri listele
    // SQL Karşılığı: SELECT * FROM products WHERE is_sold = false;
    // Spring Boot metod isminden ne yapmak istediğimizi anlar
    List<Product> findByIsSoldFalse();

    // Kategoriye göre filtreleme sorgusu.
    // SQL Karşılığı: SELECT * FROM products WHERE category_id = ?;
    List<Product> findByCategory_Id(Long categoryId);
}
