package com.evaluacion.gestor.service;

import com.evaluacion.gestor.entity.Empresa;
import com.evaluacion.gestor.repository.EmpresaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmpresaService {

    @Autowired
    private EmpresaRepository empresaRepository;

    public List<Empresa> findAll() {
        return empresaRepository.findAll();
    }

    public Empresa save(Empresa empresa) {
        return empresaRepository.save(empresa);
    }

    public void deleteById(Long id) {
        empresaRepository.deleteById(id);
    }

    public Optional<Empresa> findById(Long id) {
        return empresaRepository.findById(id);
    }
}