package ma.emsi.microservice_commandes.repositories;

import ma.emsi.microservice_commandes.entities.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    List<Order> findByCreatedAtAfter(LocalDateTime date); //pour var de config
}
