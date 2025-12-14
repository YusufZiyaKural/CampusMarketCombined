package com.keremakkale.campusmarket.controller;

import com.keremakkale.campusmarket.entity.Product;
import com.keremakkale.campusmarket.repository.ProductRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
// @RestController: Spring'e "Bu sınıf internetten gelen isteklere (GET, POST) cevap verir" der.
@CrossOrigin(origins = "http://localhost:5173")// Frontend (React) ile haberleşme izni (CORS hatasını önler).
@RestController // Bu sınıfın bir API olduğunu ve JSON verisi döneceğini belirtir.
@RequestMapping("/api/products")
public class ProductController {

    private final ProductRepository productRepository;

    public ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }
//1. Tüm ürünleri listeleme (GET isteği)
    @GetMapping
    public List<Product> getAllProducts(){
        // findAll(): Veritabanındaki tüm ürünleri "SELECT * FROM products" diyerek getirir.
        return productRepository.findAll();
    }
//2. yeni ürün ekleme (POST isteği)
    //@RequestBody: İstek gövdesinden (body) gelen JSON verisini Product nesnesine dönüştürür.
    @PostMapping
    public Product createProduct(@RequestBody Product product){
        // save() Gelen ürünü veritabanına kaydeder.
        return productRepository.save(product);// Veritabanına "INSERT INTO..." sorgusu atar.
    }

}
