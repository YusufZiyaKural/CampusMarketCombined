package com.keremakkale.campusmarket.config;

import com.keremakkale.campusmarket.entity.Category;
import com.keremakkale.campusmarket.entity.User;
import com.keremakkale.campusmarket.repository.CategoryRepository;
import com.keremakkale.campusmarket.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component // Spring'e: "Bu sınıfı proje başlarken otomatik çalıştır" der.
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final CategoryRepository categoryRepository;

    // Constructor (Kurucu Metot):
    // Proje açılırken Spring Boot, "Senin bu repository'lere ihtiyacın var, al bunları kullan" diyerek buraya otomatik doldurur.
    // Buna "Dependency Injection" denir.

    public DataSeeder(UserRepository userRepository, CategoryRepository categoryRepository) {
        this.userRepository = userRepository;
        this.categoryRepository = categoryRepository;

    }

    @Override
    public void run(String... args) throws Exception {
        // Eğer kullanıcı tablosu boşsa, örnek kullanıcı ekle
        if(userRepository.count()==0){
            User user1 = new User();
            user1.setFullName("Kerem Beyazkale");
            user1.setEmail("kerem@dogus.edu.tr");
            user1.setPassword("kerem03");
            user1.setPhoneNumber("+905555555555");
// .save(): Hazırladığımız bu kullanıcıyı veritabanına ("INSERT INTO users...") koduyla yazar.
            userRepository.save(user1);
            // Konsola bilgi mesajı basar, çalıştığını görelim diye.
            System.out.println("--- Örnek Kullanıcı EKLENDİ! ---");
        }
        // Eğer kategori tablosu boşsa, örnek kategoriler ekle
        if(categoryRepository.count()==0){
            Category category1 = new Category();
            category1.setName("Ders Kitapları");

            Category category2 = new Category();
            category2.setName("Elektronik");

            Category category3 = new Category();
            category3.setName("Ev Eşyası");

            // .saveAll(): Tek tek kaydetmek yerine bir liste veriyoruz, hepsini tek seferde kaydediyor.
            // Arrays.asList(...): Bu 3 kategoriyi hızlıca bir listeye çevirir.
            categoryRepository.saveAll(Arrays.asList(category1, category2, category3));
            System.out.println("--- Örnek Kategoriler EKLENDİ! ---");

        }
    }


}
