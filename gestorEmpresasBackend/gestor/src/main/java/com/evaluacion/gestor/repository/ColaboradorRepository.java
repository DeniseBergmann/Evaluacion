package com.evaluacion.gestor.repository;

import com.evaluacion.gestor.entity.Colaborador;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ColaboradorRepository extends JpaRepository<Colaborador, Long> {
}
