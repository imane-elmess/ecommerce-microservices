package ma.emsi.microservice_commandes.entities;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "orders")
@Data
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime createdAt;

    private String status;

    public Order() {}

    public Order(LocalDateTime createdAt, String status) {
        this.createdAt = createdAt;
        this.status = status;
    }
}
