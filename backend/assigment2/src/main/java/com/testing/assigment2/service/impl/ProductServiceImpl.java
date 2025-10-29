package com.testing.assigment2.service.impl;

import com.testing.assigment2.dto.request.ProductRequest;
import com.testing.assigment2.dto.response.ProductResponse;
import com.testing.assigment2.service.ProductService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {
    @Override
    public List<ProductResponse> getAllProducts() {
        return List.of();
    }

    @Override
    public ProductResponse getById(Long id) {
        return null;
    }

    @Override
    public ProductResponse createProduct(ProductRequest request) {
        return null;
    }

    @Override
    public ProductResponse updateProductById(Long id, ProductRequest request) {
        return null;
    }

    @Override
    public void deleteProduct(Long id) {

    }
}
