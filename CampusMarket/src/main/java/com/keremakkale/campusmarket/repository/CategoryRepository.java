package com.keremakkale.campusmarket.repository;

import com.keremakkale.campusmarket.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {

}