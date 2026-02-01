package com.example.carstock.service;

import com.example.carstock.entity.Car;
import com.example.carstock.repository.CarRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CarService {

    private final CarRepository repository;

    public CarService(CarRepository repository) {
        this.repository = repository;
    }

    public List<Car> getAllCars() {
        return repository.findAll();
    }
    public Car getCarById(Long id) {
        return repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Car not found with id: " + id));
    }


    public Car saveCar(Car car) {
        return repository.save(car);
     }
     public Car updateCar(Long id, Car car) {
        Car existingCar = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Car not found"));

        existingCar.setModel(car.getModel());
        existingCar.setBrand(car.getBrand());
        existingCar.setManufactureYear(car.getManufactureYear());
        existingCar.setPrice(car.getPrice());
        existingCar.setStock(car.getStock());

        return repository.save(existingCar);
    }

    public void deleteCar(Long id) {
        repository.deleteById(id);
    }
}
