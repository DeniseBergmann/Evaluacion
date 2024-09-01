package com.evaluacion.gestor.controller;

import com.evaluacion.gestor.entity.Empresa;
import com.evaluacion.gestor.service.EmpresaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/empresas")
public class EmpresaController {

    @Autowired
    private EmpresaService empresaService;

    @GetMapping
    public List<Empresa> findAll() {
        return empresaService.findAll();
    }

    @PostMapping
    public ResponseEntity<Empresa> save(@RequestBody Empresa empresa) {
        Empresa savedEmpresa = empresaService.save(empresa);
        return new ResponseEntity<>(savedEmpresa, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Empresa> findById(@PathVariable Long id) {
        Optional<Empresa> empresa = empresaService.findById(id);
        if (empresa.isPresent()) {
            return new ResponseEntity<>(empresa.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Empresa> updateEmpresa(@PathVariable Long id, @RequestBody Empresa empresaDetails) {
        Optional<Empresa> empresaOptional = empresaService.findById(id);
        if (empresaOptional.isPresent()) {
            Empresa empresa = empresaOptional.get();
            empresa.setNombre(empresaDetails.getNombre());
            empresa.setDireccion(empresaDetails.getDireccion());
            empresa.setTelefono(empresaDetails.getTelefono());
            empresa.setStatus(empresaDetails.getStatus());
            empresa.setCreadoPor(empresaDetails.getCreadoPor());
            empresa.setModificadoPor(empresaDetails.getModificadoPor());
            Empresa updatedEmpresa = empresaService.save(empresa);
            return ResponseEntity.ok(updatedEmpresa);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Long id) {
        empresaService.deleteById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
