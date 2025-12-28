package ma.emsi.microservice_commandes.dto;

import lombok.Data;

@Data
public class CreateOrderRequest {
    private Long productId;
    private int quantity;

}

