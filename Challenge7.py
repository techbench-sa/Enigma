def mostFrequent(a, i):
	res = [1,2];
	return res;
	
	


p1 = [[1,1,1,2,2,3], [1,3], [2,3,3,2,3,4], [1,2,1,2,3,3,5,4,4],
					[55, 2, 4, 4, 22, 2, 17, 17, 55, 55, 4, 4], [1, 2, 3], [1],
					[3, 3, 3, 2, 5, 1, 1, 4, 4, 5, 5, 5, 5, 5, 4, 4], [1,2,3,4,1,3,4,5,4],
					[1, 5, 3, 4, 5, 6, 6, 6], [3, 3, 1, 2, 2, 2, 4, 1, 4, 1], [0,0,0,1,1,1,1,0,0],
					[4, 4, 5, 5, 4, 7, 7, 4, 7], [1,1,2,2,1,1,2,4,4,4,4,4,4,4,4,3], [15, 5, 3, 15, 1 , 4, 4, 15, 2, 2]];

p2 = [2, 2, 1, 4, 1, 3, 1, 3, 1, 2, 2, 1, 2, 3, 1];
o = [[1,2], [1,3], [3], [1, 2, 3, 4], [4], [1,2,3], [1], [5,4,3], [4], [6,5], [1,2], [0], [4, 7], [4,1,2], [15]];

		
#		boolean[] result = new boolean[p1.length];
result = [];
score = 0;
		
for i in range(len(p1)):
	r = mostFrequent(p1[i], p2[i]);
	if (o[i] == r):
        	result.append(True)
	else:
        	result.append(False)
					
	print("mostFrequent(" + str(p1[i]) + ", " + str(p2[i]) +")",end="");
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
