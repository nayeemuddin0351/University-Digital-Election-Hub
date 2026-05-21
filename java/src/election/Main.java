package election;

import java.util.*;

public class Main {
    public static void main(String[] args) {
        ElectionManager election = new ElectionManager();
        Scanner scanner = new Scanner(System.in);

        // Seed admin
        election.registerUser("admin", "System Administrator", "admin123");
        election.setUserRole("admin", User.UserRole.ADMIN);

        System.out.println("===========================================");
        System.out.println("    RMSTU DIGITAL ELECTION HUB — JAVA");
        System.out.println("===========================================");

        while (true) {
            System.out.println("\n1. Register (Voter)");
            System.out.println("2. Sign In");
            System.out.println("3. Apply as Candidate");
            System.out.println("4. Admin: Approve Candidates");
            System.out.println("5. Vote");
            System.out.println("6. Show Results");
            System.out.println("7. Start Election");
            System.out.println("8. End Election");
            System.out.println("9. Reset All Data");
            System.out.println("0. Exit");
            System.out.print("\nChoose option: ");

            String choice = scanner.nextLine().trim();

            switch (choice) {
                case "1":
                    System.out.print("Enter ID: ");
                    String id = scanner.nextLine().trim();
                    System.out.print("Enter Name: ");
                    String name = scanner.nextLine().trim();
                    System.out.print("Enter Password: ");
                    String pass = scanner.nextLine().trim();
                    if (election.registerUser(id, name, pass))
                        System.out.println("✓ Registration successful!");
                    else
                        System.out.println("✗ ID already exists!");
                    break;

                case "2":
                    System.out.print("Enter ID: ");
                    String loginId = scanner.nextLine().trim();
                    System.out.print("Enter Password: ");
                    String loginPass = scanner.nextLine().trim();
                    User user = election.authenticate(loginId, loginPass);
                    if (user != null)
                        System.out.println("✓ Welcome, " + user.getName() + "! Role: " + user.getRole());
                    else
                        System.out.println("✗ Invalid credentials!");
                    break;

                case "3":
                    System.out.print("Enter your User ID: ");
                    String uid = scanner.nextLine().trim();
                    System.out.print("Enter Full Name: ");
                    String cname = scanner.nextLine().trim();
                    System.out.println("Available posts: " + election.getAvailablePosts());
                    System.out.print("Enter posts (comma-separated): ");
                    String postsInput = scanner.nextLine().trim();
                    List<String> posts = Arrays.asList(postsInput.split("\\s*,\\s*"));
                    if (election.applyAsCandidate(uid, cname, posts))
                        System.out.println("✓ Application submitted (pending approval)!");
                    else
                        System.out.println("✗ Already applied or user not found!");
                    break;

                case "4":
                    List<Candidate> pending = election.getPendingCandidates();
                    if (pending.isEmpty()) {
                        System.out.println("No pending candidates.");
                    } else {
                        for (Candidate c : pending) {
                            System.out.println(c.getId() + " — " + c.getName() + " [" + c.getPosts() + "]");
                            System.out.print("  Approve? (y/n): ");
                            String yn = scanner.nextLine().trim();
                            if (yn.equalsIgnoreCase("y")) {
                                election.approveCandidate(c.getId());
                                System.out.println("  ✓ Approved!");
                            } else {
                                election.rejectCandidate(c.getId());
                                System.out.println("  ✗ Rejected!");
                            }
                        }
                    }
                    break;

                case "5":
                    System.out.print("Enter your Voter ID: ");
                    String voterId = scanner.nextLine().trim();
                    System.out.print("Enter Candidate ID to vote for: ");
                    String candId = scanner.nextLine().trim();
                    if (election.castVote(voterId, candId))
                        System.out.println("✓ Vote cast successfully!");
                    else
                        System.out.println("✗ Voting failed! Check if election is ongoing or already voted.");
                    break;

                case "6":
                    election.displayResults();
                    break;

                case "7":
                    System.out.print("Enter election date (YYYY-MM-DD): ");
                    String date = scanner.nextLine().trim();
                    System.out.print("Enter start time (HH:MM): ");
                    String start = scanner.nextLine().trim();
                    System.out.print("Enter end time (HH:MM): ");
                    String end = scanner.nextLine().trim();
                    election.startElection(date, start, end);
                    System.out.println("✓ Election started!");
                    break;

                case "8":
                    election.endElection();
                    System.out.println("✓ Election ended. Winner: " + election.getOfficialWinner());
                    break;

                case "9":
                    System.out.print("Are you sure? This deletes ALL data! (yes/no): ");
                    String confirm = scanner.nextLine().trim();
                    if (confirm.equalsIgnoreCase("yes")) {
                        election.resetAllData();
                        // Re-seed admin
                        election.registerUser("admin", "System Administrator", "admin123");
                        election.setUserRole("admin", User.UserRole.ADMIN);
                    }
                    break;

                case "0":
                    System.out.println("Goodbye!");
                    scanner.close();
                    return;

                default:
                    System.out.println("Invalid option!");
            }
        }
    }
}
