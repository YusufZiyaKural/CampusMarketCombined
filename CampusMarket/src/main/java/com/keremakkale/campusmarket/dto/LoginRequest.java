package com.keremakkale.campusmarket.dto;

import lombok.Data;

@Data // Getter ve Setter'ları otomatik oluşturur
public class LoginRequest {
    private String email;
    private String password;
}