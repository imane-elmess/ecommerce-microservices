package ma.emsi.front_api.dto;



import lombok.Data;

import java.time.LocalDateTime;
@Data
public class OrderDTO {
    private Long id;
    private LocalDateTime createdAt;
    private String status;

}

