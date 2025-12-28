package ma.emsi.front_api.dto;

import lombok.Data;

@Data
public class CreateOrderRequest {
    private Long productId;
    private int quantity;

}
