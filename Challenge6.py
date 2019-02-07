def sum2(a, i):
	res = [0,3];
	return res;
	
	


p1 = [[0,4,3,0], [3,2,4], [-3,4,3,90], [-1,-2,-3,-4,-5], [5,75,25],[150,24,79,50,88,345,3], [2,1,9,4,4,56,90,3], [15, 5, -1, -2, 4, -3, 11],			[591,955,829,805,312,83,764,841,12,744,104,773,627,306,731,539,349,811,662,341,465,300,491,423,569,405,508,802,500,747,689,506,129,325,918,606,918,370,623,905,321,670,879,607,140,543,997,530,356,446,444,184,787,199,614,685,778,929,819,612,737,344,471,645,726],	[12, 4, -10, 40, 52, 3, 24], [-1, -2, 0, 2, 3], [4, 3, 5, 10, -2, -7, -4, -5], [12, 11, 4, 0, 2, -11, 3], [1, 3, 6, -2, 2, 5], [1519, 1]];
p2 = [0, 6, 0, -8, 100, 200, 8, 12, 789, 42, 1, -3, 11, 5, 1520];
o = [[0, 3], [1,2], [0, 2], [2, 4], [1,2], [0,3], [3, 4], [0, 5], [10, 55], [2, 4], [0, 3], [0, 5], [1, 3], [1,4], [0, 1]];

		
#		boolean[] result = new boolean[p1.length];
result = [];
score = 0;
		
for i in range(len(p1)):
	r = sum2(p1[i], p2[i]);
	if (o[i] == r):
        	result.append(True)
	else:
        	result.append(False)
					
	print("Sum2(" + str(p1[i]) + ", " + str(p2[i]) +")",end="");
	print(" ==> " + str(r), end="");
	print("  Correct Result: " + str(o[i]),end="");
	if (result[i]):
        	print(" -true")
	else:
		print(" -false")
				
validTests = 0;
for i in range(len(result)):
    if (result[i]):
        validTests = validTests + 1;

# Score Counting: 1pts for every valid test 
# Doubling the score if all test cases are valid
score = validTests;

if (validTests == len(result)):
    score += validTests;

print("Score is: " + str(score));
