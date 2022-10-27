package com.example.backend.service;

import org.apache.jena.query.ResultSet;

public interface QueryService {
    ResultSet executeQueryUsingOSMEndpoint(String queryString);
    ResultSet executeQueryUsingDbpediaSPARQLEndpoint(String queryString);
}
