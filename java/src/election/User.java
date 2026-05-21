package election;

public class User {
    private String id;
    private String name;
    private String password;
    private UserRole role;
    private boolean hasVoted;

    public enum UserRole { ADMIN, VOTER, CANDIDATE }

    public User(String id, String name, String password, UserRole role) {
        this.id = id;
        this.name = name;
        this.password = password;
        this.role = role;
        this.hasVoted = false;
    }

    public String getId() { return id; }
    public String getName() { return name; }
    public String getPassword() { return password; }
    public UserRole getRole() { return role; }
    public boolean hasVoted() { return hasVoted; }

    public void setRole(UserRole role) { this.role = role; }
    public void setHasVoted(boolean hasVoted) { this.hasVoted = hasVoted; }

    @Override
    public String toString() {
        return String.format("User{id='%s', name='%s', role=%s, voted=%s}", id, name, role, hasVoted);
    }
}
