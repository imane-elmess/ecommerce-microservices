package ma.emsi.microservice_commandes.service;
import io.github.resilience4j.circuitbreaker.annotation.CircuitBreaker;
import ma.emsi.microservice_commandes.dto.ProductDTO;
import ma.emsi.microservice_commandes.proxies.ProduitsProxy;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;

@Service
public class ProduitsService {

    private final ProduitsProxy produitsProxy;

    public ProduitsService(ProduitsProxy produitsProxy) {
        this.produitsProxy = produitsProxy;
    }

    //Circuit breaker sur l'appel Feign
    @CircuitBreaker(name = "produitsService", fallbackMethod = "fallbackProductById")
    public ProductDTO getProductById(Long id) {
        return produitsProxy.productById(id);
    }

    //Fallback (doit avoir même signature + Throwable à la fin)
    public ProductDTO fallbackProductById(Long id, Throwable ex) {
        ProductDTO p = new ProductDTO();
        p.setId(id);
        p.setName("SERVICE PRODUITS INDISPONIBLE");
        p.setPrice(BigDecimal.valueOf(0.0));
        p.setStock(0);
        return p;
    }

}

