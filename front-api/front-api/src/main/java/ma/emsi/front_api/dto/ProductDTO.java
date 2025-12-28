package ma.emsi.front_api.dto;


import lombok.Data;

import java.math.BigDecimal;
@Data
public class ProductDTO {
    private Long id;
    private String name;
    private BigDecimal price;
    private int stock;

}

