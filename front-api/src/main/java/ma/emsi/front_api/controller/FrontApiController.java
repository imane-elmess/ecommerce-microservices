package ma.emsi.front_api.controller;

import ma.emsi.front_api.dto.CreateOrderRequest;
import ma.emsi.front_api.dto.OrderDTO;
import ma.emsi.front_api.dto.ProductDTO;
import ma.emsi.front_api.proxies.CommandesProxy;
import ma.emsi.front_api.proxies.ProduitsProxy;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin("http://localhost:5173")
public class FrontApiController {

    private final ProduitsProxy produitsProxy;
    private final CommandesProxy commandesProxy;

    public FrontApiController(ProduitsProxy produitsProxy, CommandesProxy commandesProxy) {
        this.produitsProxy = produitsProxy;
        this.commandesProxy = commandesProxy;
    }

    // Agrégation simple: renvoyer le catalogue
    @GetMapping("/catalog")
    public List<ProductDTO> catalog() {
        return produitsProxy.all();
    }

    //Checkout: passer commande via microservice-commandes
    @PostMapping("/checkout")
    public OrderDTO checkout(@RequestBody CreateOrderRequest req) {
        return commandesProxy.place(req);
    }

    // Commandes récentes
    @GetMapping("/orders")
    public List<OrderDTO> myOrders() {
        return commandesProxy.recentOrders();
    }
}

