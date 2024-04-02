package org.grabpic.grabpic.encyclopedia.db.repository;

import jakarta.persistence.criteria.Join;
import org.grabpic.grabpic.biologyList.db.entity.BiologyListEntity;
import org.grabpic.grabpic.encyclopedia.db.entity.EncyclopediaEntity;
import org.springframework.data.jpa.domain.Specification;

public class EncyclopediaSpecification {
    public static Specification<EncyclopediaEntity> equalUserId(long user) {
        return (root, query, criteriaBuilder) -> {
            Join<BiologyListEntity, EncyclopediaEntity> encyclopediaEntityJoin = root.join("user");
            return criteriaBuilder.equal(encyclopediaEntityJoin.get("userId"), user);
        };
    }

    public static Specification<EncyclopediaEntity> equalOrdo(String ordo) {
        return (root, query, criteriaBuilder) -> {
            Join<BiologyListEntity, EncyclopediaEntity> encyclopediaEntityJoin = root.join("biologyList");
            return criteriaBuilder.equal(encyclopediaEntityJoin.get("ordo"), ordo);
        };
    }

    public static Specification<EncyclopediaEntity> equalFamilia(String familia) {
        return (root, query, criteriaBuilder) -> {
            Join<BiologyListEntity, EncyclopediaEntity> encyclopediaEntityJoin = root.join("biologyList");
            return criteriaBuilder.equal(encyclopediaEntityJoin.get("familia"), familia);
        };
    }

    public static Specification<EncyclopediaEntity> equalGenus(String genus) {
        return (root, query, criteriaBuilder) -> {
            Join<BiologyListEntity, EncyclopediaEntity> encyclopediaEntityJoin = root.join("biologyList");
            return criteriaBuilder.equal(encyclopediaEntityJoin.get("genus"), genus);
        };
    }

    public static Specification<EncyclopediaEntity> equalSpecies(String species) {
        return (root, query, criteriaBuilder) -> {
            Join<BiologyListEntity, EncyclopediaEntity> encyclopediaEntityJoin = root.join("biologyList");
            return criteriaBuilder.equal(encyclopediaEntityJoin.get("species"), species);
        };
    }
}
