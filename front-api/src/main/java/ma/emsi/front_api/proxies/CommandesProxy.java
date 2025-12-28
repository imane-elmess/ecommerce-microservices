package ma.emsi.front_api.proxies;

import ma.emsi.front_api.dto.CreateOrderRequest;
import ma.emsi.front_api.dto.OrderDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@FeignClient(name = "microservice-commandes")
public interface CommandesProxy {

    @GetMapping("/orders")
    List<OrderDTO> recentOrders();

    @PostMapping("/orders/place")
    OrderDTO place(@RequestBody CreateOrderRequest req);
}

