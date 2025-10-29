package com.testing.assigment2.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data @NoArgsConstructor @AllArgsConstructor @Builder
public class ProductRequest {
    private String name;
    private Long quantity;
    private Double price;
    private String categoryName;
}
