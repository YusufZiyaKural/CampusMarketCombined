package com.keremakkale.campusmarket.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String title; //ilan başlığı

    @Column(length = 1000)
    private String description;

    private Double price;
    private String imageUrl;
    private Boolean isSold = false;
    private LocalDateTime createdAt = LocalDateTime.now(); // İlan tarihi (şu an)

    // ---- İLİŞKİLER ----

    // Bir ürünün TEK bir Satıcısı olur
    @ManyToOne
    @JoinColumn(name = "seller_id", nullable = false)
    private User seller;

    // Bir ürünüt Tek bir kategorisi olur
    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;



}
