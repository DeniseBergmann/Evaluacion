package com.evaluacion.gestor.controller;

import com.evaluacion.gestor.entity.Colaborador;
import com.evaluacion.gestor.service.ColaboradorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/colaboradores")
public class ColaboradorController {

    @Autowired
    private ColaboradorService colaboradorService;

    // Obtener todos los colaboradores
    @GetMapping
    public List<Colaborador> getAllColaboradores() {
        return colaboradorService.findAll();
    }

    // Obtener un colaborador por ID
    @GetMapping("/{id}")
    public ResponseEntity<Colaborador> getColaboradorById(@PathVariable Long id) {
        Optional<Colaborador> colaborador = colaboradorService.findById(id);
        return colaborador.map(ResponseEntity::ok)
                          .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Crear un nuevo colaborador
    @PostMapping
    public Colaborador createColaborador(@RequestBody Colaborador colaborador) {
        return colaboradorService.save(colaborador);
    }

    // Actualizar un colaborador existente
    @PutMapping("/{id}")
    public ResponseEntity<Colaborador> updateColaborador(@PathVariable Long id, @RequestBody Colaborador colaboradorDetails) {
        Optional<Colaborador> colaboradorOptional = colaboradorService.findById(id);
        if (colaboradorOptional.isPresent()) {
            Colaborador colaborador = colaboradorOptional.get();
            colaborador.setNombre(colaboradorDetails.getNombre());
            colaborador.setApellido(colaboradorDetails.getApellido());
            colaborador.setCargo(colaboradorDetails.getCargo());
            colaborador.setEdad(colaboradorDetails.getEdad());
            colaborador.setEmail(colaboradorDetails.getEmail());
            colaborador.setEmpresa(colaboradorDetails.getEmpresa());
            colaborador.setDepartamento(colaboradorDetails.getDepartamento());
            colaborador.setStatus(colaboradorDetails.getStatus());
            colaborador.setCreadoPor(colaboradorDetails.getCreadoPor());
            colaborador.setModificadoPor(colaboradorDetails.getModificadoPor());
            return ResponseEntity.ok(colaboradorService.save(colaborador));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Eliminar un colaborador
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteColaborador(@PathVariable Long id) {
        colaboradorService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
