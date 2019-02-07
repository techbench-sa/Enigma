def removeChunk(s, i, j):
	return s[:i] + s[j+1:];
	
	


p1 = ["Menzel Temime", "Nabeul", "ICS", "TechBench", "Challenge", "Java", "C", "Plage Menzel Temime", "Program", "C++"];
p2 = [[3, 5], [0, 6], [0, 1], [0, 0], [1, 7], [1, 2], [0, 0], [5, 12], [6, 6], [0, 1]];
o = ["Men Temime", "", "S", "echBench", "Ce", "Ja", "", "PlageTemime", "Progra", "+"];
		
#		boolean[] result = new boolean[p1.length];
result = [];
score = 0;
		
for i in range(len(p1)):
	r = removeChunk(p1[i], p2[i][0], p2[i][1]);
	if (o[i] == r):
        	result.append(True)
	else:
        	result.append(False)
					
	print("removeChunk(" + p1[i] + ", " + str(p2[i][0]) + ", " + str(p2[i][1]) +")",end="");
	print(" ==> " + str(r), end="");
	print("  Correct Result: " + o[i],end="");
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
