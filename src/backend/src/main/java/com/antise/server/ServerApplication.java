package com.antise.server;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.antise.server.auth.repositories.UserRepository;

@SpringBootApplication
public class ServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(ServerApplication.class, args);
	}

	// @Bean
	// CommandLineRunner runner(UserRepository userRepository, ReviewRepository reviewRepository, LocationRepository locationRepository) {
	// 	return args -> {
	// 		RandomGenerator randomGenerator = new RandomGenerator();

			
	// 	};
	// }
}
