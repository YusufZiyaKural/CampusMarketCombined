package com.keremakkale.campusmarket.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity //Bu sınıfın bir veritabanı tablosunu temsil ettiğini belirtir
@Data   //Lombok kütüphanesi ile getter ve setter metodlarını otomatik oluşturur
@Table(name = "products")  //Tablomuzun veritabanındaki adı prodcuts oldu
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) //ID ler otomatik olarak 1 den başlayarak artıyor
    private Long id;

    @Column(nullable = false)  //Boş bırakılamaz kısıtlaması
    private String title; //ilan başlığı

    @Column(length = 1000)
    private String description;

    private Double price;
    private String imageUrl;
    private Boolean isSold = false;  //İlan satıldı mı? Başlangıçta hayır (false)
    private LocalDateTime createdAt = LocalDateTime.now(); // İlan tarihi (şu an)

    // ---- İLİŞKİLER ----

    // Bir ürünün TEK bir Satıcısı olur
    @ManyToOne
    @JoinColumn(name = "seller_id", nullable = false)// Veritabanında 'seller_id' diye bir sütun açar ve User tablosunun ID'sine bağlar.
    private User seller;

    // Bir ürünün Tek bir kategorisi olur
    @ManyToOne
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

}
