package com.evaluacion.gestor.repository;

import com.evaluacion.gestor.entity.Empresa;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmpresaRepository extends JpaRepository<Empresa, Long> {
}
