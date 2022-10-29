package com.example.backend.utils;

public class SPARQLQueries {
    public static final String OSM_SPARQL_Endpoint = "https://sophox.org/sparql";
    public static final String osmmPrefix = "PREFIX osmm: <https://www.openstreetmap.org/meta/> ";
    public static final String osmtPrefix = "PREFIX osmt: <https://wiki.openstreetmap.org/wiki/Key:>";

    public static final String DbpediaSPARQLEndpoint = "http://dbpedia.org/sparql";
    public static final String dboPrefix = "PREFIX dbo:<http://dbpedia.org/ontology/>";
    public static final String rdfPrefix = "PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>";
    public static final String foafPrefix = "PREFIX foaf: <http://xmlns.com/foaf/0.1/>";
    public static final String geoPrefix = "PREFIX geo: <http://www.w3.org/2003/01/geo/wgs84_pos#>";
    public static final String wdtPrefix = "PREFIX wdt: <http://www.wikidata.org/prop/direct/>";
    public static final String schemaPrefix = "PREFIX schema: <http://schema.org/>";

    public static String getCoordinatesForDestinationLocation(String city, String country){
        return rdfPrefix +foafPrefix +dboPrefix + geoPrefix+
                "SELECT ?latitude ?longitude \n" +
                "WHERE {\n" +
                "    ?city rdf:type dbo:City ;\n" +
                "            foaf:name ?cityName;\n" +
                "            dbo:country ?country;\n" +
                "            geo:lat ?latitude;\n" +
                "            geo:long ?longitude.\n" +
                "     ?country foaf:name ?countryName .\n" +
                "     \n" +
                "    FILTER(?cityName=\""+city+"\"@en  && ?countryName=\""+country+"\"@en ).\n" +
                "}";
    }

    public static String getDestinationDetails(String city, String country){
        return rdfPrefix + foafPrefix + dboPrefix+
                "SELECT ?abstract ?homepage ?currency ?countryCode\n" +
                "WHERE{\n" +
                "      ?city rdf:type dbo:City ;\n" +
                "               foaf:name ?cityName;\n" +
                "               dbo:country ?country;\n" +
                "               dbo:abstract ?abstract.\n" +
                "      ?country foaf:name ?countryName.\n" +
                "OPTIONAL {?city foaf:homepage ?homepage. }\n" +
                "OPTIONAL { ?country dbo:countryCode ?countryCode.}\n" +
                "OPTIONAL {?country  dbo:currency ?currency.}\n" +
                "    FILTER(?cityName=\""+city+"\"@en  && ?countryName=\""+country+"\"@en ).\n" +
                "FILTER(lang(?abstract)=\"en\")\n" +
                "} LIMIT 1";
    }

    public static String getMuseumsInDestinations(String city){
        return osmmPrefix + osmtPrefix + wdtPrefix + schemaPrefix +
                "SELECT ?name ?loc ?imageURL ?description  \n" +
                "WHERE {\n" +
                "   ?museum osmt:addr:city \""+ city +"\";\n" +
                "      osmt:tourism \"museum\";\n" +
                "      osmm:loc ?loc ;\n" +
                "      osmt:wikidata ?wikidataID;\n" +
                "      osmt:name ?name.\n" +
                "  SERVICE <https://query.wikidata.org/sparql> {\n" +
                "    ?wikidataID wdt:P18 ?imageURL;\n" +
                "                schema:description ?description.\n" +
                "    FILTER(lang(?description)=\"en\")\n" +
                "  }  \n" +
                "} LIMIT 5";
    }

    public static String getAttractionsInDestinations(String city){
        return osmmPrefix + osmtPrefix + wdtPrefix + schemaPrefix +
                "SELECT ?name ?loc ?imageURL ?description  \n" +
                "WHERE {\n" +
                "   ?museum osmt:addr:city \""+ city +"\";\n" +
                "      osmt:tourism \"attraction\";\n" +
                "      osmm:loc ?loc ;\n" +
                "      osmt:wikidata ?wikidataID;\n" +
                "      osmt:name ?name.\n" +
                "  SERVICE <https://query.wikidata.org/sparql> {\n" +
                "    ?wikidataID wdt:P18 ?imageURL;\n" +
                "                schema:description ?description.\n" +
                "    FILTER(lang(?description)=\"en\")\n" +
                "  }  \n" +
                "} LIMIT 5";
    }

    public static String getRestaurantsInDestinations(String city){
        return osmmPrefix + osmtPrefix + wdtPrefix + schemaPrefix +
                "SELECT ?name ?loc ?imageURL ?description  \n" +
                "WHERE {\n" +
                "   ?museum osmt:addr:city \""+ city +"\";\n" +
                "      osmt:amenity \"restaurant\";\n" +
                "      osmm:loc ?loc ;\n" +
                "      osmt:wikidata ?wikidataID;\n" +
                "      osmt:name ?name.\n" +
                "  SERVICE <https://query.wikidata.org/sparql> {\n" +
                "    ?wikidataID wdt:P18 ?imageURL;\n" +
                "                schema:description ?description.\n" +
                "    FILTER(lang(?description)=\"en\")\n" +
                "  }  \n" +
                "} LIMIT 5";
    }

    public static String getBarsInDestinations(String city){
        return osmmPrefix + osmtPrefix + wdtPrefix + schemaPrefix +
                "SELECT ?name ?loc ?imageURL ?description  \n" +
                "WHERE {\n" +
                "   ?museum osmt:addr:city \""+ city +"\";\n" +
                "      osmt:amenity \"bar\";\n" +
                "      osmm:loc ?loc ;\n" +
                "      osmt:wikidata ?wikidataID;\n" +
                "      osmt:name ?name.\n" +
                "  SERVICE <https://query.wikidata.org/sparql> {\n" +
                "    ?wikidataID wdt:P18 ?imageURL;\n" +
                "                schema:description ?description.\n" +
                "    FILTER(lang(?description)=\"en\")\n" +
                "  }  \n" +
                "} LIMIT 5";
    }

    public static String getNightClubsInDestinations(String city){
        return osmmPrefix + osmtPrefix + wdtPrefix + schemaPrefix +
                "SELECT ?name ?loc ?imageURL ?description  \n" +
                "WHERE {\n" +
                "   ?museum osmt:addr:city \""+ city +"\";\n" +
                "      osmt:amenity \"nightclub\";\n" +
                "      osmm:loc ?loc ;\n" +
                "      osmt:wikidata ?wikidataID;\n" +
                "      osmt:name ?name.\n" +
                "  SERVICE <https://query.wikidata.org/sparql> {\n" +
                "    ?wikidataID wdt:P18 ?imageURL;\n" +
                "                schema:description ?description.\n" +
                "    FILTER(lang(?description)=\"en\")\n" +
                "  }  \n" +
                "} LIMIT 5";
    }
    public static String getCoordinatesForHotelLocation(String address, String city, String country){
        return "";
//        return osmmPrefix + osmtPrefix +
//                "SELECT ?loc\n" +
//                "WHERE {\n" +
//                "   ?node osmt:addr:city \""+city+"\";\n" +
//                "         osmm:loc ?loc ;\n" +
//                "} LIMIT 1";
    }
}
