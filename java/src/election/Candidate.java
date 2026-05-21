package election;

import java.util.*;

public class Candidate {
    private String id;
    private String userId;
    private String name;
    private List<String> posts;
    private CandidateStatus status;
    private int votes;
    private String manifesto;

    public enum CandidateStatus { PENDING, APPROVED, REJECTED }

    public Candidate(String id, String userId, String name, List<String> posts) {
        this.id = id;
        this.userId = userId;
        this.name = name;
        this.posts = posts;
        this.status = CandidateStatus.PENDING;
        this.votes = 0;
        this.manifesto = "";
    }

    public String getId() { return id; }
    public String getUserId() { return userId; }
    public String getName() { return name; }
    public List<String> getPosts() { return posts; }
    public CandidateStatus getStatus() { return status; }
    public int getVotes() { return votes; }
    public String getManifesto() { return manifesto; }

    public void approve() { this.status = CandidateStatus.APPROVED; }
    public void reject() { this.status = CandidateStatus.REJECTED; }
    public void castVote() { this.votes++; }
    public void setManifesto(String manifesto) { this.manifesto = manifesto; }

    @Override
    public String toString() {
        return String.format("Candidate{name='%s', posts=%s, status=%s, votes=%d}", 
            name, posts, status, votes);
    }
}
