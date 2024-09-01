package com.evaluacion.gestor.controller;

import com.evaluacion.gestor.entity.Departamento;
import com.evaluacion.gestor.service.DepartamentoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/departamentos")
public class DepartamentoController {

    @Autowired
    private DepartamentoService departamentoService;

    // Obtener todos los departamentos
    @GetMapping
    public List<Departamento> getAllDepartamentos() {
        return departamentoService.findAll();
    }

    // Obtener un departamento por ID
    @GetMapping("/{id}")
    public ResponseEntity<Departamento> getDepartamentoById(@PathVariable Long id) {
        Optional<Departamento> departamento = departamentoService.findById(id);
        return departamento.map(ResponseEntity::ok)
                           .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Crear un nuevo departamento
    @PostMapping
    public Departamento createDepartamento(@RequestBody Departamento departamento) {
        return departamentoService.save(departamento);
    }

    // Actualizar un departamento existente
    @PutMapping("/{id}")
    public ResponseEntity<Departamento> updateDepartamento(@PathVariable Long id, @RequestBody Departamento departamentoDetails) {
        Optional<Departamento> departamentoOptional = departamentoService.findById(id);
        if (departamentoOptional.isPresent()) {
            Departamento departamento = departamentoOptional.get();
            departamento.setNombre(departamentoDetails.getNombre());
            departamento.setDireccion(departamentoDetails.getDireccion());
            departamento.setTelefono(departamentoDetails.getTelefono());
            departamento.setDescripcion(departamentoDetails.getDescripcion());
            departamento.setStatus(departamentoDetails.getStatus());
            departamento.setCreadoPor(departamentoDetails.getCreadoPor());
            departamento.setModificadoPor(departamentoDetails.getModificadoPor());
            return ResponseEntity.ok(departamentoService.save(departamento));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Eliminar un departamento
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDepartamento(@PathVariable Long id) {
        departamentoService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
