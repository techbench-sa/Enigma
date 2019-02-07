import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

public class Challenge7 {
	public static void main(String[] args) {
		int[][] p1 = {{1,1,1,2,2,3}, {1,3}, {2,3,3,2,3,4}, {1,2,1,2,3,3,5,4,4},
					{55, 2, 4, 4, 22, 2, 17, 17, 55, 55, 4, 4}, {1, 2, 3}, {1},
					{3, 3, 3, 2, 5, 1, 1, 4, 4, 5, 5, 5, 5, 5, 4, 4}, {1,2,3,4,1,3,4,5,4},
					{1, 5, 3, 4, 5, 6, 6, 6}, {3, 3, 1, 2, 2, 2, 4, 1, 4, 1}, {0,0,0,1,1,1,1,0,0},
					{4, 4, 5, 5, 4, 7, 7, 4, 7}, {1,1,2,2,1,1,2,4,4,4,4,4,4,4,4,3}, {15, 5, 3, 15, 1 , 4, 4, 15, 2, 2}};

		int[] p2 = {2, 2, 1, 4, 1, 3, 1, 3, 1, 2, 2, 1, 2, 3, 1};
		int[][] o = {{1,2}, {1,3}, {3}, {1, 2, 3, 4}, {4}, {1,2,3}, {1}, {5,4,3}, {4}, {6,5}, {1,2}, {0}, {4, 7}, {4,1,2}, {15}};

		boolean[] result = new boolean[p1.length];
		int score = 0;

		for(int i = 0; i < p1.length; i++) {
			try {
				int [] r = (mostFrequent(p1[i], p2[i]));
				result[i] = (Arrays.toString(o[i]).equals((Arrays.toString(r))));

				System.out.print("mostFrequent(" + Arrays.toString(p1[i]) + ", " + p2[i] +")");
				System.out.print(" ==> " + Arrays.toString(r));
				System.out.print("  Correct Result: " + Arrays.toString(o[i]));
				System.out.print(" -" + result[i] + "\n");
			} catch (Exception e) {
				System.out.print("mostFrequent(" + Arrays.toString(p1[i]) + ", " + p2[i] + ")");
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

    public static int [] mostFrequent(int[] array, int k) {

/*
        Arrays.sort(array);
		ArrayList<Integer> list = new ArrayList<>();
		ArrayList<Integer> keys = new ArrayList<>();
		ArrayList<Integer> values = new ArrayList<>();
		int c = 1;

		for(int i = 0; i < array.length; i++) {
			if(i == array.length-1){
				keys.add(array[i]);
				values.add(c);
			}
			else if(array[i] == array[i+1])
				c++;
			else {
				keys.add(array[i]);
				values.add(c);
				c = 1;
			}
		}

		for(int i = 0; i < k; i++) {
			int max = Collections.max(values);
			int index = values.indexOf(max);
			list.add(keys.get(index));
			keys.remove(index);
			values.remove(index);
		}
		return list;*/

	 	int [] a = {1,2};
		return a;
		}
}
