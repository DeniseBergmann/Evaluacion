package com.evaluacion.gestor.repository;

import com.evaluacion.gestor.entity.Departamento;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DepartamentoRepository extends JpaRepository<Departamento, Long> {
}
