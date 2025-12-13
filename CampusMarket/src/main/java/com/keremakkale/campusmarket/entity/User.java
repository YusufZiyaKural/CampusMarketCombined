package com.keremakkale.campusmarket.entity;

import jakarta.persistence.*; // Veritabanı işlemleri için gerekli kütüphane
import lombok.Data; // Getter ve Setter'ları otomatik yazar

@Entity
@Data
@Table(name = "users") // Veritabanındaki tablo adı

public class User {

    @Id //(Primary Key).
    @GeneratedValue(strategy = GenerationType.IDENTITY)// ID'ler 1, 2, 3 diye otomatik artsın.
    private Long id;

    @Column(nullable = false) // Boş olamaz
    private String fullName;

    @Column(nullable = false, unique = true) // Boş olamaz ve benzersiz olmalı
    private String email;

    private String password;

    private String phoneNumber;


}
