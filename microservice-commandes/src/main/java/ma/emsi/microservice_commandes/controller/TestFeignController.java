package ma.emsi.microservice_commandes.controller;

import ma.emsi.microservice_commandes.dto.ProductDTO;
import ma.emsi.microservice_commandes.proxies.ProduitsProxy;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/test-feign")
public class TestFeignController {

    private final ProduitsProxy produitsProxy;

    public TestFeignController(ProduitsProxy produitsProxy) {
        this.produitsProxy = produitsProxy;
    }

    @GetMapping("/products")
    public List<ProductDTO> products() {
        return produitsProxy.allProducts();
    }

    @GetMapping("/products/{id}")
    public ProductDTO product(@PathVariable Long id) {
        return produitsProxy.productById(id);
    }
}

