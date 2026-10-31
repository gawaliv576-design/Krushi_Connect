package com.krushiseva.repository;

import com.krushiseva.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByCategory_Id(Long categoryId);
    List<Product> findByStatus(Product.ProductStatus status);
    List<Product> findByNameContainingIgnoreCase(String name);
}
