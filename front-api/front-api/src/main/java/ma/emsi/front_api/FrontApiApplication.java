package ma.emsi.front_api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@EnableFeignClients
@SpringBootApplication
public class FrontApiApplication {

	public static void main(String[] args) {
		SpringApplication.run(FrontApiApplication.class, args);
	}

}
