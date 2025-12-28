package ma.emsi.microservice_produits;

import ma.emsi.microservice_produits.entities.Product;
import ma.emsi.microservice_produits.repo.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.Bean;

import java.math.BigDecimal;

@EnableDiscoveryClient
@SpringBootApplication
public class MicroserviceProduitsApplication {

	public static void main(String[] args) {
		SpringApplication.run(MicroserviceProduitsApplication.class, args);
	}

	@Bean
	CommandLineRunner init(ProductRepository repo) {
		return args -> {
			repo.save(new Product("Laptop", new BigDecimal("12000"), 5));
			repo.save(new Product("Mouse", new BigDecimal("150"), 30));
		};
	}
}