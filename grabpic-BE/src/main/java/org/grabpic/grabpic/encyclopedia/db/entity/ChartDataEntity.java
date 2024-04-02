package org.grabpic.grabpic.encyclopedia.db.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.grabpic.grabpic.encyclopedia.db.dto.EdgeDto;
import org.grabpic.grabpic.encyclopedia.db.dto.NodeDto;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.HashMap;
import java.util.Map;

@Getter
@Setter
@ToString
@NoArgsConstructor
@Document(collection = "UserChart")
public class ChartDataEntity {
    @Id
    private long id;
    private Map<String, NodeDto> nodeData = new HashMap<>();
    private Map<String, EdgeDto> edgeData = new HashMap<>();
}
