package com.example.backend.service.impl;

import com.example.backend.service.QueryService;
import lombok.AllArgsConstructor;
import org.apache.jena.query.*;
import org.springframework.stereotype.Service;

import static com.example.backend.utils.SPARQLQueries.DbpediaSPARQLEndpoint;
import static com.example.backend.utils.SPARQLQueries.OSM_SPARQL_Endpoint;

@Service
@AllArgsConstructor
public class QueryServiceImpl implements QueryService {

    @Override
    public ResultSet executeQueryUsingOSMEndpoint(String queryString) {
        Query query = QueryFactory.create(queryString);
        try(QueryExecution queryExecution = QueryExecutionFactory.sparqlService(OSM_SPARQL_Endpoint,query)){
            return queryExecution.execSelect();
        }
    }

    @Override
    public ResultSet executeQueryUsingDbpediaSPARQLEndpoint(String queryString) {
        Query query = QueryFactory.create(queryString);
        try(QueryExecution queryExecution = QueryExecutionFactory.sparqlService(DbpediaSPARQLEndpoint, query)){
            return queryExecution.execSelect();
        }
    }
}
