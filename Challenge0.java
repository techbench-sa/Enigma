import java.util.Arrays;
public class Challenge0
{
public static void main(String [] args)
{

String [] parameter1 = {"kfupm","kfupm","kfupm","Hi","Hi","ccse","ccse","ccse","ccse","chocolate"};
int [] parameter2 = {1,0,4,0,1,0,1,2,3,8};
String [] correctOutput = {"kupm","fupm","kfup","i","H","cse","cse","cce","ccs","chocolat"};
boolean [] testResult = new boolean[parameter1.length];

for (int i = 0; i<testResult.length; i++)
{
   String testR = removeChar(parameter1[i],parameter2[i]);
   testResult[i] = (testR.equals(correctOutput[i]));
   System.out.print("removeChar(\"" + parameter1[i] + "\"," + parameter2[i] + ")");
  System.out.print(" ==> \"" + testR +"\"");
 System.out.print("  Correct Result: \"" + correctOutput[i] + "\"");
System.out.print(" -" + testResult[i] + "\n");
}

//System.out.println(Arrays.toString(testResult));

int validTests = 0;
for (int i = 0; i<testResult.length; i++)
{
   if (testResult[i])
      validTests++;
}
// Score Counting: 1pts for every valid test 
// Doubling the score if all test cases are valid
int score = validTests;
if (validTests == testResult.length)
     score += validTests;

System.out.println("Score is: " + score);
}



public static String removeChar(String str, int n) {

  String front = str.substring(0, n);
  
 
  String back = str.substring(n+1, str.length());
  
  return front + back; 
}
}
