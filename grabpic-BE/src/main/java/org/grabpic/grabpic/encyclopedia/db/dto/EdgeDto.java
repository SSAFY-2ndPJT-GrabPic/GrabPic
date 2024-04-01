package org.grabpic.grabpic.encyclopedia.db.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class EdgeDto {
    @Id
    private String id;
    private String source;
    private String target;
}
