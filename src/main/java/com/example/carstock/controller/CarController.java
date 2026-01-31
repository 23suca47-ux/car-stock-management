package com.example.carstock.controller;

import com.example.carstock.entity.Car;
import com.example.carstock.service.CarService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cars")
public class CarController {

    private final CarService service;

    public CarController(CarService service) {
        this.service = service;
    }

    @GetMapping
    public List<Car> getAllCars() {
        return service.getAllCars();
    }
    @GetMapping("/{id}")
    public Car getCarById(@PathVariable Long id) {
        return service.getCarById(id);
    }
    @PostMapping
    public Car addCar(@RequestBody Car car) {
        return service.saveCar(car);
    }

    @PutMapping("/{id}")
    public Car updateCar(@PathVariable Long id, @RequestBody Car car) {
        return service.updateCar(id, car);
    }

    @DeleteMapping("/{id}")
    public String deleteCar(@PathVariable Long id) {
        service.deleteCar(id);
        return "Car deleted successfully";
    }
}
