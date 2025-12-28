package ma.emsi.front_api.proxies;

import ma.emsi.front_api.dto.ProductDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@FeignClient(name = "microservice-produits")
public interface ProduitsProxy {

    @GetMapping("/products")
    List<ProductDTO> all();

    @GetMapping("/products/{id}")
    ProductDTO byId(@PathVariable("id") Long id);
}

