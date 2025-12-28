package ma.emsi.microservice_commandes.proxies;
import ma.emsi.microservice_commandes.dto.ProductDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@FeignClient(name = "microservice-produits")
public interface ProduitsProxy {

    @GetMapping("/products")
    List<ProductDTO> allProducts();

    @GetMapping("/products/{id}")
    ProductDTO productById(@PathVariable("id") Long id);
}
