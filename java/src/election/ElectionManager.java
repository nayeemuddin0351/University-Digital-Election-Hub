package election;

import java.time.*;
import java.util.*;
import java.util.stream.Collectors;

public class ElectionManager {
    private Map<String, User> users = new HashMap<>();
    private List<Candidate> candidates = new ArrayList<>();
    private ElectionStatus status = ElectionStatus.FINISHED;
    private String electionDate = "";
    private String officialWinner = "";
    private List<String> availablePosts = Arrays.asList("President", "General Secretary", "VP");

    public enum ElectionStatus { ONGOING, FINISHED }

    // ==================== USER MANAGEMENT ====================
    
    public boolean registerUser(String id, String name, String password) {
        if (users.containsKey(id)) return false;
        users.put(id, new User(id, name, password, User.UserRole.VOTER));
        return true;
    }

    public User authenticate(String id, String password) {
        User user = users.get(id);
        if (user != null && user.getPassword().equals(password)) {
            return user;
        }
        return null;
    }

    public void setUserRole(String userId, User.UserRole role) {
        User user = users.get(userId);
        if (user != null) user.setRole(role);
    }

    // ==================== CANDIDATE MANAGEMENT ====================
    
    public boolean applyAsCandidate(String userId, String name, List<String> posts) {
        if (candidates.stream().anyMatch(c -> c.getUserId().equals(userId))) return false;
        String id = "cand_" + UUID.randomUUID().toString().substring(0, 8);
        candidates.add(new Candidate(id, userId, name, posts));
        return true;
    }

    public List<Candidate> getPendingCandidates() {
        return candidates.stream()
            .filter(c -> c.getStatus() == Candidate.CandidateStatus.PENDING)
            .collect(Collectors.toList());
    }

    public void approveCandidate(String candidateId) {
        candidates.stream()
            .filter(c -> c.getId().equals(candidateId))
            .findFirst()
            .ifPresent(c -> {
                c.approve();
                setUserRole(c.getUserId(), User.UserRole.CANDIDATE);
            });
    }

    public void rejectCandidate(String candidateId) {
        candidates.stream()
            .filter(c -> c.getId().equals(candidateId))
            .findFirst()
            .ifPresent(Candidate::reject);
    }

    // ==================== VOTING ====================
    
    public boolean castVote(String voterId, String candidateId) {
        User voter = users.get(voterId);
        if (voter == null || voter.hasVoted()) return false;

        Candidate target = candidates.stream()
            .filter(c -> c.getId().equals(candidateId) && c.getStatus() == Candidate.CandidateStatus.APPROVED)
            .findFirst().orElse(null);
        if (target == null) return false;

        target.castVote();
        voter.setHasVoted(true);
        return true;
    }

    public List<Candidate> getApprovedCandidates() {
        return candidates.stream()
            .filter(c -> c.getStatus() == Candidate.CandidateStatus.APPROVED)
            .collect(Collectors.toList());
    }

    public List<Candidate> getRankedCandidates() {
        return getApprovedCandidates().stream()
            .sorted((a, b) -> Integer.compare(b.getVotes(), a.getVotes()))
            .collect(Collectors.toList());
    }

    // ==================== ELECTION CONTROL ====================
    
    public void startElection(String date, String startTime, String endTime) {
        this.electionDate = date;
        this.status = ElectionStatus.ONGOING;
        this.officialWinner = "";
    }

    public void endElection() {
        this.status = ElectionStatus.FINISHED;
        List<Candidate> approved = getApprovedCandidates();
        if (!approved.isEmpty()) {
            approved.sort((a, b) -> Integer.compare(b.getVotes(), a.getVotes()));
            this.officialWinner = approved.get(0).getName();
        }
    }

    // ==================== RESULTS ====================
    
    public void displayResults() {
        System.out.println("\n===========================================");
        System.out.println("      RMSTU ELECTION RESULTS");
        System.out.println("===========================================");
        System.out.println("Status: " + status);
        System.out.println("Date: " + (electionDate.isEmpty() ? "Not set" : electionDate));
        System.out.println();

        List<String> allPosts = availablePosts.stream()
            .filter(p -> getApprovedCandidates().stream().anyMatch(c -> c.getPosts().contains(p)))
            .collect(Collectors.toList());

        for (String post : allPosts) {
            System.out.println("  ─── " + post + " ───");
            List<Candidate> postCandidates = getApprovedCandidates().stream()
                .filter(c -> c.getPosts().contains(post))
                .sorted((a, b) -> Integer.compare(b.getVotes(), a.getVotes()))
                .collect(Collectors.toList());

            for (int i = 0; i < postCandidates.size(); i++) {
                Candidate c = postCandidates.get(i);
                String medal = i == 0 ? "🥇" : i == 1 ? "🥈" : i == 2 ? "🥉" : "   ";
                System.out.printf("  %s #%d %-25s %d votes%n", medal, i + 1, c.getName(), c.getVotes());
            }
            System.out.println();
        }

        if (!officialWinner.isEmpty()) {
            System.out.println("  🏆 OFFICIAL WINNER: " + officialWinner + " 🏆");
        }
        System.out.println("===========================================\n");
    }

    // ==================== DATA RESET ====================
    
    public void resetAllData() {
        users.clear();
        candidates.clear();
        status = ElectionStatus.FINISHED;
        electionDate = "";
        officialWinner = "";
        System.out.println("[SYSTEM] All election data has been reset.");
        System.out.println("[SYSTEM] Users deleted. Everyone must re-register.");
    }

    // ==================== HELPERS ====================
    
    public User getUser(String id) { return users.get(id); }
    public List<String> getAvailablePosts() { return availablePosts; }
    public String getOfficialWinner() { return officialWinner; }
    public ElectionStatus getStatus() { return status; }
}
