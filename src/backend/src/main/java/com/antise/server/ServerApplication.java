package com.antise.server;

import java.util.List;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.lang.NonNull;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.antise.server.auth.entities.User;
import com.antise.server.auth.entities.UserRole;
import com.antise.server.auth.repositories.UserRepository;
import com.antise.server.entities.Company;
import com.antise.server.exceptions.UserNotFoundException;
import com.antise.server.services.UserService;

import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
public class ServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(ServerApplication.class, args);
	}

	// @Bean
	// public WebMvcConfigurer corsConfigurer() {
    //   	return new WebMvcConfigurer() {
	// 		@Override
	// 		public void addCorsMappings(@NonNull CorsRegistry registry) {
	// 			registry.addMapping("/**")
	// 					.allowedOriginPatterns("*")
	// 					.allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
	// 					.allowedHeaders("*");
	// 		}
    //   	};
   	// }

	@Bean
	CommandLineRunner runner(UserRepository userRepository, UserService userService) {
		return args -> {
			// User user = userRepository.findByEmail("admin@gmail.com").orElseThrow(() -> new UserNotFoundException());

			// user.setRole(UserRole.ADMIN);
			// userRepository.save(user);

			// List<Company> companies = userRepository.findAllCompanies();
			// int LLC = 0, corporation = 0, nonProfit = 0;
			// for(Company company : companies) {
			// 	System.out.println(company.getOrganizationType());
			// 	if (company.getOrganizationType().equals("LLC")) ++LLC;
			// 	else if (company.getOrganizationType().equals("Corporation")) ++corporation;
			// 	else ++nonProfit;
			// }

			// System.out.println(LLC);
			// System.out.println(corporation);
			// System.out.println(nonProfit);

			// System.out.println(userService.countPendingCompanies());
		};
	}
}
