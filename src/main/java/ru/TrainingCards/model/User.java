package ru.TrainingCards.model;

import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

@Entity
@Getter
@Setter
@Table(name = "users")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String username;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    @ElementCollection(targetClass = RoleType.class, fetch = FetchType.EAGER)
    @JoinTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"))
    @Column(name = "roles", nullable = false)
    @Enumerated(EnumType.STRING)
    private Set<RoleType> roles = new HashSet<>();

    public User(String firstName, String lastName, String email, String encode) {
        this.username = firstName;
        this.email = email;
        this.password = encode;
    }
}
