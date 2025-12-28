package ma.emsi.microservice_commandes.controller;

import ma.emsi.microservice_commandes.dto.CreateOrderRequest;
import ma.emsi.microservice_commandes.dto.ProductDTO;
import ma.emsi.microservice_commandes.entities.Order;

import ma.emsi.microservice_commandes.repositories.OrderRepository;
import ma.emsi.microservice_commandes.service.ProduitsService;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/orders")
public class OrderController {

    private final OrderRepository repo;

    // vient du Config Server (Git)
    @Value("${mes-config-ms.commandes-last}")
    private int lastDays;

    private final ProduitsService produitsService;

    public OrderController(OrderRepository repo, ProduitsService produitsService) {
        this.repo = repo;
        this.produitsService = produitsService;
    }



    // crée une commande "simple"
    @PostMapping
    public Order create() {
        Order o = new Order();
        o.setCreatedAt(LocalDateTime.now());
        o.setStatus("CREATED");
        return repo.save(o);
    }

    // liste des commandes récentes (N derniers jours)
    @GetMapping
    public List<Order> recent() {
        LocalDateTime limit = LocalDateTime.now().minusDays(lastDays);
        return repo.findByCreatedAtAfter(limit);
    }

    @GetMapping("/{id}")
    public Order byId(@PathVariable Long id) {
        return repo.findById(id).orElseThrow();
    }
    @PostMapping("/place")
    public Order placeOrder(@RequestBody CreateOrderRequest request) {

        // 1️- appeler microservice-produits via Feign
        ProductDTO product = produitsService.getProductById(request.getProductId());

        // 2️- vérification métier
        if (product.getStock() <= 0) {
            throw new RuntimeException("Produit indisponible pour le moment");
        }


        // 3️- créer la commande
        Order order = new Order();
        order.setCreatedAt(LocalDateTime.now());
        order.setStatus("CONFIRMED");

        return repo.save(order);
    }

}
