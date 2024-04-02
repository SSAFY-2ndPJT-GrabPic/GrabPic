package org.grabpic.grabpic.encyclopedia.db.dto;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@ToString
public class CategoryDto {
    private Set<String> ordo = new HashSet<>();
    private Set<String> familia = new HashSet<>();
    private Set<String> genus = new HashSet<>();
    private Set<String> species = new HashSet<>();
    private Set<String> name = new HashSet<>();
}
