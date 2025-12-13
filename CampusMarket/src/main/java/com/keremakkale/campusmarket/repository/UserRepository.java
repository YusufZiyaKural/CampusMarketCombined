package com.keremakkale.campusmarket.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.keremakkale.campusmarket.entity.User;

// JpaRepository<User, Long>: "Ben User tablosunu yönetecem, ID türü de Long" demektir.
public interface UserRepository extends JpaRepository<User, Long> {

    // Spring Boot burada sihir yapar. İçine kod yazmana gerek yok.
    // .save(), .findAll(), .delete() gibi metodların hepsi hazır gelir.

    // Ekstra özellik: Email ile kullanıcı bulmak istersek sadece bunu yazarız:
    User findByEmail(String email);
}
