const array = (type, name, values) => {
  const arr = values.map(val => (type == 'String') ? `"${val}"` : val).join(', ')
  return `${type}[] ${name} = {${arr}};`
}

const type = type => {
  switch (type) {
      case 'String': return 'String'
      case 'Integer': return 'int'
      case 'Double': return 'double'
      case 'Boolean': return 'boolean'
      case 'Char': return 'char'
  }
}

const generateSubmission = (challenge, submission) => {

const { method_name, method_type } = challenge
const params = JSON.parse(challenge.parameters)
const tests = JSON.parse(challenge.tests)
return `
import java.util.Arrays;
import java.io.OutputStream;
import java.io.PrintStream;
class Challenge_${challenge.number} {

  public static void main (String[] args) {

      // Preventing user from printing
      PrintStream originalStream = System.out;
      PrintStream dummyStream = new PrintStream(new OutputStream () {
          public void write(int b) {
              // NO-OP
              // deduct point if user tried to print ;)
          }
      });

      ${tests.inputs.map((values, n) => array(type(params[n].type), 'args' + n, values)).join('\n      ')}
      ${array(type(method_type), 'outputs', tests.outputs)}
      boolean [] results = new boolean[outputs.length];
      
      for (int i = 0; i < results.length; i++) {
          System.setOut(dummyStream);
          ${type(method_type)} res = ${method_name}(${params.map((_, i) => `args${i}[i]`).join(', ')});
          results[i] = ${method_type == 'String' ? 'res.equals(outputs[i])' : 'res == outputs[i]'};
          System.setOut(originalStream);
          System.out.println("{\\"type\\":\\"test\\",\\"payload\\":{\\"test\\":"+i+",\\"value\\":"+results[i]+"}}");
      }
  }

  public static ${method_type} ${method_name} (${params.map(param => `${type(param.type)} ${param.name}`).join(', ')}) {

      ${submission || ''}

  }

}
`

}

const getSignature = challenge => {
  const { method_name, method_type } = challenge
  const params = JSON.parse(challenge.parameters)
  return `public static ${type(method_type)} ${method_name} (${params.map(param => `${type(param.type)} ${param.name}`).join(', ')})`
}

module.exports = { generateSubmission, getSignature }