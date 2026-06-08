package com.nexusguard.backend.repository;

import org.springframework.data.repository.reactive.ReactiveCrudRepository;

import com.nexusguard.backend.model.AnomalyScore;

import reactor.core.publisher.Mono;

public interface AnomalyScoreRepository
    extends ReactiveCrudRepository<AnomalyScore, String> {

  Mono<AnomalyScore> findByNodeId(Long nodeId);
}
