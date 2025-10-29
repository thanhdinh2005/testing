package com.testing.assigment2.service;

import com.testing.assigment2.dto.request.ProductRequest;
import com.testing.assigment2.dto.response.ProductResponse;

import java.util.List;

public interface ProductService {
    List<ProductResponse> getAllProducts();
    ProductResponse getById(Long id);
    ProductResponse createProduct(ProductRequest request);
    ProductResponse updateProductById(Long id, ProductRequest request);
    void deleteProduct(Long id);
}
