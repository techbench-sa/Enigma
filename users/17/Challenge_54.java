
import java.util.Arrays;
import java.io.OutputStream;
import java.io.PrintStream;
class Challenge_54 {

  public static void main (String[] args) {

      // Preventing user from printing
      PrintStream originalStream = System.out;
      PrintStream dummyStream = new PrintStream(new OutputStream () {
          public void write(int b) {
              // NO-OP
              // deduct point if user tried to print ;)
          }
      });

      String[] args0 = {"hello", "kfupm", "racecar", "Howdy", "Greetings from Earth"};
      String[] outputs = {"olleh", "mpufk", "racecar", "ydwoH", "htraE morf sgniteerG"};
      boolean [] results = new boolean[outputs.length];
      
      for (int i = 0; i < results.length; i++) {
          System.setOut(dummyStream);
          String res = reverseString(args0[i]);
          results[i] = res.equals(outputs[i]);
          System.setOut(originalStream);
          System.out.println("{\"type\":\"test\",\"payload\":{\"test\":"+i+",\"value\":"+results[i]+"}}");
      }
  }

  public static String reverseString (String str) {

      
		/* write your code here */
		return "";

  }

}
