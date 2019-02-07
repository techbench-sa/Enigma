
public class Challenge1 {
	public static void main(String[] args) {
		// exclude i exclude j
		
		String[] p1 = {"Menzel Temime", "Nabeul", "ICS", "TechBench", "Challenge", "Java", "C", "Plage Menzel Temime", "Program", "C++"};
		int[][] p2 = {{3, 5}, {0, 6}, {0, 1}, {0, 0}, {1, 7}, {1, 2}, {0, 0}, {5, 12}, {6, 6}, {0, 1}};
		String[] o = {"Men Temime", "", "S", "echBench", "Ce", "Ja", "", "PlageTemime", "Progra", "+"};

		
		boolean[] result = new boolean[p1.length];
		int score = 0;
		
		for(int i = 0; i < p1.length; i++) {
			try {
				String r = removeChunk(p1[i], p2[i][0], p2[i][1]);
				result[i] = (o[i].equals(r));
				
				System.out.print("removeChunk(" + p1[i] + ", " + p2[i][0] + ", " + p2[i][1] +")");
				System.out.print(" ==> " + r);
				System.out.print("  Correct Result: " + o[i]);
				System.out.print(" -" + result[i] + "\n");
			} catch (Exception e) {
				System.out.print("removeChunk(" + p1[i] + ", " + p2[i][0] + ", " + p2[i][1] +")");
				System.out.print(" ==> " + e.toString());
				System.out.print("  Correct Result: " + o[i]);
				System.out.print(" -" + result[i] + "\n");
			}
		}
		
		for(boolean b : result)
			if(b)
				score++;
		
		if(score == result.length)
				score = score + score;
		
		System.out.println(score);
	}
	
	public static String removeChunk(String s, int i, int j) {

		if (j == s.length())
			return s.substring(0,i);
		else
		return s.substring(0,i) + s.substring(j+1);
	}
}
