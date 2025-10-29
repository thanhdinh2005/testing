package com.testing.assigment2.mapper;

import com.testing.assigment2.dto.request.ProductRequest;
import com.testing.assigment2.dto.response.ProductResponse;
import com.testing.assigment2.entity.Product;

public class ProductMapper {
    public Product toEntity(ProductRequest request){
        return Product.builder()
                .name(request.getName())
                .price(request.getPrice())
                .quantity(request.getQuantity())
                .build();
    }

    public ProductResponse toResponse(Product product){
        return ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .categoryName(product.getCategory().getName())
                .price(product.getPrice())
                .quantity(product.getQuantity())
                .build();
    }
}
