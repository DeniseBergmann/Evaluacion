package com.evaluacion.gestor.service;

import com.evaluacion.gestor.entity.Colaborador;
import com.evaluacion.gestor.repository.ColaboradorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ColaboradorService {

    @Autowired
    private ColaboradorRepository colaboradorRepository;

    public List<Colaborador> findAll() {
        return colaboradorRepository.findAll();
    }

    public Colaborador save(Colaborador colaborador) {
        return colaboradorRepository.save(colaborador);
    }

    public void deleteById(Long id) {
        colaboradorRepository.deleteById(id);
    }

    // Cambiar este método para devolver Optional<Colaborador>
    public Optional<Colaborador> findById(Long id) {
        return colaboradorRepository.findById(id);
    }
}

