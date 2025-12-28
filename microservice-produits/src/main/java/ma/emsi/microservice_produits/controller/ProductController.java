package ma.emsi.microservice_produits.controller;

import ma.emsi.microservice_produits.entities.Product;
import ma.emsi.microservice_produits.repo.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
public class ProductController {
    private final ProductRepository repo;

    public ProductController(ProductRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Product> all() {
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public Product byId(@PathVariable Long id) {
        return repo.findById(id).orElseThrow();
    }

    @PostMapping
    public Product save(@RequestBody Product p) {
        return repo.save(p);
    }
}
