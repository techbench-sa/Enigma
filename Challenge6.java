import java.util.Arrays;
import java.util.HashMap;

public class Challenge6 {
	public static void main(String[] args) {
		int[][] p1 = {{0,4,3,0}, {3,2,4}, {-3,4,3,90}, {-1,-2,-3,-4,-5}, {5,75,25},
				{150,24,79,50,88,345,3}, {2,1,9,4,4,56,90,3},
				{15, 5, -1, -2, 4, -3, 11},
				{591,955,829,805,312,83,764,841,12,744,104,773,627,306,731,539,349,811,662,341,465,300,491,423,569,405,508,802,500,747,689,506,129,325,918,606,918,370,623,905,321,670,879,607,140,543,997,530,356,446,444,184,787,199,614,685,778,929,819,612,737,344,471,645,726},
				{12, 4, -10, 40, 52, 3, 24}, {-1, -2, 0, 2, 3}, {4, 3, 5, 10, -2, -7, -4, -5}, {12, 11, 4, 0, 2, -11, 3}, {1, 3, 6, -2, 2, 5}, {1519, 1}};
		int[] p2 = {0, 6, 0, -8, 100, 200, 8, 12, 789, 42, 1, -3, 11, 5, 1520};
		int[][] o = {{0, 3}, {1,2}, {0, 2}, {2, 4}, {1,2}, {0,3}, {3, 4}, {0, 5}, {10, 55}, {2, 4}, {0, 3}, {0, 5}, {1, 3}, {1,4}, {0, 1}};

		boolean[] result = new boolean[p1.length];
		int score = 0;

		for(int i = 0; i < p1.length; i++) {
			try {
				int[] r = TwoSum(p1[i], p2[i]);
				result[i] = (Arrays.toString(o[i]).equals(Arrays.toString(r)));

				System.out.print("TwoSum(" + Arrays.toString(p1[i]) + ", " + p2[i] +")");
				System.out.print(" ==> " + Arrays.toString(r));
				System.out.print("  Correct Result: " + Arrays.toString(o[i]));
				System.out.print(" -" + result[i] + "\n");
			} catch (Exception e) {
				System.out.print("TwoSum(" + Arrays.toString(p1[i]) + ", " + p2[i] + ")");
				System.out.print(" ==> " + e.toString());
				System.out.print("  Correct Result: " + Arrays.toString(o[i]));
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


	public static int[] TwoSum(int[] a, int target) {

        int [] b = new int[2];
		for (int i = 0; i<a.length; i++)
		  for (int j = 0; j<a.length; j++)
		   {  if ((a[i] + a[j] == target) && (i != j))
		         {b[0]=i; b[1]=j; return b;}
		   }

		return null;

	/*

		HashMap<Integer, Integer> map = new HashMap<Integer, Integer>();
		int[] result = new int[2];

		for (int i = 0; i < numbers.length; i++) {
			if (map.containsKey(numbers[i])) {
				int index = map.get(numbers[i]);
				result[0] = index ;
				result[1] = i;
				break;
			} else {
				map.put(target - numbers[i], i);
			}
		}

		return result;*/
	    }
}
