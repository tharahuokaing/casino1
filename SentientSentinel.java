import java.io.*;
import java.nio.file.*;
import java.util.*;
import java.text.SimpleDateFormat;

/**
 * 👑 HUOKAING THARA - SENTIENT FORENSIC ENGINE v42.0
 * AI-Driven Integrity Protection & File Evolution
 */
public class SentientSentinel {

    private static final String ALERT_DIR = "IMPERIAL_ALERTS";
    private static final String SYSTEM_LOG = "sentient_report.txt";

    public static void main(String[] args) {
        String currentDir = System.getProperty("user.dir");
        System.out.println("👁️ SENTIENT SENSES ACTIVATED: Scanning " + currentDir);

        try {
            initializeProtection(currentDir);
            processForensics(currentDir);
        } catch (Exception e) {
            System.err.println("🚨 System Breach Detected: " + e.getMessage());
        }
    }

    private static void initializeProtection(String path) throws IOException {
        Path alertPath = Paths.get(path, ALERT_DIR);
        if (!Files.exists(alertPath)) {
            Files.createDirectory(alertPath);
            System.out.println("📂 New Alert Directory Created: " + ALERT_DIR);
        }
    }

    private static void processForensics(String path) {
        File folder = new File(path);
        File[] files = folder.listFiles();
        int step = 1;

        if (files == null) return;

        // ML Pattern: Sort by last modified to detect recent impacts
        Arrays.sort(files, Comparator.comparingLong(File::lastModified));

        for (File file : files) {
            if (file.isDirectory() || file.getName().equals("SentientSentinel.java")) continue;

            boolean isImpactful = analyzeImpact(file);

            if (isImpactful) {
                String report = "🚨 IMPACT ALERT: [" + file.getName() + "] analyzed as POTENTIAL REDUNDANCY/IMPACT.";
                generateAlert(report, path);

                // Sentient Evolution: Automatic Renaming step-by-step
                evolveFile(file, step);
                step++;
            }
        }
    }

    // AI/ML Logic Simulation: Detecting if script has negative impact or is useless
    private static boolean analyzeImpact(File file) {
        long size = file.length();
        String name = file.getName().toLowerCase();

        // Heuristic Logic: Files without proper extensions or unusually small/duplicate patterns
        if (size < 10 || name.contains("copy") || name.contains("temp") || !name.endsWith(".js") && !name.endsWith(".java")) {
            return true; 
        }
        return false;
    }

    private static void evolveFile(File file, int step) {
        String timestamp = new SimpleDateFormat("yyyyMMdd").format(new Date());
        String newName = String.format("Imperial_Step_%03d_%s_%s", step, timestamp, file.getName());
        File renamedFile = new File(file.getParent(), newName);

        if (file.renameTo(renamedFile)) {
            System.out.println("✨ EVOLVED: " + file.getName() + " -> " + newName);
        }
    }

    private static void generateAlert(String message, String path) {
        try (FileWriter fw = new FileWriter(path + "/" + ALERT_DIR + "/" + SYSTEM_LOG, true);
             BufferedWriter bw = new BufferedWriter(fw);
             PrintWriter out = new PrintWriter(bw)) {
            out.println("[" + new Date() + "] " + message);
        } catch (IOException e) {
            System.err.println("Alert generation failed.");
        }
    }
}

