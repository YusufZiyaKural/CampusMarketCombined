package com.keremakkale.campusmarket.controller;

import com.keremakkale.campusmarket.dto.LoginRequest;
import com.keremakkale.campusmarket.dto.RegisterRequest;
import com.keremakkale.campusmarket.entity.User;
import com.keremakkale.campusmarket.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // 1. GİRİŞ YAPMA (LOGIN)
    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        User user = userRepository.findByEmail(loginRequest.getEmail());

        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Kullanıcı bulunamadı!");
        }

        if (!user.getPassword().equals(loginRequest.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Şifre yanlış!");
        }

        return ResponseEntity.ok(user);
    }

    // 2. KAYIT OLMA (REGISTER) - YENİ EKLENEN KISIM
    // Adres: http://localhost:8080/api/auth/register
    @CrossOrigin(origins = "http://localhost:5173")
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest registerRequest) {

        // A. Bu email daha önce alınmış mı kontrol et
        if (userRepository.findByEmail(registerRequest.getEmail()) != null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Bu email adresi zaten kullanılıyor!");
        }

        // B. Yeni kullanıcı oluştur ve bilgileri doldur
        User newUser = new User();
        newUser.setFullName(registerRequest.getFullName());
        newUser.setEmail(registerRequest.getEmail());
        newUser.setPassword(registerRequest.getPassword());
        newUser.setPhoneNumber(registerRequest.getPhoneNumber());

        // C. Veritabanına kaydet
        userRepository.save(newUser);

        return ResponseEntity.ok("Kayıt başarıyla oluşturuldu! Şimdi giriş yapabilirsiniz.");
    }
}