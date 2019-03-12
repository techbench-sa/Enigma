const array = (type, name, values) => {
  const isString = type.indexOf('String') != -1
  const isChar = type.indexOf('char') != -1
  const arr = values.map(val => {
    if (type.indexOf('[]') != -1)
      return `{${val.slice(1,-1)}}`
    const hasQoutes = val.length >= 2 && (val[0] == '"' || val[0] == "'")
    if (isString && !hasQoutes)
      return `"${val}"`
    if (isChar && !hasQoutes)
      return `'${val}'`
    return val
  }).join(', ')
  return `${type}[] ${name} = {${arr}};`
}

const type = type => {
  switch (type) {
      case 'String': return 'String'
      case 'Integer': return 'int'
      case 'Double': return 'double'
      case 'Boolean': return 'boolean'
      case 'Char': return 'char'
      case 'String Array': return 'String[]'
      case 'Integer Array': return 'int[]'
      case 'Double Array': return 'double[]'
      case 'Boolean Array': return 'boolean[]'
      case 'Char Array': return 'char[]'
  }
}

const generateSubmission = (challenge, submission) => {

const { method_name, method_type } = challenge
let params, tests
try {
  params = JSON.parse(challenge.parameters)
  tests = JSON.parse(challenge.tests)
} catch (e) {
  throw "Invalid challenge syntax ID: " + challenge.id;
}

const isArray = method_type.indexOf('Array') != -1
const isString = method_type.indexOf('String') != -1

return `import java.util.*; class Challenge_${challenge.id} {int System = 0;

  public static ${type(method_type)} ${method_name} (${params.map(param => `${type(param.type)} ${param.name}`).join(', ')}) {
${
  check(submission) ? submission
  : `isEmpty = true; return ${method_type == 'String' ? '""' : method_type == 'Boolean' ? 'false' : '0'};`
}
  }

  public static boolean isEmpty = false;

  public static void main (String[] args) {

      // Preventing user from printing
      java.io.PrintStream originalStream = System.out;
      java.io.PrintStream dummyStream = new java.io.PrintStream(new java.io.OutputStream () {
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
          try {
            ${type(method_type)} res = ${method_name}(${params.map((_, i) => `args${i}[i]`).join(', ')});
            results[i] = ${isArray ? 'java.util.Arrays.equals(res, outputs[i])' : isString ? 'res.equals(outputs[i])' : 'res == outputs[i]'};
            System.setOut(originalStream);
            if (isEmpty) {
              if (i == 0)
                System.out.println("{\\"error\\":\\"test\\",\\"payload\\":{\\"message\\":\\"You didn\'t write anything!\\"}}");
              results[i] = false;
            }
            String resStr = ${isArray ? 'java.util.Arrays.toString(res)' : 'res + ""' };
            System.out.println("{\\"type\\":\\"test\\",\\"payload\\":{\\"test\\":"+i+",\\"result\\":\\""+resStr+"\\",\\"value\\":"+results[i]+"}}");
          } catch (Exception e) {
            System.setOut(originalStream);
            System.out.println("{\\"error\\":\\"test\\",\\"payload\\":{\\"message\\":\\""+e.toString()+"\\"}}");          
          }

      }
  }


}
`

}

const getSignature = challenge => {
  const { method_name, method_type } = challenge
  const params = JSON.parse(challenge.parameters)
  return `public static ${type(method_type)} ${method_name} (${params.map(param => `${type(param.type)} ${param.name}`).join(', ')})`
}

const check = submission => {
  if (submission.replace(/\/\/.*\n/g, '').replace(/\/\*(.|\n)*?\*\//g, '').trim() === '')
    return false
  return true
}

module.exports = { generateSubmission, getSignature }