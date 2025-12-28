package ma.emsi.microservice_produits.repo;

import ma.emsi.microservice_produits.entities.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
}

